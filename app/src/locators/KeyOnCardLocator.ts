import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { getViewPlayer } from './panelCoordinates'

class KeyOnCardLocator extends Locator {
  parentItemType = MaterialType.Card

  getPositionOnParent(): XYCoordinates {
    return { x: 5, y: 90 }
  }

  rotateZ = -15

  placeItem(item: MaterialItem, context: ItemContext) {
    const transforms = super.placeItem(item, context)
    if (item.location.player !== getViewPlayer(context)) {
      return [...transforms, 'scale(0.001)']
    }
    return [...transforms, 'scale(0.7)']
  }
}

export const keyOnCardLocator = new KeyOnCardLocator()
