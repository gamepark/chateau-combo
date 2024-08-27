/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getTokenDeltaX } from './PlayerKeyStockLocator'

class PlayerGoldStockLocator extends PileLocator {
  radius = 2

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    const playerNumber = context.rules.game.players.length
    if (playerNumber < 4){
      return { x: -15 + playerIndex * getTokenDeltaX(playerNumber), y: 17, z: 5 }
    } else if (playerNumber === 4){
      return { x: -37 + playerIndex * getTokenDeltaX(playerNumber), y: 30, z: 5 }
    } else {
      return { x: -15 + playerIndex * getTokenDeltaX(playerNumber), y: 17, z: 5 }
    }
  }
}



export const playerGoldStockLocator = new PlayerGoldStockLocator()