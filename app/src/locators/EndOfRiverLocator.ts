import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { DropAreaDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { RIVER_X, riverLocator } from './RiverLocator'

class EndOfRiverLocator extends Locator {
  getCoordinates(location: Location) {
    return { x: RIVER_X + 2 * 6.6 + cardDescription.width / 2 + 3.5, y: riverLocator.getRiverY(location.id) }
  }

  locationDescription = new DropAreaDescription({ width: 2, height: 2, borderRadius: 1 })


  getLocations() {
    return [Place.Castle, Place.Village].map(place => ({ type: LocationType.EndOfRiver, id: place }))
  }
}



export const endOfRiverLocator = new EndOfRiverLocator()
