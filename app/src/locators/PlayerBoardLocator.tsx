import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { PlayerBoardHelper } from '@gamepark/chateau-combo/rules/helpers/PlayerBoardHelper'
import { getRelativePlayerIndex, ItemContext, ItemLocator, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'
import { getPosition } from './PlayerLocation'

export class PlayerBoardLocator extends ItemLocator {

  locationDescription = new PlayerBoardDescription()

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    return this.locationDescription.getCardCoordinate(item.location, context)
  }
}

class PlayerBoardDescription extends LocationDescription {

  getLocations(context: ItemContext): Location[] {

    if (context.player === undefined) {
      return []
    }

    return new PlayerBoardHelper(context.rules.game, context.player).availableSpaces

  }

  getCoordinates(location: Location, context: LocationContext): Coordinates {
    return this.getCardCoordinate(location, context)
  }

  getCardCoordinate(location: Location, _context: MaterialContext): Coordinates {
    const boundaries = new PlayerBoardHelper(_context.rules.game, location.player!).boundaries
    const deltaX = boundaries.xMax - boundaries.xMin
    const deltaY = boundaries.yMax - boundaries.yMin
    const playerIndex = getRelativePlayerIndex(_context, location.player)
    const baseCoordinates = getPosition(_context.rules.players.length, playerIndex)
    baseCoordinates.x += location.x! * (cardDescription.width + 0.2)
    if (boundaries.xMin < -1) baseCoordinates.x += (cardDescription.width)
    if (boundaries.xMax > 1) baseCoordinates.x -= (cardDescription.width)
    baseCoordinates.y += location.y! * (cardDescription.height + 0.2)
    if (boundaries.yMin < -1) baseCoordinates.y += (cardDescription.height)
    if (boundaries.yMax > 1) baseCoordinates.y -= (cardDescription.height)


    return baseCoordinates
  }

  location = { type: LocationType.PlayerBoard }
  width = 6.3
  height = 8.8

}

export const playerBoardLocator = new PlayerBoardLocator()