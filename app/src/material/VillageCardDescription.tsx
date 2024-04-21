import { MaterialComponentType, CardDescription } from '@gamepark/react-game'
import { VillageCard } from '@gamepark/chateau-combo/CardProperties'
import villageCard1 from '../images/village/Diamond_1.jpg'
import villageCard2 from '../images/village/Diamond_2.jpg'
import villageCard3 from '../images/village/Diamond_3.jpg'
import villageCard4 from '../images/village/Diamond_4.jpg'
import villageCard5 from '../images/village/Diamond_5.jpg'
import villageCard6 from '../images/village/Diamond_6.jpg'
import villageCard7 from '../images/village/Diamond_7.jpg'
import villageCard8 from '../images/village/Diamond_8.jpg'
import villageCard9 from '../images/village/Diamond_9.jpg'

export class VillageCardDescription extends CardDescription {
    type = MaterialComponentType.Card
    height = 10
    ratio = 1/1
    images = {
        [VillageCard.Village1]:villageCard1,
        [VillageCard.Village2]:villageCard2,
        [VillageCard.Village3]:villageCard3,
        [VillageCard.Village4]:villageCard4,
        [VillageCard.Village5]:villageCard5,
        [VillageCard.Village6]:villageCard6,
        [VillageCard.Village7]:villageCard7,
        [VillageCard.Village8]:villageCard8,
        [VillageCard.Village9]:villageCard9,

    }
}

export const villageCardDescription = new VillageCardDescription()