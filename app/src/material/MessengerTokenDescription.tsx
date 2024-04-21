import messengerToken from '../images/messengerToken.jpg'
import { TokenDescription, MaterialComponentType } from '@gamepark/react-game'

export class MessengerTokenDescription extends TokenDescription {
    type = MaterialComponentType.Token
    height = 10
    ratio = 1/1
    image = messengerToken
}

export const messengerTokenDescription = new MessengerTokenDescription()