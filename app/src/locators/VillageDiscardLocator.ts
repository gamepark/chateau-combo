import { PileLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { villageDeckLocator } from './VillageDeckLocator'

export class VillageDiscardLocator extends PileLocator {
  maxAngle = 10
  getCoordinates() {
    const nobleDeck = villageDeckLocator.coordinates
    return {
      x: nobleDeck.x - (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }
}

export const villageDiscardLocator = new VillageDiscardLocator()