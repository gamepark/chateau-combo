import { PileLocator } from '@gamepark/react-game'


export class KeyStockLocator extends PileLocator {
  coordinates = { x: -25, y: -13, z: 0 }
  radius = 2
}

export const keyStockLocator = new KeyStockLocator()