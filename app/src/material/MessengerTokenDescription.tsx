import messengerToken from '../images/messengerToken.jpg'
import { TokenDescription, MaterialComponentType } from '@gamepark/react-game'

export class MessengerTokenDescription extends TokenDescription {
    height = 10
    ratio = 1/1
    image = messengerToken
}

export const messengerTokenDescription = new MessengerTokenDescription()