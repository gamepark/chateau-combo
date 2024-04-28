import { MaterialComponentType, TokenDescription } from '@gamepark/react-game'
import keyImage from '../images/key.png'
import { keyStockLocation } from '../locators/KeyStockDescription'

export class KeyDescription extends TokenDescription {
    type = MaterialComponentType.Token
    height = 4
    ratio = 1/1
    image = keyImage

    staticItem = { quantity: 10, location: keyStockLocation }
    stockLocation = keyStockLocation
}

export const keyDescription = new KeyDescription()

