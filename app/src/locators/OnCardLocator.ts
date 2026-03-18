import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PileLocator } from '@gamepark/react-game'

export class OnCardLocator extends PileLocator {
  parentItemType = MaterialType.Card
  radius = 1
  positionOnParent = { x: 50, y: 40 }
}

export const onCardLocator = new OnCardLocator()
