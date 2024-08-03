/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator, getRelativePlayerIndex } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

class PlayerKeyStockLocator extends PileLocator {

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    return { x:-18+playerIndex*20, y:20, z: 5 }
  }
}

export const playerKeyStockLocator = new PlayerKeyStockLocator()