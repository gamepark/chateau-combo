import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { RoundTokenDescription } from '@gamepark/react-game'
import Gold1 from '../images/tokens/Gold1.png'

export class GoldCoinDescription extends RoundTokenDescription {
    diameter = 1.9
    image = Gold1

    stockLocation = { type: LocationType.GoldStock }
    staticItem = { quantity: 10, location: this.stockLocation }
}

export const goldCoinDescription = new GoldCoinDescription()

