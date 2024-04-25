import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerColor } from '@gamepark/chateau-combo/PlayerColor'
import { DeckLocator, ItemLocator, LineLocator } from '@gamepark/react-game'

export class EndOfRiverLocator extends LineLocator {
    coordinates = { x: 20, y: 0, z: 0 }
    delta = {x:5, y:0, z:0}
}

export class NobleRiverLocator extends LineLocator {
    coordinates = { x: -10, y: 20, z: 0 }
    delta = {x:5, y:0, z:0}
}

export class VillageRiverLocator extends LineLocator {
    coordinates = { x: 0, y: 0, z: 0 }
    delta = {x:5, y:0, z:0}
}

export class NobleDeckLocator extends DeckLocator {
    coordinates = { x: -30, y: 0, z: 0 }
    delta = { x: -0.05, y: -0.05, z: 0.1 }
}

export class VillageDeckLocator extends DeckLocator {
    coordinates = { x: -30, y: -10, z: 0 }
    delta = { x: -0.05, y: -0.05, z: 0.1 }
}

export class GoldStockLocator extends ItemLocator {

    coordinates = {x:-30, y:10, z:0}

}

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {

    [LocationType.EndOfRiver] : new EndOfRiverLocator(),
    [LocationType.NobleRiver] : new NobleRiverLocator(),
    [LocationType.VillageRiver] : new VillageRiverLocator(),
    [LocationType.NobleDeck] : new NobleDeckLocator(),
    [LocationType.VillageDeck] : new VillageDeckLocator(),
    [LocationType.GoldStock] : new GoldStockLocator(),

}

