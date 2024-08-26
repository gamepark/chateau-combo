import messengerToken from '../images/messengerToken.png'
import { TokenDescription } from '@gamepark/react-game'

export class MessengerTokenDescription extends TokenDescription {
    height = 8.8
    ratio = 42/50
    image = messengerToken
}

export const messengerTokenDescription = new MessengerTokenDescription()