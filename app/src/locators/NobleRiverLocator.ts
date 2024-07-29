import { LineLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { nobleDeckLocator } from './NobleDeckLocator'

export class NobleRiverLocator extends LineLocator {
  getCoordinates() {
    const nobleDeck = nobleDeckLocator.coordinates
    return {
      x: nobleDeck.x + (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }
  delta = {x:7, y:0, z:0}
}

export const nobleRiverLocator = new NobleRiverLocator()