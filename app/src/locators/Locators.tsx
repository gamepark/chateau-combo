import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerColor } from '@gamepark/chateau-combo/PlayerColor'
import { DeckLocator, ItemContext, ItemLocator, LineLocator, LocationContext, LocationDescription, PileLocator } from '@gamepark/react-game'
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
import { MaterialItem, Coordinates, Location } from '@gamepark/rules-api'
import { BannerType } from '@gamepark/chateau-combo/CardCharacteristics'
import { EndOfRiverHelper } from '@gamepark/chateau-combo/rules/helpers/EndofRiverHelper'


export class EndOfRiverLocator extends ItemLocator {

    locationDescription = new EndOfRiverDescription()
    getPosition(item: MaterialItem, context: ItemContext) {
        return this.locationDescription.getCoordinates(item.location, context)
    }

}

class EndOfRiverDescription extends LocationDescription {

    locations = [
        { type: LocationType.EndOfRiver, id: BannerType.NobleBanner },
        { type: LocationType.EndOfRiver, id: BannerType.VillageBanner },
    ]
    
    getCoordinates(location: Location, _context: LocationContext): Coordinates {
        if (location.id === BannerType.NobleBanner){
            return { x: 30, y: -18, z: 0 }
        } else {
            return { x: 30, y: -8, z: 0 }
        }
    }
    
    width = 6.3
    height = 8.8
        
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

