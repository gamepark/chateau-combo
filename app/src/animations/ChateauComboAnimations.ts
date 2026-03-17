import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType, isDeleteItemType, isMoveItemType } from '@gamepark/rules-api'
import { besidePanelLocator, onPlayerPanelLocator } from '../locators/OnPlayerPanelLocator'
import { getViewPlayer } from '../locators/panelCoordinates'

export const chateauComboAnimations = new MaterialGameAnimations()

const isKeyCreate = isCreateItemType(MaterialType.Key)
const isGoldCreate = isCreateItemType(MaterialType.GoldCoin)
const isKeyDelete = isDeleteItemType(MaterialType.Key)
const isGoldDelete = isDeleteItemType(MaterialType.GoldCoin)

const toPanelTrajectory = () => ({
  waypoints: [
    { at: 0.6, locator: besidePanelLocator, location: (item) => ({ player: item.location.player }) },
    { at: 1, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player }) }
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
  .duration(1500)
  .trajectory(() => ({
    waypoints: [
      { at: 0.6, locator: besidePanelLocator, location: (item) => ({ player: item.location.player }), offset: { x: -3 } },
      { at: 1, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player }) }
    ]
  }))

// Spend key/gold — other player: from panel
chateauComboAnimations
  .configure((move, context) =>
    (isKeyDelete(move) || isGoldDelete(move))
    && context.rules.material(move.itemType).getItem(move.itemIndex)?.location.player !== getViewPlayer(context)
  )
  .duration(1000)
  .trajectory(() => ({
    waypoints: [
      { at: 0, locator: onPlayerPanelLocator, location: (item) => ({ player: item.location.player }) }
    ]
  }))
