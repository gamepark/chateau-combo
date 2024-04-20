import messengerToken from '../images/messengerToken.jpg'
import { TokenDescription, MaterialComponentType } from '@gamepark/react-game'

export class MessengerTokenDescription extends TokenDescription {
    type = MaterialComponentType.Token
    height = 20
    ratio = 1/1
    front = {
        image:messengerToken
    }
    back = {
        image:messengerToken
    }
}

export const messengerTokenDescription = new MessengerTokenDescription()