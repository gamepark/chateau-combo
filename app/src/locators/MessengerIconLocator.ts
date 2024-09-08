import { cardCharacteristics } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class MessengerIconLocator extends Locator {
  locationDescription = new MessengerIconDescription()
  parentItemType = MaterialType.Card
  positionOnParent = {x: 13, y: 25.7}
}

class MessengerIconDescription extends LocationDescription {
  getLocationSize() {
    return {
      width: 1.5,
      height: 1.2,
    }
  }

  borderRadius = 0.5
}

export const messengerIconDescription = new MessengerIconLocator()