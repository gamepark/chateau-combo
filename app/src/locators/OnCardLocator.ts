import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { getViewPlayer } from './panelCoordinates.ts'

export class OnCardLocator extends PileLocator {
  parentItemType = MaterialType.Card
  radius = 1

  getPositionOnParent(_location: Location, _context: MaterialContext): XYCoordinates {
    return { x: 50, y: 40 }
  }

  placeItem(item: MaterialItem, context: ItemContext) {
    const transforms = super.placeItem(item, context)
    if (item.location.player !== getViewPlayer(context)) {
      return [...transforms, 'scale(0.001)']
    }
    return transforms
  }

  ignore(item: MaterialItem, context: ItemContext): boolean {
    return item.location.player !== getViewPlayer(context)
  }
}

export const onCardLocator = new OnCardLocator()
