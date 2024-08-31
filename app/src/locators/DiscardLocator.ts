import { PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { gameDeckLocator } from './GameDeckLocator'

export class DiscardLocator extends PileLocator {

  maxAngle = 10
  getCoordinates(location: Location) {
    const gameDeck = gameDeckLocator.getCoordinates(location)
    return {
      x: gameDeck.x - (cardDescription.width + 0.7),
      y: gameDeck.y
    }
  }
}

export const discardLocator = new DiscardLocator()