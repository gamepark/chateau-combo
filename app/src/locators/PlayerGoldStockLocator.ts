import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getViewPlayer } from './panelCoordinates'
import { TABLEAU_X } from './TableauLocator'

class PlayerGoldStockLocator extends PileLocator {
  coordinates = { x: TABLEAU_X + 18 , y: 13.5 }
  radius = 1.5
  limit = 1000
  navigationSorts = []

  hide(item: MaterialItem, context: ItemContext): boolean {
    return item.location.player !== getViewPlayer(context)
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerGoldStockLocator = new PlayerGoldStockLocator()
