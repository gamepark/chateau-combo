import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { ComponentSize, MoneyDescription } from '@gamepark/react-game'
import Key1 from '../images/tokens/Key1.png'
import Key3 from '../images/tokens/Key3.png'
import { KeyHelp } from './help/KeyHelp'

class KeyDescription extends MoneyDescription {
  borderRadius = 0.5

  images = {
    1: Key1,
    3: Key3
  }

  getSize(itemId: number): ComponentSize {
    return itemId === 3 ? { width: 3.315, height: 3.4 } : { width: 1.67, height: 3 }
  }

  stockLocation = { type: LocationType.KeyStock }

  staticItems = [
    { id: 1, quantity: 10, location: this.stockLocation },
    { id: 3, quantity: 5, location: this.stockLocation }
  ]

  help = KeyHelp
}

export const keyDescription = new KeyDescription()

