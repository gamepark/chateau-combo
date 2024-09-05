import { DropAreaDescription, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { chateauComboCardDescription } from '../material/ChateauComboCardDescription'
import { gameDeckLocator } from './GameDeckLocator'

export class DiscardLocator extends PileLocator {

  locationDescription = new DropAreaDescription(chateauComboCardDescription)
  maxAngle = 10

  getCoordinates(location: Location) {
    const { x, y } = gameDeckLocator.getCoordinates(location)
    return { x: x - chateauComboCardDescription.width - 1.5, y }
  }
}

export const discardLocator = new DiscardLocator()