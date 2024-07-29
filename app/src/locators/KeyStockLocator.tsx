import { PileLocator } from '@gamepark/react-game'
import { GoldStockDescription } from './GoldStockDescription'
import { KeyStockDescription } from './KeyStockDescription'


export class KeyStockLocator extends PileLocator {

  locationDescription = new KeyStockDescription()
  coordinates = { x: -25, y: -13, z: 0 }
  radius = 2
  delta = { x: -0.05, y: -0.05}
}

export const keyStockLocator = new KeyStockLocator()