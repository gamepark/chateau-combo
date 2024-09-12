import { Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { riverLocator } from './RiverLocator'

class EndOfRiverLocator extends Locator {
  getCoordinates(location: Location) {
    return { x: 20, y: riverLocator.getRiverY(location.id) }
  }
}

export const endOfRiverLocator = new EndOfRiverLocator()