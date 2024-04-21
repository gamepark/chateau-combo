import { MaterialComponentType, CardDescription } from '@gamepark/react-game'
import { NobleCard } from '@gamepark/chateau-combo/CardProperties'
import nobleCard1 from '../images/nobles/atout_1.jpg'
import nobleCard2 from '../images/nobles/atout_2.jpg'
import nobleCard3 from '../images/nobles/atout_3.jpg'
import nobleCard4 from '../images/nobles/atout_4.jpg'
import nobleCard5 from '../images/nobles/atout_5.jpg'
import nobleCard6 from '../images/nobles/atout_6.jpg'
import nobleCard7 from '../images/nobles/atout_7.jpg'
import nobleCard8 from '../images/nobles/atout_8.jpg'
import nobleCard9 from '../images/nobles/atout_9.jpg'
import BackCard from '../images/Back.jpg'

export class NobleCardDescription extends CardDescription {
    type = MaterialComponentType.Card
    height = 10
    ratio = 1/1
    images = {
        [NobleCard.Noble1]:nobleCard1,
        [NobleCard.Noble2]:nobleCard2,
        [NobleCard.Noble3]:nobleCard3,
        [NobleCard.Noble4]:nobleCard4,
        [NobleCard.Noble5]:nobleCard5,
        [NobleCard.Noble6]:nobleCard6,
        [NobleCard.Noble7]:nobleCard7,
        [NobleCard.Noble8]:nobleCard8,
        [NobleCard.Noble9]:nobleCard9,
    }

    backImage = BackCard

}

export const nobleCardDescription = new NobleCardDescription()