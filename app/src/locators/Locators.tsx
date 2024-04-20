import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerColor } from '@gamepark/chateau-combo/PlayerColor'
import { ItemLocator, LineLocator } from '@gamepark/react-game'

export class EndOfRiverLocator extends LineLocator {
    coordinates = { x: 0, y: 0, z: 0 }
    delta = {x:0, y:5, z:0}
}

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {

    [LocationType.EndOfRiver] : new EndOfRiverLocator(),

}

