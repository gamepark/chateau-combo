/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getTokenDeltaX } from './PlayerKeyStockLocator'

class PlayerGoldStockLocator extends PileLocator {
  radius = 2

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    const playerNumber = context.rules.game.players.length
    return { x: -15 + playerIndex * getTokenDeltaX(playerNumber), y: 17, z: 5 }
  }
}

export const playerGoldStockLocator = new PlayerGoldStockLocator()