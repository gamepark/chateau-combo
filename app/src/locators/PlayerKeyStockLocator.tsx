/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator, getRelativePlayerIndex } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

class PlayerKeyStockLocator extends PileLocator {

  getPosition(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    return { x:-18+playerIndex*20, y:20, z: 5 }
  }

  getItemIndex(item: MaterialItem<number, number>, context: ItemContext<number, number, number>): number {
      return super.getItemIndex(item, context)
  }

  getCoordinates(_item: MaterialItem, _context: ItemContext): Coordinates {
    return this.coordinates
  }

  
}

export const playerKeyStockLocator = new PlayerKeyStockLocator()