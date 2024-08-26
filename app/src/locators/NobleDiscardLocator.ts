import { LocationDescription, PileLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'
import { nobleDeckLocator } from './NobleDeckLocator'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'

export class NobleDiscardLocator extends PileLocator {

  locationDescription = new NobleDiscardDescription()

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

class NobleDiscardDescription extends LocationDescription {

  getCoordinates() {
    const nobleDeck = nobleDeckLocator.coordinates
    return {
      x: nobleDeck.x - (cardDescription.width + 0.7),
      y: nobleDeck.y,
      z: nobleDeck.z
    }
  }

  location = { type: LocationType.NobleDiscard }
  width = 6.3
  height = 8.8

}

export const nobleDiscardLocator = new NobleDiscardLocator()