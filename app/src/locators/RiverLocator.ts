import { Place } from '@gamepark/chateau-combo/material/Place'
import { ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class RiverLocator extends ListLocator {
  getCoordinates(location: Location) {
    return { y: this.getRiverY(location.id) }
  }

  getRiverY(place: Place) {
    return place === Place.Castle ? -8 : -18
  }

  gap = { x: 7 }
}

export const riverLocator = new RiverLocator()