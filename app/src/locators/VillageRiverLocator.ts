import { LineLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { nobleDeckLocator } from './NobleDeckLocator'
import { villageDeckLocator } from './VillageDeckLocator'

export class VillageRiverLocator extends LineLocator {
  getCoordinates() {
    const nobleDeck = villageDeckLocator.coordinates
    return {
      x: nobleDeck.x + (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }
  delta = {x:7, y:0, z:0}
}

export const villageRiverLocator = new VillageRiverLocator()