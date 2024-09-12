import { DeckLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { riverLocator } from './RiverLocator'

class GameDeckLocator extends DeckLocator {
  getCoordinates(location: Location) {
    return { x: -cardDescription.width - 0.7, y: riverLocator.getRiverY(location.id) }
  }

  navigationSorts = []
}

export const gameDeckLocator = new GameDeckLocator()