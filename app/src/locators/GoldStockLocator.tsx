import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'


export class GoldStockLocator extends PileLocator {
  coordinates = { x: 8, y: 1 }
  radius = 3

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const goldStockLocator = new GoldStockLocator()