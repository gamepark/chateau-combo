import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { DropAreaDescription, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { DiscardHelp } from './component/DiscardHelp'
import { gameDeckLocator } from './GameDeckLocator'

class DiscardLocator extends PileLocator {

  locationDescription = new DiscardDescription(cardDescription)

  maxAngle = 10

  getCoordinates(location: Location) {
    const { x, y } = gameDeckLocator.getCoordinates(location)
    return { x: x - cardDescription.width - 1.5, y }
  }

  getLocations(_context: MaterialContext) {
    return [Place.Castle, Place.Village].map(place => ({ type: LocationType.Discard, id: place }))
  }
}

class DiscardDescription extends DropAreaDescription {
  help = DiscardHelp
}

export const discardLocator = new DiscardLocator()
