import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from "@gamepark/react-game";

export class GoldIconLocator extends Locator {
  locationDescription = new GoldIconDescription()
  parentItemType = MaterialType.Card
  positionOnParent = {x: 14, y: 12.5}
}

class GoldIconDescription extends LocationDescription {
  width = 1.5
  height = 1.5
  borderRadius = 5
}

export const goldIconLocator = new GoldIconLocator()