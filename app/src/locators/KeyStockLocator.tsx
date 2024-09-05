import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'


export class KeyStockLocator extends PileLocator {
  coordinates = { x: -3, y: 1 }
  radius = 3

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const keyStockLocator = new KeyStockLocator()