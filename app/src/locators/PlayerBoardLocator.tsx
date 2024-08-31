import { PlayerBoardHelper } from '@gamepark/chateau-combo/rules/helpers/PlayerBoardHelper'
import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { chateauComboCardDescription } from '../material/ChateauComboCardDescription'
import { getPosition } from './PlayerLocation'

export class PlayerBoardLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const boundaries = new PlayerBoardHelper(context.rules.game, location.player!).boundaries
    const playerIndex = getRelativePlayerIndex(context, location.player)
    const baseCoordinates = getPosition(context.rules.players.length, playerIndex)
    baseCoordinates.x += location.x! * (chateauComboCardDescription.width + 0.2)
    if (boundaries.xMin < -1) baseCoordinates.x += (chateauComboCardDescription.width)
    if (boundaries.xMax > 1) baseCoordinates.x -= (chateauComboCardDescription.width)
    baseCoordinates.y += location.y! * (chateauComboCardDescription.height + 0.2)
    if (boundaries.yMin < -1) baseCoordinates.y += (chateauComboCardDescription.height)
    if (boundaries.yMax > 1) baseCoordinates.y -= (chateauComboCardDescription.height)


    return baseCoordinates
  }
}

export const playerBoardLocator = new PlayerBoardLocator()