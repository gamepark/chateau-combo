
import { DeckLocator } from '@gamepark/react-game'
import { cardDescription } from '../material/CardDescription'


export class VillageDeckLocator extends DeckLocator {
  coordinates = { x: -(cardDescription.width + 0.7), y: -8, z: 0 }
  delta = { x: -0.03, y: -0.03, z: 0.1 }
  navigationSorts = []
}

export const villageDeckLocator = new VillageDeckLocator()