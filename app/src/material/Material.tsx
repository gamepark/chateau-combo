import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { frenchCardDescription } from './FrenchChateauComboCardDescription'
import { messengerTokenDescription } from './MessengerTokenDescription'
import { chateauComboCardDescription } from './ChateauComboCardDescription'
import { goldCoinDescription } from './GoldCoinDescription'
import { keyDescription } from './KeyDescription'


export const Material: Record<MaterialType, MaterialDescription> = {

    [MaterialType.MessengerToken]: messengerTokenDescription,
    [MaterialType.Card]:chateauComboCardDescription,
    [MaterialType.GoldCoin]:goldCoinDescription,
    [MaterialType.Key]:keyDescription

}

export const materialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
    'fr': {
        [MaterialType.Card]: frenchCardDescription
    }
}
