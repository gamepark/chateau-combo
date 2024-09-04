import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'


export class KeyStockLocator extends PileLocator {
  coordinates = { x: -25, y: -13, z: 0 }
  radius = 2

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const keyStockLocator = new KeyStockLocator()