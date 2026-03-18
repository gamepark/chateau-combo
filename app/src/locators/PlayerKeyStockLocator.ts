import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getViewPlayer } from './panelCoordinates'
import { TABLEAU_X } from './TableauLocator'

class PlayerKeyStockLocator extends PileLocator {
  coordinates = { x: TABLEAU_X - 5, y: 17 }
  radius = 2
  limit = 1000
  navigationSorts = []

  hide(item: MaterialItem, context: ItemContext): boolean {
    return item.location.player !== getViewPlayer(context)
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerKeyStockLocator = new PlayerKeyStockLocator()
