import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Locator } from '@gamepark/react-game'
import { endOfRiverLocator } from './EndOfRiverLocator'
import { goldStockLocator } from './GoldStockLocator'
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

export const Locators: Partial<Record<LocationType, Locator>> = {

    [LocationType.EndOfRiver] : endOfRiverLocator,
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

