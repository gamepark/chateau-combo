import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

class GoldIconLocator extends Locator {
  locationDescription = new LocationDescription({ width: 1.5, height: 1.5, borderRadius: 1 })
  parentItemType = MaterialType.Card
  positionOnParent = { x: 14, y: 12.5 }
}

export const goldIconLocator = new GoldIconLocator()