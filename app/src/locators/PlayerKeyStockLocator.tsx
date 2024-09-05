/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerPositions, Position } from './PlayerBoardLocator'

class PlayerKeyStockLocator extends PileLocator {
  radius = 3
  // TODO: better management of animations + limits ?
  limit = 1000

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        return { x: -58, y: -40 }
      case Position.TopCenter:
        return { x: -15, y: -40 }
      case Position.TopRight:
        return { x: 48, y: -40 }
      case Position.BottomLeft:
        return players === 2 ? { x: -35, y: -11 } : { x: -58, y: -9 }
      case Position.BottomRight:
        return players === 2 ? { x: 28, y: -11 } : { x: 48, y: -9 }
    }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export function getTokenDeltaX(playerNumber: number): number {
  switch (playerNumber) {
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