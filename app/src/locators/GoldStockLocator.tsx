import { PileLocator } from '@gamepark/react-game'


export class GoldStockLocator extends PileLocator {
  coordinates = { x: -33, y: -13, z: 0 }
  radius = 2
}

export const goldStockLocator = new GoldStockLocator()