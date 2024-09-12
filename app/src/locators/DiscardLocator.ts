import { DropAreaDescription, PileLocator } from '@gamepark/react-game'
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
}

class DiscardDescription extends DropAreaDescription {
  help = DiscardHelp
}

export const discardLocator = new DiscardLocator()