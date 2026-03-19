import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class GoldStockLocator extends PileLocator {
  coordinates = { x: 33, y: 17 }
  radius = 3
  navigationSorts = []

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const goldStockLocator = new GoldStockLocator()
