import { MaterialComponentType, TokenDescription } from '@gamepark/react-game'
import Key1 from '../images/Key1.png'
import { keyStockLocation } from '../locators/KeyStockDescription'

export class KeyDescription extends TokenDescription {
    height = 6
    width = 3.45
    image = Key1

    staticItem = { quantity: 10, location: keyStockLocation }
    stockLocation = keyStockLocation
}

export const keyDescription = new KeyDescription()

