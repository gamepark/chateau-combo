import { MaterialComponentType, RoundTokenDescription } from '@gamepark/react-game'
import goldCoinImage from '../images/goldCoin.jpg'
import { goldStockLocation } from '../locators/GoldStockDescription'

export class GoldCoinDescription extends RoundTokenDescription {
    type = MaterialComponentType.Token
    diameter = 4
    ratio = 1/1
    image = goldCoinImage

    staticItem = { quantity: 10, location: goldStockLocation }
    stockLocation = goldStockLocation
}

export const goldCoinDescription = new GoldCoinDescription()

