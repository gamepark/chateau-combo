import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

class ScoringLocator extends Locator {
  locationDescription = new LocationDescription({ width: 6, height: 2, borderRadius: 0.3 })
  parentItemType = MaterialType.Card
  positionOnParent = { x: 50, y: 87.5 }
}

export const scoringLocator = new ScoringLocator()