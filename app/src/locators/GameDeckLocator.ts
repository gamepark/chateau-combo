import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { DeckLocator, DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { RIVER_X, riverLocator } from './RiverLocator'

const DECK_X = RIVER_X - cardDescription.width - 0.3

class GameDeckLocator extends DeckLocator {
  getCoordinates(location: Location) {
    return { x: DECK_X, y: riverLocator.getRiverY(location.id) }
  }

  navigationSorts = []

  locationDescription = new DropAreaDescription({ ...cardDescription, borderRadius: cardDescription.borderRadius })

  getLocations(_context: MaterialContext) {
    return [Place.Castle, Place.Village].map(place => ({ type: LocationType.Deck, id: place }))
  }
}

export const gameDeckLocator = new GameDeckLocator()
