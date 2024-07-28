import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { PlayerBoardHelper } from '@gamepark/chateau-combo/rules/helpers/PlayerBoardHelper'
import { ItemContext, ItemLocator, LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/CardDescription'

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
    return { x: location.x! * (cardDescription.width + 0.2), y: location.y! * (cardDescription.height + 0.2), z: 0.05 }
  }

  location = { type: LocationType.PlayerBoard }
  width = 6.5
  ratio = 0.715

}

export const playerBoardLocator = new PlayerBoardLocator()