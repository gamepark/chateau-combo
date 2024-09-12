import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { ComponentSize, MoneyDescription } from '@gamepark/react-game'
import Gold1 from '../images/tokens/Gold1.png'
import Gold5 from '../images/tokens/Gold5.png'
import { GoldCoinHelp } from './help/GoldCoinHelp'

export class GoldCoinDescription extends MoneyDescription {
  borderRadius = 2

  images = {
    1: Gold1,
    5: Gold5
  }

  getSize(itemId: number): ComponentSize {
    return itemId === 5 ? { width: 2.6, height: 2.6 } : { width: 1.9, height: 1.9 }
  }

  stockLocation = { type: LocationType.GoldStock }

  staticItems = [
    { id: 1, quantity: 10, location: this.stockLocation },
    { id: 5, quantity: 5, location: this.stockLocation }
  ]

  help = GoldCoinHelp
}

export const goldCoinDescription = new GoldCoinDescription()

