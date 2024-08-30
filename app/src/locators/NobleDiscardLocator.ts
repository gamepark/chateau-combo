import { PileLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { nobleDeckLocator } from './NobleDeckLocator'

export class NobleDiscardLocator extends PileLocator {

  maxAngle = 10
  getCoordinates() {
    const nobleDeck = nobleDeckLocator.coordinates
    return {
      x: nobleDeck.x - (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }
}

export const nobleDiscardLocator = new NobleDiscardLocator()