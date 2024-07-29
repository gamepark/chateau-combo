import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerColor } from '@gamepark/chateau-combo/PlayerColor'
import { DeckLocator, ItemLocator, LineLocator, PileLocator } from '@gamepark/react-game'
import { GoldStockDescription } from './GoldStockDescription'
import { goldStockLocator } from './GoldStockLocator'
import { KeyStockDescription } from './KeyStockDescription'
import { keyStockLocator } from './KeyStockLocator'
import { nobleDeckLocator } from './NobleDeckLocator'
import { nobleDiscardLocator } from './NobleDiscardLocator'
import { nobleRiverLocator } from './NobleRiverLocator'
import { playerBoardLocator } from './PlayerBoardLocator'
import { playerGoldStockLocator } from './PlayerGoldStockLocator'
import { playerKeyStockLocator } from './PlayerKeyStockLocator'
import { villageDeckLocator } from './VillageDeckLocator'
import { villageDiscardLocator } from './VillageDiscardLocator'
import { villageRiverLocator } from './VillageRiverLocator'

export class EndOfRiverLocator extends LineLocator {
    coordinates = { x: 30, y: -18, z: 0 }
    delta = {x:0, y:11, z:0}
}

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerColor, MaterialType, LocationType>>> = {

    [LocationType.EndOfRiver] : new EndOfRiverLocator(),
    [LocationType.NobleRiver] : nobleRiverLocator,
    [LocationType.VillageRiver] : villageRiverLocator,
    [LocationType.NobleDeck] : nobleDeckLocator,
    [LocationType.PlayerBoard]: playerBoardLocator,
    [LocationType.VillageDeck] : villageDeckLocator,
    [LocationType.PlayerGoldStock] : playerGoldStockLocator,
    [LocationType.GoldStock] : goldStockLocator,
    [LocationType.PlayerKeyStock]: playerKeyStockLocator,
    [LocationType.KeyStock]: keyStockLocator,
    [LocationType.NobleDiscard]: nobleDiscardLocator,
    [LocationType.VillageDiscard]: villageDiscardLocator


}

