/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class PlayerGoldStockLocator extends PileLocator {
  radius = 2

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    return { x: -20 + playerIndex * 20, y: 20, z: 5 }
  }
}

export const playerGoldStockLocator = new PlayerGoldStockLocator()