import { Card } from '@gamepark/chateau-combo/material/Card'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, MaterialItem, MaterialMove } from '@gamepark/rules-api'

import Castle from '../images/cards/castle.jpg'
import Duchesse from '../images/cards/en/cartesChCombo_ChC_eng-US.jpg'
import Steward from '../images/cards/en/cartesChCombo_ChC_eng-US10.jpg'
import MotherSuperior from '../images/cards/en/cartesChCombo_ChC_eng-US11.jpg'
import Scribe from '../images/cards/en/cartesChCombo_ChC_eng-US12.jpg'
import Gravedigger from '../images/cards/en/cartesChCombo_ChC_eng-US13.jpg'
import Templar from '../images/cards/en/cartesChCombo_ChC_eng-US14.jpg'
import Cardinal from '../images/cards/en/cartesChCombo_ChC_eng-US15.jpg'
import Chapelain from '../images/cards/en/cartesChCombo_ChC_eng-US16.jpg'
import HisHoliness from '../images/cards/en/cartesChCombo_ChC_eng-US17.jpg'
import Nun from '../images/cards/en/cartesChCombo_ChC_eng-US18.jpg'
import Devout from '../images/cards/en/cartesChCombo_ChC_eng-US19.jpg'
import HisMajesty from '../images/cards/en/cartesChCombo_ChC_eng-US2.jpg'
import Pilgrim from '../images/cards/en/cartesChCombo_ChC_eng-US20.jpg'
import Astronomer from '../images/cards/en/cartesChCombo_ChC_eng-US21.jpg'
import Alchemist from '../images/cards/en/cartesChCombo_ChC_eng-US22.jpg'
import Professor from '../images/cards/en/cartesChCombo_ChC_eng-US23.jpg'
import Apothecary from '../images/cards/en/cartesChCombo_ChC_eng-US24.jpg'
import Goldsmith from '../images/cards/en/cartesChCombo_ChC_eng-US25.jpg'
import Architect from '../images/cards/en/cartesChCombo_ChC_eng-US26.jpg'
import Patron from '../images/cards/en/cartesChCombo_ChC_eng-US27.jpg'
import Judge from '../images/cards/en/cartesChCombo_ChC_eng-US28.jpg'
import Captain from '../images/cards/en/cartesChCombo_ChC_eng-US29.jpg'
import Prince from '../images/cards/en/cartesChCombo_ChC_eng-US3.jpg'
import Officer from '../images/cards/en/cartesChCombo_ChC_eng-US30.jpg'
import RoyalGuard from '../images/cards/en/cartesChCombo_ChC_eng-US31.jpg'
import Lookout from '../images/cards/en/cartesChCombo_ChC_eng-US32.jpg'
import Knight from '../images/cards/en/cartesChCombo_ChC_eng-US33.jpg'
import General from '../images/cards/en/cartesChCombo_ChC_eng-US34.jpg'
import Guildmaster from '../images/cards/en/cartesChCombo_ChC_eng-US35.jpg'
import Glassblower from '../images/cards/en/cartesChCombo_ChC_eng-US36.jpg'
import Chatelaine from '../images/cards/en/cartesChCombo_ChC_eng-US37.jpg'
import Pawnbroker from '../images/cards/en/cartesChCombo_ChC_eng-US38.jpg'
import Banker from '../images/cards/en/cartesChCombo_ChC_eng-US39.jpg'
import Princess from '../images/cards/en/cartesChCombo_ChC_eng-US4.jpg'
import MiraculouslyCured from '../images/cards/en/cartesChCombo_ChC_eng-US40.jpg'
import Vicar from '../images/cards/en/cartesChCombo_ChC_eng-US41.jpg'
import Spy from '../images/cards/en/cartesChCombo_ChC_eng-US42.jpg'
import Inventor from '../images/cards/en/cartesChCombo_ChC_eng-US43.jpg'
import Doctor from '../images/cards/en/cartesChCombo_ChC_eng-US44.jpg'
import Philosopher from '../images/cards/en/cartesChCombo_ChC_eng-US45.jpg'
import Squire from '../images/cards/en/cartesChCombo_ChC_eng-US46.jpg'
import Bombardier from '../images/cards/en/cartesChCombo_ChC_eng-US47.jpg'
import Militiaman from '../images/cards/en/cartesChCombo_ChC_eng-US48.jpg'
import Barbarian from '../images/cards/en/cartesChCombo_ChC_eng-US49.jpg'
import Chancellor from '../images/cards/en/cartesChCombo_ChC_eng-US5.jpg'
import Executionner from '../images/cards/en/cartesChCombo_ChC_eng-US50.jpg'
import Mercenary from '../images/cards/en/cartesChCombo_ChC_eng-US51.jpg'
import MasterAtArms from '../images/cards/en/cartesChCombo_ChC_eng-US52.jpg'
import Blacksmith from '../images/cards/en/cartesChCombo_ChC_eng-US53.jpg'
import Stonemason from '../images/cards/en/cartesChCombo_ChC_eng-US54.jpg'
import Potter from '../images/cards/en/cartesChCombo_ChC_eng-US55.jpg'
import Armorer from '../images/cards/en/cartesChCombo_ChC_eng-US56.jpg'
import SpiceMerchant from '../images/cards/en/cartesChCombo_ChC_eng-US57.jpg'
import Clockmaker from '../images/cards/en/cartesChCombo_ChC_eng-US58.jpg'
import Sculptor from '../images/cards/en/cartesChCombo_ChC_eng-US59.jpg'
import Jester from '../images/cards/en/cartesChCombo_ChC_eng-US6.jpg'
import Innkeeper from '../images/cards/en/cartesChCombo_ChC_eng-US60.jpg'
import Carpenter from '../images/cards/en/cartesChCombo_ChC_eng-US61.jpg'
import Locksmith from '../images/cards/en/cartesChCombo_ChC_eng-US62.jpg'
import Farmer from '../images/cards/en/cartesChCombo_ChC_eng-US63.jpg'
import Woodcutter from '../images/cards/en/cartesChCombo_ChC_eng-US64.jpg'
import Brigand from '../images/cards/en/cartesChCombo_ChC_eng-US65.jpg'
import Witch from '../images/cards/en/cartesChCombo_ChC_eng-US66.jpg'
import Beggar from '../images/cards/en/cartesChCombo_ChC_eng-US67.jpg'
import Monk from '../images/cards/en/cartesChCombo_ChC_eng-US68.jpg'
import Shepherd from '../images/cards/en/cartesChCombo_ChC_eng-US69.jpg'
import Queenmother from '../images/cards/en/cartesChCombo_ChC_eng-US7.jpg'
import Winemaker from '../images/cards/en/cartesChCombo_ChC_eng-US70.jpg'
import StableBoy from '../images/cards/en/cartesChCombo_ChC_eng-US71.jpg'
import Farmhand from '../images/cards/en/cartesChCombo_ChC_eng-US72.jpg'
import Traveler from '../images/cards/en/cartesChCombo_ChC_eng-US73.jpg'
import Usurper from '../images/cards/en/cartesChCombo_ChC_eng-US74.jpg'
import Fisherman from '../images/cards/en/cartesChCombo_ChC_eng-US75.jpg'
import Revolutionnary from '../images/cards/en/cartesChCombo_ChC_eng-US76.jpg'
import Baker from '../images/cards/en/cartesChCombo_ChC_eng-US77.jpg'
import Beekeeper from '../images/cards/en/cartesChCombo_ChC_eng-US78.jpg'
import HerMajestytheQueen from '../images/cards/en/cartesChCombo_ChC_eng-US8.jpg'
import Baron from '../images/cards/en/cartesChCombo_ChC_eng-US9.jpg'
import Village from '../images/cards/village.jpg'
import CraftManIcon from '../images/icons/craftman.png'
import Faith from '../images/icons/faith.png'
import Military from '../images/icons/military.png'

