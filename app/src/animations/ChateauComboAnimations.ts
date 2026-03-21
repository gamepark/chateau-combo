import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType, MaterialItem, MoveItem } from '@gamepark/rules-api'
import { belowPanelCardLocator, belowPanelLocator, onPlayerPanelLocator } from '../locators/OnPlayerPanelLocator'
import { getViewPlayer } from '../locators/panelCoordinates'

export const chateauComboAnimations = new MaterialGameAnimations()

const isKeyCreate = isCreateItemType(MaterialType.Key)
const isGoldCreate = isCreateItemType(MaterialType.GoldCoin)
const isKeyDelete = isDeleteItemType(MaterialType.Key)
const isGoldDelete = isDeleteItemType(MaterialType.GoldCoin)

const toPanelTrajectory = () => ({
  waypoints: [
    { at: 0.6, locator: belowPanelLocator, location: (item: MaterialItem) => ({ player: item.location.player }) },
    { at: 1, locator: onPlayerPanelLocator, location: (item: MaterialItem) => ({ player: item.location.player }) }
  ]
})

chateauComboAnimations
  .configure((move, context) =>
    isKeyCreate(move) && move.item.location.player !== getViewPlayer(context)
  )
  .duration(1500)
  .trajectory(toPanelTrajectory)

chateauComboAnimations
  .configure((move, context) =>
    isGoldCreate(move) && move.item.location.player !== getViewPlayer(context)
  )
  .duration(1500)
  .trajectory(toPanelTrajectory)

// Card to tableau — other player: via below panel then panel
const isCardMove = isMoveItemType(MaterialType.Card)

chateauComboAnimations
  .configure((move, context) =>
    isCardMove(move) && move.location.type === LocationType.Tableau
    && move.location.player !== getViewPlayer(context)
  )
  .duration(1500)
  .trajectory((_context, move) => {
    const m = move as MoveItem
    return {
      waypoints: [
        { at: 0.3, locator: belowPanelCardLocator, location: () => ({ player: m.location.player }) },
        { at: 0.55, locator: belowPanelCardLocator, location: () => ({ player: m.location.player }) },
        { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: m.location.player }) }
      ]
    }
  })

// End game: skip animations for non-viewed players
chateauComboAnimations
  .configure((move, context) =>
    context.rules.game.rule?.id === RuleId.EndGame
    && isMoveItemType(MaterialType.GoldCoin)(move)
    && move.location.player !== getViewPlayer(context)
  )
  .skip()

// Gold to OnCard — other player: skip
const isGoldMove = isMoveItemType(MaterialType.GoldCoin)

chateauComboAnimations
  .configure((move, context) =>
    isGoldMove(move) && move.location.type === LocationType.OnCard
    && move.location.player !== getViewPlayer(context)
  )
  .skip()

// Spend key/gold — other player: from panel to stock
chateauComboAnimations
  .configure((move, context) =>
    (isKeyDelete(move) || isGoldDelete(move))
    && context.rules.game.items[move.itemType]?.[move.itemIndex]?.location?.player !== getViewPlayer(context)
  )
  .duration(1000)
  .trajectory(() => ({
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: (item: MaterialItem) => ({ player: item.location.player }) },
      { at: 0.4, locator: belowPanelLocator, location: (item: MaterialItem) => ({ player: item.location.player }) }
    ]
  }))
