import { PileLocator } from '@gamepark/react-game'
import { GoldStockDescription } from './GoldStockDescription'


export class GoldStockLocator extends PileLocator {

  locationDescription = new GoldStockDescription()
  coordinates = { x: -33, y: -13, z: 0 }
  radius = 2
  delta = { x: -0.05, y: -0.05}
}

export const goldStockLocator = new GoldStockLocator()