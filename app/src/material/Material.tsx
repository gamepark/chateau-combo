import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { messengerTokenDescription } from './MessengerTokenDescription'


export const Material: Record<MaterialType, MaterialDescription> = {

    [MaterialType.MessengerToken]: messengerTokenDescription

}