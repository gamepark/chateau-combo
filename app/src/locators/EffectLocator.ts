import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

class EffectLocator extends Locator {
  locationDescription = new LocationDescription({ width: 6, height: 2, borderRadius: 0.3 })
  parentItemType = MaterialType.Card
  positionOnParent = { x: 50, y: 68 }
}

export const effectLocator = new EffectLocator()