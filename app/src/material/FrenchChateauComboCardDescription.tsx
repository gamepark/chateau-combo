/** @jsxImportSource @emotion/react */
import { Card } from '@gamepark/chateau-combo/material/Card'

import Duchesse from '../images/cards/fr/cartesChCombo_ChC.jpg'
import Steward from '../images/cards/fr/cartesChCombo_ChC10.jpg'
import MotherSuperior from '../images/cards/fr/cartesChCombo_ChC11.jpg'
import Scribe from '../images/cards/fr/cartesChCombo_ChC12.jpg'
import Gravedigger from '../images/cards/fr/cartesChCombo_ChC13.jpg'
import Templar from '../images/cards/fr/cartesChCombo_ChC14.jpg'
import Cardinal from '../images/cards/fr/cartesChCombo_ChC15.jpg'
import Chapelain from '../images/cards/fr/cartesChCombo_ChC16.jpg'
import HisHoliness from '../images/cards/fr/cartesChCombo_ChC17.jpg'
import Nun from '../images/cards/fr/cartesChCombo_ChC18.jpg'
import Devout from '../images/cards/fr/cartesChCombo_ChC19.jpg'
import HisMajesty from '../images/cards/fr/cartesChCombo_ChC2.jpg'
import Pilgrim from '../images/cards/fr/cartesChCombo_ChC20.jpg'
import Astronomer from '../images/cards/fr/cartesChCombo_ChC21.jpg'
import Alchemist from '../images/cards/fr/cartesChCombo_ChC22.jpg'
import Professor from '../images/cards/fr/cartesChCombo_ChC23.jpg'
import Apothecary from '../images/cards/fr/cartesChCombo_ChC24.jpg'
import Goldsmith from '../images/cards/fr/cartesChCombo_ChC25.jpg'
import Architect from '../images/cards/fr/cartesChCombo_ChC26.jpg'
import Patron from '../images/cards/fr/cartesChCombo_ChC27.jpg'
import Judge from '../images/cards/fr/cartesChCombo_ChC28.jpg'
import Captain from '../images/cards/fr/cartesChCombo_ChC29.jpg'
import Prince from '../images/cards/fr/cartesChCombo_ChC3.jpg'
import Officer from '../images/cards/fr/cartesChCombo_ChC30.jpg'
import RoyalGuard from '../images/cards/fr/cartesChCombo_ChC31.jpg'
import Lookout from '../images/cards/fr/cartesChCombo_ChC32.jpg'
import Knight from '../images/cards/fr/cartesChCombo_ChC33.jpg'
import General from '../images/cards/fr/cartesChCombo_ChC34.jpg'
import Guildmaster from '../images/cards/fr/cartesChCombo_ChC35.jpg'
import Glassblower from '../images/cards/fr/cartesChCombo_ChC36.jpg'
import Chatelaine from '../images/cards/fr/cartesChCombo_ChC37.jpg'
import Pawnbroker from '../images/cards/fr/cartesChCombo_ChC38.jpg'
import Banker from '../images/cards/fr/cartesChCombo_ChC39.jpg'
import Princess from '../images/cards/fr/cartesChCombo_ChC4.jpg'
//Vilage
import MiraculouslyCured from '../images/cards/fr/cartesChCombo_ChC40.jpg'
import Vicar from '../images/cards/fr/cartesChCombo_ChC41.jpg'
import Spy from '../images/cards/fr/cartesChCombo_ChC42.jpg'
import Inventor from '../images/cards/fr/cartesChCombo_ChC43.jpg'
import Doctor from '../images/cards/fr/cartesChCombo_ChC44.jpg'
import Philosopher from '../images/cards/fr/cartesChCombo_ChC45.jpg'
import Squire from '../images/cards/fr/cartesChCombo_ChC46.jpg'
import Bombardier from '../images/cards/fr/cartesChCombo_ChC47.jpg'
import Militiaman from '../images/cards/fr/cartesChCombo_ChC48.jpg'
import Barbarian from '../images/cards/fr/cartesChCombo_ChC49.jpg'
import Chancellor from '../images/cards/fr/cartesChCombo_ChC5.jpg'
import Executionner from '../images/cards/fr/cartesChCombo_ChC50.jpg'
import Mercenary from '../images/cards/fr/cartesChCombo_ChC51.jpg'
import MasterAtArms from '../images/cards/fr/cartesChCombo_ChC52.jpg'
import Blacksmith from '../images/cards/fr/cartesChCombo_ChC53.jpg'
import Stonemason from '../images/cards/fr/cartesChCombo_ChC54.jpg'
import Potter from '../images/cards/fr/cartesChCombo_ChC55.jpg'
import Armorer from '../images/cards/fr/cartesChCombo_ChC56.jpg'
import SpiceMerchant from '../images/cards/fr/cartesChCombo_ChC57.jpg'
import Clockmaker from '../images/cards/fr/cartesChCombo_ChC58.jpg'
import Sculptor from '../images/cards/fr/cartesChCombo_ChC59.jpg'
import Jester from '../images/cards/fr/cartesChCombo_ChC6.jpg'
import Innkeeper from '../images/cards/fr/cartesChCombo_ChC60.jpg'
import Carpenter from '../images/cards/fr/cartesChCombo_ChC61.jpg'
import Locksmith from '../images/cards/fr/cartesChCombo_ChC62.jpg'
import Farmer from '../images/cards/fr/cartesChCombo_ChC63.jpg'
import Woodcutter from '../images/cards/fr/cartesChCombo_ChC64.jpg'
import Brigand from '../images/cards/fr/cartesChCombo_ChC65.jpg'
import Witch from '../images/cards/fr/cartesChCombo_ChC66.jpg'
import Beggar from '../images/cards/fr/cartesChCombo_ChC67.jpg'
import Monk from '../images/cards/fr/cartesChCombo_ChC68.jpg'
import Shepherd from '../images/cards/fr/cartesChCombo_ChC69.jpg'
import Queenmother from '../images/cards/fr/cartesChCombo_ChC7.jpg'
import Winemaker from '../images/cards/fr/cartesChCombo_ChC70.jpg'
import StableBoy from '../images/cards/fr/cartesChCombo_ChC71.jpg'
import Farmhand from '../images/cards/fr/cartesChCombo_ChC72.jpg'
import Traveler from '../images/cards/fr/cartesChCombo_ChC73.jpg'
import Usurper from '../images/cards/fr/cartesChCombo_ChC74.jpg'
import Fisherman from '../images/cards/fr/cartesChCombo_ChC75.jpg'
import Revolutionnary from '../images/cards/fr/cartesChCombo_ChC76.jpg'
import Baker from '../images/cards/fr/cartesChCombo_ChC77.jpg'
import Beekeeper from '../images/cards/fr/cartesChCombo_ChC78.jpg'
import HerMajestytheQueen from '../images/cards/fr/cartesChCombo_ChC8.jpg'
import Baron from '../images/cards/fr/cartesChCombo_ChC9.jpg'
import { ChateauComboCardDescription } from './ChateauComboCardDescription'

export class FrenchChateauComboCardDescription extends ChateauComboCardDescription {
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
}

export const frenchCardDescription = new FrenchChateauComboCardDescription()