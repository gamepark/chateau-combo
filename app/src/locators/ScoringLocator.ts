import { cardCharacteristics } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class ScoringLocator extends Locator {
  locationDescription = new ScoringEffectDescription()
  parentItemType = MaterialType.Card
  positionOnParent = {x: 50, y: 87.5}
}

class ScoringEffectDescription extends LocationDescription {
  getLocationSize(location: Location, context: MaterialContext) {
    return {
      width: 6,
      height: 2,
    }
  }

  borderRadius = 0.3
}

export const scoringLocator = new ScoringLocator()