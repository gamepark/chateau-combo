import { Place } from '@gamepark/chateau-combo/material/Place'
import { DeckLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { chateauComboCardDescription } from '../material/ChateauComboCardDescription'

export class GameDeckLocator extends DeckLocator {
  getCoordinates(location: Location) {
    if (location.id === Place.Castle) {
      return { x: -(chateauComboCardDescription.width + 0.7), y: -18 }
    }

    return { x: -(chateauComboCardDescription.width + 0.7), y: -8 }
  }
  gap = { x: -0.03, y: -0.03, z: 0.1 }
  navigationSorts = []
}

export const gameDeckLocator = new GameDeckLocator()