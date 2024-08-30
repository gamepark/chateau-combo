import { ListLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { nobleDeckLocator } from './NobleDeckLocator'

export class NobleRiverLocator extends ListLocator {
  getCoordinates() {
    const nobleDeck = nobleDeckLocator.coordinates
    return {
      x: nobleDeck.x + (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }

  gap = { x: 7 }
}

export const nobleRiverLocator = new NobleRiverLocator()