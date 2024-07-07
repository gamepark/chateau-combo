import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { messengerTokenDescription } from './MessengerTokenDescription'
import { cardDescription } from './CardDescription'
import { goldCoinDescription } from './GoldCoinDescription'
import { keyDescription } from './KeyDescription'


export const Material: Record<MaterialType, MaterialDescription> = {

    [MaterialType.MessengerToken]: messengerTokenDescription,
    [MaterialType.Card]:cardDescription,
    [MaterialType.GoldCoin]:goldCoinDescription,
    [MaterialType.Key]:keyDescription

}