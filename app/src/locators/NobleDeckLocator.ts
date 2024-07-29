import { DeckLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'

export class NobleDeckLocator extends DeckLocator {
  coordinates = { x: -(cardDescription.width + 0.7), y: -18, z: 0 }
  delta = { x: -0.03, y: -0.03, z: 0.1 }
}

export const nobleDeckLocator = new NobleDeckLocator()