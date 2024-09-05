import { PlayerBoardHelper } from '@gamepark/chateau-combo/rules/helpers/PlayerBoardHelper'
import { DropAreaDescription, getRelativePlayerIndex, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { chateauComboCardDescription } from '../material/ChateauComboCardDescription'

export enum Position {
  TopLeft, TopCenter, TopRight, BottomLeft, BottomRight
}

export const playerPositions = [
  [Position.BottomLeft, Position.BottomRight], // 2 players
  [Position.BottomLeft, Position.TopCenter, Position.BottomRight], // 3 players
  [Position.BottomLeft, Position.TopLeft, Position.TopRight, Position.BottomRight], // 4 players
  [Position.BottomLeft, Position.TopLeft, Position.TopCenter, Position.TopRight, Position.BottomRight] // 4 players
]

export class PlayerBoardLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    const boundaries = new PlayerBoardHelper(context.rules.game, location.player!).boundaries
    const baseCoordinates = this.getBaseCoordinates(location, context)
    baseCoordinates.x += location.x! * (chateauComboCardDescription.width + 0.2)
    if (boundaries.xMin < -1) baseCoordinates.x += (chateauComboCardDescription.width)
    if (boundaries.xMax > 1) baseCoordinates.x -= (chateauComboCardDescription.width)
    baseCoordinates.y += location.y! * (chateauComboCardDescription.height + 0.2)
    if (boundaries.yMin < -1) baseCoordinates.y += (chateauComboCardDescription.height)
    if (boundaries.yMax > 1) baseCoordinates.y -= (chateauComboCardDescription.height)


    return baseCoordinates
  }

  getBaseCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const position = playerPositions[context.rules.players.length - 2][playerIndex]
    const players = context.rules.players.length
    switch (position) {
      case Position.TopLeft:
        return { x: -33, y: -40 }
      case Position.TopCenter:
        return { x: 7.5, y: -40 }
      case Position.TopRight:
        return { x: 33, y: -40 }
      case Position.BottomLeft:
        return players === 2 ? { x: -30, y: 7 } : { x: -33, y: -9 }
      case Position.BottomRight:
        return players === 2 ? { x: 33, y: 7 } : { x: 33, y: -9 }
    }
  }

  locationDescription = new PlayerBoardDescription()
}

export class PlayerBoardDescription extends DropAreaDescription {
  constructor() {
    super(chateauComboCardDescription)
  }

  getBestDropMove(moves: MaterialMove[], _location: Location, context: ItemContext): MaterialMove {
    const moveWithSameRotation = moves.find(move =>
      isMoveItem(move) && move.location.rotation === context.rules.material(move.itemType).getItem(move.itemIndex)?.location.rotation
    )
    return moveWithSameRotation ?? moves[0]
  }
}

export const playerBoardLocator = new PlayerBoardLocator()