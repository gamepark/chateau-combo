import { Place } from '@gamepark/chateau-combo/material/Card'
import { DeckLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'

export class GameDeckLocator extends DeckLocator {
  getCoordinates(location: Location) {
    if (location.id === Place.Castle) {
      return { x: -(cardDescription.width + 0.7), y: -18 }
    }

    return { x: -(cardDescription.width + 0.7), y: -8 }
  }
  gap = { x: -0.03, y: -0.03, z: 0.1 }
  navigationSorts = []
}

export const gameDeckLocator = new GameDeckLocator()