import { MaterialComponentType, TokenDescription } from '@gamepark/react-game'
import goldCoinImage from '../images/goldCoin.jpg'

export class GoldCoinDescription extends TokenDescription {
    type = MaterialComponentType.Token
    height = 4
    ratio = 1/1
    image = goldCoinImage
}

export const goldCoinDescription = new GoldCoinDescription()