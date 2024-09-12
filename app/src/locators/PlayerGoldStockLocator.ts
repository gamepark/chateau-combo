/** @jsxImportSource @emotion/react */
import { getRelativePlayerIndex, ItemContext, PileLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { playerPositions, Position } from './TableauLocator'

class PlayerGoldStockLocator extends PileLocator {
  radius = 2
  // TODO: better management of animations + limits ?
  limit = 1000

  getCoordinates(location: Location, context: ItemContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        return { x: -48, y: -40 }
      case Position.TopCenter:
        return { x: -7, y: -40 }
      case Position.TopRight:
        return { x: 58, y: -40 }
      case Position.BottomLeft:
        return players === 2 ? { x: -25, y: -11 } : { x: -48, y: -9 }
      case Position.BottomRight:
        return players === 2 ? { x: 38, y: -11 } : { x: 58, y: -9 }
    }
  }

  getPileId(item: MaterialItem) {
    return `${item.location.player}-${item.id}`
  }
}

export const playerGoldStockLocator = new PlayerGoldStockLocator()