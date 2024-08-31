import { ListLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { chateauComboCardDescription } from '../material/ChateauComboCardDescription'
import { gameDeckLocator } from './GameDeckLocator'

export class RiverLocator extends ListLocator {
  getCoordinates(location: Location) {
    const gameDeck = gameDeckLocator.getCoordinates(location)
    return {
      x: gameDeck.x + (chateauComboCardDescription.width + 0.7),
      y: gameDeck.y,
    }
  }

  gap = { x: 7 }
}

export const riverLocator = new RiverLocator()