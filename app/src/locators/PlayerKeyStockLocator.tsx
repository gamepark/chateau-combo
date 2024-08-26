/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator, getRelativePlayerIndex } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class PlayerKeyStockLocator extends PileLocator {

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, item.location.player)
    const playerNumber = context.rules.game.players.length
    return { x: -15 + playerIndex*getTokenDeltaX(playerNumber), y:7, z: 5 }
  }
}

export function getTokenDeltaX(playerNumber:number):number{
  switch(playerNumber){
    case 2:
      return 60
    case 3:
      return 30
    case 4:
      return 20
    default :
      return 20
  }
}



export const playerKeyStockLocator = new PlayerKeyStockLocator() 