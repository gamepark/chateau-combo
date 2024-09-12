import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

class MessengerIconLocator extends Locator {
  locationDescription = new LocationDescription({ width: 1.5, height: 1.2, borderRadius: 0.5 })
  parentItemType = MaterialType.Card
  positionOnParent = { x: 13, y: 25.7 }
}

export const messengerIconDescription = new MessengerIconLocator()