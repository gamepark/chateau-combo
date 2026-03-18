import { PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class KeyStockLocator extends PileLocator {
  coordinates = { x: 10, y: 11 }
  radius = 3
  navigationSorts = []

  getPileId(item: MaterialItem) {
    return item.id
  }
}

export const keyStockLocator = new KeyStockLocator()
