import { PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { gameDeckLocator } from './GameDeckLocator'

export class DiscardLocator extends PileLocator {

  maxAngle = 10

  getCoordinates(location: Location) {
    const { x, y } = gameDeckLocator.getCoordinates(location)
    return { x: x - cardDescription.width - 1.5, y }
  }
}

export const discardLocator = new DiscardLocator()