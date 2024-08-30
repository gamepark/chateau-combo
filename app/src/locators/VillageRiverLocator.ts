import { ListLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { villageDeckLocator } from './VillageDeckLocator'

export class VillageRiverLocator extends ListLocator {
  getCoordinates() {
    const nobleDeck = villageDeckLocator.coordinates
    return {
      x: nobleDeck.x + (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }
  gap = {x:7, y:0, z:0}
}

export const villageRiverLocator = new VillageRiverLocator()