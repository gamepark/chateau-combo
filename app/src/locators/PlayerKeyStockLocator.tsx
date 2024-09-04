/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator, getRelativePlayerIndex } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class PlayerKeyStockLocator extends PileLocator {
  radius = 2
  // TODO: better management of animations + limits ?
  limit = 1000

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const playerNumber = context.rules.game.players.length
    if (playerNumber < 4){
      return { x: -15 + playerIndex*getTokenDeltaX(playerNumber), y:7, z: 5 }
    } else if (playerNumber ===4){
      return { x: -30 + playerIndex*getTokenDeltaX(playerNumber), y:30, z: 5 }
    } else {
      return { x: -15 + playerIndex*getTokenDeltaX(playerNumber), y:7, z: 5 }

    }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export function getTokenDeltaX(playerNumber:number):number{
  switch(playerNumber){
    case 2:
      return 60
    case 3:
      return 30
    case 4:
      return 22
    default :
      return 20
  }
}



export const playerKeyStockLocator = new PlayerKeyStockLocator() 