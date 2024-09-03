import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { TokenDescription } from '@gamepark/react-game'
import Key1 from '../images/tokens/Key1.png'

export class KeyDescription extends TokenDescription {
    height = 3
    width = 1.67
    image = Key1
    borderRadius = 1

    stockLocation = { type: LocationType.KeyStock }
    staticItem = { quantity: 10, location: this.stockLocation }
}

export const keyDescription = new KeyDescription()

