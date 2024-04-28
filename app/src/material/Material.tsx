import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { messengerTokenDescription } from './MessengerTokenDescription'
import { nobleCardDescription } from './NobleCardDescription'
import { villageCardDescription } from './VillageCardDescription'
import { goldCoinDescription } from './GoldCoinDescription'
import { keyDescription } from './KeyDescription'


export const Material: Record<MaterialType, MaterialDescription> = {

    [MaterialType.MessengerToken]: messengerTokenDescription,
    [MaterialType.NobleCard]:nobleCardDescription,
    [MaterialType.VillageCard]:villageCardDescription,
    [MaterialType.GoldCoin]:goldCoinDescription,
    [MaterialType.Key]:keyDescription

}