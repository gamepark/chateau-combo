import { Shield } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { Place } from '@gamepark/chateau-combo/material/Place'
import CraftManIcon from '../../images/icons/craftman.png'
import Faith from '../../images/icons/faith.png'
import MessengerCastle from '../../images/icons/messenger-castle.png'
import MessengerVillage from '../../images/icons/messenger-village.png'
import Military from '../../images/icons/military.png'


import NobilityIcon from '../../images/icons/nobility.png'
import PeasantryIcon from '../../images/icons/peasantry.png'
import Scholarship from '../../images/icons/scholarship.png'

export const shieldImages: Record<Shield, string> = {
  [Shield.Nobility]: NobilityIcon,
  [Shield.Craftsmanship]: CraftManIcon,
  [Shield.Peasantry]: PeasantryIcon,
  [Shield.Faith]: Faith,
  [Shield.Military]: Military,
  [Shield.Scholarship]: Scholarship
}

export const moveMessengerImages: Record<Place, string> = {
  [Place.Village]: MessengerVillage,
  [Place.Castle]: MessengerCastle
}