import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { TokenDescription } from '@gamepark/react-game'
import Key1 from '../images/Key1.png'

export class KeyDescription extends TokenDescription {
    height = 6
    width = 3.45
    image = Key1

    stockLocation = { type: LocationType.KeyStock }
    staticItem = { quantity: 10, location: this.stockLocation }
}

export const keyDescription = new KeyDescription()

