import { cardCharacteristics } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class EffectLocator extends Locator {
  locationDescription = new EffectDescription()
  parentItemType = MaterialType.Card
  positionOnParent = {x: 50, y: 68}
}

class EffectDescription extends LocationDescription {
  getLocationSize(location: Location, context: MaterialContext) {
    return {
      width: 6,
      height: 2,
    }
  }

  borderRadius = 0.3
}

export const effectLocator = new EffectLocator()