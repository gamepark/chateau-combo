import { MaterialComponentType, RoundTokenDescription } from '@gamepark/react-game'
import Coin1 from '../images/Coin1.png'
import { goldStockLocation } from '../locators/GoldStockDescription'

export class GoldCoinDescription extends RoundTokenDescription {
    type = MaterialComponentType.Token
    diameter = 3
    image = Coin1

    staticItem = { quantity: 10, location: goldStockLocation }
    stockLocation = goldStockLocation
}

export const goldCoinDescription = new GoldCoinDescription()