import NobilityIcon from '../images/icons/nobility.png'
import PeasantryIcon from '../images/icons/peasantry.png'
import Scholarship from '../images/icons/scholarship.png'
import Bag from '../images/icons/bag.png'
import { ChateauComboCardHelp } from './help/ChateauComboCardHelp'

export class ChateauComboCardDescription extends CardDescription {
  width = 6.3
  height = 8.8

  backImages = {
    [Place.Castle]: Castle,
    [Place.Village]: Village
  }

  help = ChateauComboCardHelp

  images = {

    // Noble

    [Card.Steward]: Steward,
    [Card.HisHoliness]: HisHoliness,
    [Card.Chaplain]: Chapelain,
    [Card.Cardinal]: Cardinal,
    [Card.Templar]: Templar,
    [Card.Gravedigger]: Gravedigger,
    [Card.Alchemist]: Alchemist,
    [Card.Astronomer]: Astronomer,
    [Card.Pilgrim]: Pilgrim,
    [Card.Devout]: Devout,
    [Card.Nun]: Nun,
    [Card.Architect]: Architect,
    [Card.Goldsmith]: Goldsmith,
    [Card.Apothecary]: Apothecary,
    [Card.Professor]: Professor,
    [Card.Officer]: Officer,
    [Card.Captain]: Captain,
    [Card.Judge]: Judge,
    [Card.Patron]: Patron,
    [Card.Guildmaster]: Guildmaster,
    [Card.General]: General,
    [Card.Knight]: Knight,
    [Card.Lookout]: Lookout,
    [Card.RoyalGuard]: RoyalGuard,
    [Card.Banker]: Banker,
    [Card.Pawnbroker]: Pawnbroker,
    [Card.Chatelaine]: Chatelaine,
    [Card.Glassblower]: Glassblower,
    [Card.Princess]: Princess,
    [Card.Prince]: Prince,
    [Card.HisMajesty]: HisMajesty,
    [Card.QueenMother]: Queenmother,
    [Card.Jester]: Jester,
    [Card.Chancellor]: Chancellor,
    [Card.Baron]: Baron,
    [Card.HerMajestyTheQueen]: HerMajestytheQueen,
    [Card.Duchess]: Duchesse,
    [Card.Scribe]: Scribe,
    [Card.MotherSuperior]: MotherSuperior,

    // Village

    [Card.Inventor]: Inventor,
    [Card.Spy]: Spy,
    [Card.Vicar]: Vicar,
    [Card.MiraculouslyCured]: MiraculouslyCured,
    [Card.Squire]: Squire,
    [Card.Philosopher]: Philosopher,
    [Card.Doctor]: Doctor,
    [Card.Executioner]: Executionner,
    [Card.Barbarian]: Barbarian,
    [Card.Militiaman]: Militiaman,
    [Card.Bombardier]: Bombardier,
    [Card.Stonemason]: Stonemason,
    [Card.Blacksmith]: Blacksmith,
    [Card.MasterAtArms]: MasterAtArms,
    [Card.Mercenary]: Mercenary,
    [Card.Innkeeper]: Innkeeper,
    [Card.Sculptor]: Sculptor,
    [Card.Clockmaker]: Clockmaker,
    [Card.SpiceMerchant]: SpiceMerchant,
    [Card.Armorer]: Armorer,
    [Card.Potter]: Potter,
    [Card.Farmer]: Farmer,
    [Card.Locksmith]: Locksmith,
    [Card.Carpenter]: Carpenter,
    [Card.Witch]: Witch,
    [Card.Brigand]: Brigand,
    [Card.Woodcutter]: Woodcutter,
    [Card.Monk]: Monk,
    [Card.Beggar]: Beggar,
    [Card.StableBoy]: StableBoy,
    [Card.Winemaker]: Winemaker,
    [Card.Shepherd]: Shepherd,
    [Card.Usurper]: Usurper,
    [Card.Traveler]: Traveler,
    [Card.Farmhand]: Farmhand,
    [Card.Revolutionary]: Revolutionnary,
    [Card.Fisherman]: Fisherman,
    [Card.Baker]: Baker,
    [Card.Beekeeper]: Beekeeper

  }

  getImages(): string[] {
    const images = super.getImages()
    images.push(NobilityIcon)
    images.push(CraftManIcon)
    images.push(PeasantryIcon)
    images.push(Faith)
    images.push(Military)
    images.push(Scholarship)
    images.push(Bag)
    return images
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    return item.location?.rotation || item.location?.type === LocationType.Deck || super.isFlippedOnTable(item, context)
  }

  canDrag(move: MaterialMove, context: ItemContext): boolean {
    const isFaceDown = isMoveItem(move) && move.itemType === MaterialType.Card && move.location.type === LocationType.PlayerBoard && move.location.rotation
    if (isFaceDown && !context.rules.material(MaterialType.Card).getItem(move.itemIndex).location.rotation) {
      return false
    }
    return super.canDrag(move, context)
  }
}

export const cardDescription = new ChateauComboCardDescription()