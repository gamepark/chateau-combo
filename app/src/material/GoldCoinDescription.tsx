import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { RoundTokenDescription } from '@gamepark/react-game'
import Coin1 from '../images/Coin1.png'

export class GoldCoinDescription extends RoundTokenDescription {
    diameter = 3
    image = Coin1

    stockLocation = { type: LocationType.GoldStock }
    staticItem = { quantity: 10, location: this.stockLocation }
}

export const goldCoinDescription = new GoldCoinDescription()

