import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerColor } from '@gamepark/chateau-combo/PlayerColor'
import { DeckLocator, ItemContext, ItemLocator, LineLocator, PileLocator } from '@gamepark/react-game'
import { playerGoldStockLocator } from './PlayerGoldStockLocator'
import { GoldStockDescription } from './GoldStockDescription'
import { playerKeyStockLocator } from './PlayerKeyStockLocator'
import { KeyStockDescription } from './KeyStockDescription'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export class PlayerBoardLocator extends ItemLocator {

    getPosition(item: MaterialItem, _context: ItemContext): Coordinates {
        return { x: item.location.x! * 5.2, y: item.location.y! + 5.2 , z: 0.05 }
    }
    
    coordinates = { x: 20, y: 10, z: 0 }
}

export class EndOfRiverLocator extends LineLocator {
    coordinates = { x: -5, y: -18, z: 0 }
    delta = {x:0, y:11, z:0}
}

export class NobleRiverLocator extends LineLocator {
    coordinates = { x: -33, y: -18, z: 0 }
    delta = {x:7, y:0, z:0}
}

export class VillageRiverLocator extends LineLocator {
    coordinates = { x: -33, y: -7, z: 0 }
    delta = {x:7, y:0, z:0}
}

export class NobleDeckLocator extends DeckLocator {
    coordinates = { x: -40, y: -18, z: 0 }
    delta = { x: -0.05, y: -0.05, z: 0.1 }
}

export class VillageDeckLocator extends DeckLocator {
    coordinates = { x: -40, y: -7, z: 0 }
    delta = { x: -0.05, y: -0.05, z: 0.1 }
}

export class GoldStockLocator extends PileLocator {

    locationDescription = new GoldStockDescription()
    coordinates = { x: -44, y: 18, z: 0 }
    radius = 2
    delta = { x: -0.05, y: -0.05}
}

export class KeyStockLocator extends PileLocator {

    locationDescription = new KeyStockDescription()
    coordinates = { x: -44, y: 22, z: 0 }
    radius = 2
    delta = { x: -0.05, y: -0.05}
}

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {

    [LocationType.EndOfRiver] : new EndOfRiverLocator(),
    [LocationType.NobleRiver] : new NobleRiverLocator(),
    [LocationType.VillageRiver] : new VillageRiverLocator(),
    [LocationType.NobleDeck] : new NobleDeckLocator(),
    [LocationType.VillageDeck] : new VillageDeckLocator(),
    [LocationType.PlayerGoldStock] : playerGoldStockLocator,
    [LocationType.GoldStock] : new GoldStockLocator(),
    [LocationType.PlayerKeyStock]: playerKeyStockLocator,
    [LocationType.KeyStock]: new KeyStockLocator(),
    [LocationType.PlayerBoard]: new PlayerBoardLocator()

}

