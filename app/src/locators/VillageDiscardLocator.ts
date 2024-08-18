import { LocationContext, LocationDescription, PileLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { nobleDeckLocator } from './NobleDeckLocator'
import { villageDeckLocator } from './VillageDeckLocator'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Coordinates } from '@dnd-kit/core/dist/types'

export class VillageDiscardLocator extends PileLocator {

  locationDescription = new VillageDiscardDescription()

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

class VillageDiscardDescription extends LocationDescription {

  getCoordinates() {
    const villageDeck = villageDeckLocator.coordinates
    return {
      x: villageDeck.x - (cardDescription.width + 0.7),
      y: villageDeck.y,
      z: villageDeck.z
    }
  }

  location = { type: LocationType.VillageDiscard }
  width = 6.3
  height = 8.8

}

export const villageDiscardLocator = new VillageDiscardLocator()