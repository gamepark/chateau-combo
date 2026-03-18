import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class GoldStockLocator extends PileLocator {
  coordinates = { x: 21, y: 11 }
  radius = 3
  navigationSorts = []

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const goldStockLocator = new GoldStockLocator()
