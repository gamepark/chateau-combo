import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType, MaterialItem } from '@gamepark/rules-api'
import { besidePanelCardLocator, besidePanelLocator, onPlayerPanelLocator } from '../locators/OnPlayerPanelLocator'
import { getViewPlayer } from '../locators/panelCoordinates'

export const chateauComboAnimations = new MaterialGameAnimations()

const isKeyCreate = isCreateItemType(MaterialType.Key)
const isGoldCreate = isCreateItemType(MaterialType.GoldCoin)
const isKeyDelete = isDeleteItemType(MaterialType.Key)
const isGoldDelete = isDeleteItemType(MaterialType.GoldCoin)

const toPanelTrajectory = () => ({
  waypoints: [
    { at: 0.6, locator: besidePanelLocator, location: (item: MaterialItem) => ({ player: item.location.player }) },
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

// Card to tableau — other player: via beside panel then panel
const isCardMove = isMoveItemType(MaterialType.Card)

chateauComboAnimations
  .configure((move, context) =>
    isCardMove(move) && move.location.type === LocationType.Tableau
    && move.location.player !== getViewPlayer(context)
  )
  .duration(2000)
  .trajectory((_context, move) => ({
    waypoints: [
      { at: 0.3, locator: besidePanelCardLocator, location: () => ({ player: move.location.player }) },
      { at: 0.7, locator: besidePanelCardLocator, location: () => ({ player: move.location.player }) },
      { at: 1, locator: onPlayerPanelLocator, location: () => ({ player: move.location.player }) }
    ]
  }))

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

// Spend key/gold — other player: from panel
chateauComboAnimations
  .configure((move, context) =>
    (isKeyDelete(move) || isGoldDelete(move))
    && context.rules.material(move.itemType).index(move.itemIndex).getItem()?.location.player !== getViewPlayer(context)
  )
  .duration(1000)
  .trajectory(() => ({
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player }) }
    ]
  }))
