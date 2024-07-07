import { MaterialComponentType, CardDescription } from '@gamepark/react-game'
import { Card } from '@gamepark/chateau-combo/CardProperties'
//Noble
import Steward from '../images/cards/cartesChCombo_ChC_eng-US.jpg'
import HisHoliness from '../images/cards/cartesChCombo_ChC_eng-US2.jpg'
import Chaplain from '../images/cards/cartesChCombo_ChC_eng-US3.jpg'
import Cardinal from '../images/cards/cartesChCombo_ChC_eng-US4.jpg'
import Templar from '../images/cards/cartesChCombo_ChC_eng-US5.jpg'
import Gravedigger from '../images/cards/cartesChCombo_ChC_eng-US6.jpg'
import Alchemist from '../images/cards/cartesChCombo_ChC_eng-US7.jpg'
import Astronomer from '../images/cards/cartesChCombo_ChC_eng-US8.jpg'
import Pilgrim from '../images/cards/cartesChCombo_ChC_eng-US9.jpg'
import Devout from '../images/cards/cartesChCombo_ChC_eng-US10.jpg'
import Nun from '../images/cards/cartesChCombo_ChC_eng-US11.jpg'
import Architect from '../images/cards/cartesChCombo_ChC_eng-US12.jpg'
import Goldsmith from '../images/cards/cartesChCombo_ChC_eng-US13.jpg'
import Apothecary from '../images/cards/cartesChCombo_ChC_eng-US14.jpg'
import Professor from '../images/cards/cartesChCombo_ChC_eng-US15.jpg'
import Officer from '../images/cards/cartesChCombo_ChC_eng-US16.jpg'
import Captain from '../images/cards/cartesChCombo_ChC_eng-US17.jpg'
import Judge from '../images/cards/cartesChCombo_ChC_eng-US18.jpg'
import Patron from '../images/cards/cartesChCombo_ChC_eng-US19.jpg'
import Guildmaster from '../images/cards/cartesChCombo_ChC_eng-US20.jpg'
import General from '../images/cards/cartesChCombo_ChC_eng-US21.jpg'
import Knight from '../images/cards/cartesChCombo_ChC_eng-US22.jpg'
import Lookout from '../images/cards/cartesChCombo_ChC_eng-US23.jpg'
import RoyalGuard from '../images/cards/cartesChCombo_ChC_eng-US24.jpg'
import Banker from '../images/cards/cartesChCombo_ChC_eng-US25.jpg'
import Pawnbroker from '../images/cards/cartesChCombo_ChC_eng-US26.jpg'
import Chetelaine from '../images/cards/cartesChCombo_ChC_eng-US27.jpg'
import Glassblower from '../images/cards/cartesChCombo_ChC_eng-US28.jpg'
import Princess from '../images/cards/cartesChCombo_ChC_eng-US29.jpg'
import Prince from '../images/cards/cartesChCombo_ChC_eng-US30.jpg'
import HisMajesty from '../images/cards/cartesChCombo_ChC_eng-US31.jpg'
import QueenMother from '../images/cards/cartesChCombo_ChC_eng-US32.jpg'
import Jester from '../images/cards/cartesChCombo_ChC_eng-US33.jpg'
import Chancellor from '../images/cards/cartesChCombo_ChC_eng-US34.jpg'
import Baron from '../images/cards/cartesChCombo_ChC_eng-US35.jpg'
import HerMajestytheQueen from '../images/cards/cartesChCombo_ChC_eng-US36.jpg'
import Duchesse from '../images/cards/cartesChCombo_ChC_eng-US37.jpg'
//Vilage
import Inventor from  '../images/cards/cartesChCombo_ChC_eng-US40.jpg'
import Spy from  '../images/cards/cartesChCombo_ChC_eng-US41.jpg'
import Vicar from  '../images/cards/cartesChCombo_ChC_eng-US42.jpg'
import MiraculouslyCured from  '../images/cards/cartesChCombo_ChC_eng-US43.jpg'
import Squire from  '../images/cards/cartesChCombo_ChC_eng-US44.jpg'
import Philosopher from  '../images/cards/cartesChCombo_ChC_eng-US45.jpg'
import Doctor from  '../images/cards/cartesChCombo_ChC_eng-US46.jpg'
import Executionner from  '../images/cards/cartesChCombo_ChC_eng-US47.jpg'
import Barbarian from  '../images/cards/cartesChCombo_ChC_eng-US48.jpg'
import Militiaman from  '../images/cards/cartesChCombo_ChC_eng-US49.jpg'
import Bombardier from  '../images/cards/cartesChCombo_ChC_eng-US50.jpg'
import Stonemason from  '../images/cards/cartesChCombo_ChC_eng-US51.jpg'
import Blacksmith from  '../images/cards/cartesChCombo_ChC_eng-US52.jpg'
import MasterAtArms from  '../images/cards/cartesChCombo_ChC_eng-US53.jpg'
import Mercenary from  '../images/cards/cartesChCombo_ChC_eng-US54.jpg'
import Innkeeper from  '../images/cards/cartesChCombo_ChC_eng-US55.jpg'
import Sculptor from  '../images/cards/cartesChCombo_ChC_eng-US56.jpg'
import Clockmaker from  '../images/cards/cartesChCombo_ChC_eng-US57.jpg'
import SpiceMerchant from  '../images/cards/cartesChCombo_ChC_eng-US58.jpg'
import Armorer from  '../images/cards/cartesChCombo_ChC_eng-US59.jpg'
import Potter from  '../images/cards/cartesChCombo_ChC_eng-US60.jpg'
import Farmer from  '../images/cards/cartesChCombo_ChC_eng-US61.jpg'
import Locksmith from  '../images/cards/cartesChCombo_ChC_eng-US62.jpg'
import Carpenter from  '../images/cards/cartesChCombo_ChC_eng-US63.jpg'
import Witch from  '../images/cards/cartesChCombo_ChC_eng-US64.jpg'
import Brigand from  '../images/cards/cartesChCombo_ChC_eng-US65.jpg'
import Woodcutter from  '../images/cards/cartesChCombo_ChC_eng-US66.jpg'
import Monk from  '../images/cards/cartesChCombo_ChC_eng-US67.jpg'
import Beggar from  '../images/cards/cartesChCombo_ChC_eng-US68.jpg'
import StableBoy from  '../images/cards/cartesChCombo_ChC_eng-US69.jpg'
import Winemaker from  '../images/cards/cartesChCombo_ChC_eng-US70.jpg'
import Shepherd from  '../images/cards/cartesChCombo_ChC_eng-US71.jpg'
import Usurper from  '../images/cards/cartesChCombo_ChC_eng-US72.jpg'
import Traveler from  '../images/cards/cartesChCombo_ChC_eng-US73.jpg'
import Farmhand from  '../images/cards/cartesChCombo_ChC_eng-US74.jpg'
import Revolutionnary from  '../images/cards/cartesChCombo_ChC_eng-US75.jpg'
import Firsherman from  '../images/cards/cartesChCombo_ChC_eng-US76.jpg'
import Baker from  '../images/cards/cartesChCombo_ChC_eng-US77.jpg'
import Beekeeper from  '../images/cards/cartesChCombo_ChC_eng-US78.jpg'

import BackCard from '../images/Back.jpg'

export class ChateauComboCardDescription extends CardDescription {
    type = MaterialComponentType.Card
    height = 10
    ratio = 1/1
    images = {

        // Noble

        [Card.Steward]:Steward,
        [Card.HisHoliness]:HisHoliness,
        [Card.Chaplain]:Chaplain,
        [Card.Cardinal]:Cardinal,
        [Card.Templar]:Templar,
        [Card.Gravedigger]:Gravedigger,
        [Card.Alchemist]:Alchemist,
        [Card.Astronomer]:Astronomer,
        [Card.Pilgrim]:Pilgrim,
        [Card.Devout]:Devout,
        [Card.Nun]:Nun,
        [Card.Architect]:Architect,
        [Card.Goldsmith]:Goldsmith,
        [Card.Apothecary]:Apothecary,
        [Card.Professor]:Professor,
        [Card.Officer]:Officer,
        [Card.Captain]:Captain,
        [Card.Judge]:Judge,
        [Card.Patron]:Patron,
        [Card.Guildmaster]:Guildmaster,
        [Card.General]:General,
        [Card.Knight]:Knight,
        [Card.Lookout]:Lookout,
        [Card.RoyalGuard]:RoyalGuard,
        [Card.Banker]:Banker,
        [Card.Pawnbroker]:Pawnbroker,
        [Card.Chetelaine]:Chetelaine,
        [Card.Glassblower]:Glassblower,
        [Card.Princess]:Princess,
        [Card.Prince]:Prince,
        [Card.HisMajesty]:HisMajesty,
        [Card.QueenMother]:QueenMother,
        [Card.Jester]:Jester,
        [Card.Chancellor]:Chancellor,
        [Card.Baron]:Baron,
        [Card.HerMajestytheQueen]:HerMajestytheQueen,
        [Card.Duchesse]:Duchesse,
        
        // Village

        [Card.Inventor]:Inventor,
        [Card.Spy]:Spy,
        [Card.Vicar]:Vicar,
        [Card.MiraculouslyCured]:MiraculouslyCured,
        [Card.Squire]:Squire,
        [Card.Philosopher]:Philosopher,
        [Card.Doctor]:Doctor,
        [Card.Executionner]:Executionner,
        [Card.Barbarian]:Barbarian,
        [Card.Militiaman]:Militiaman,
        [Card.Bombardier]:Bombardier,
        [Card.Stonemason]:Stonemason,
        [Card.Blacksmith]:Blacksmith,
        [Card.MasterAtArms]:MasterAtArms,
        [Card.Mercenary]:Mercenary,
        [Card.Innkeeper]:Innkeeper,
        [Card.Sculptor]:Sculptor,
        [Card.Clockmaker]:Clockmaker,
        [Card.SpiceMerchant]:SpiceMerchant,
        [Card.Armorer]:Armorer,
        [Card.Potter]:Potter,
        [Card.Farmer]:Farmer,
        [Card.Locksmith]:Locksmith,
        [Card.Carpenter]:Carpenter,
        [Card.Witch]:Witch,
        [Card.Brigand]:Brigand,
        [Card.Woodcutter]:Woodcutter,
        [Card.Monk]:Monk,
        [Card.Beggar]:Beggar,
        [Card.StableBoy]:StableBoy,
        [Card.Winemaker]:Winemaker,
        [Card.Shepherd]:Shepherd,
        [Card.Usurper]:Usurper,
        [Card.Traveler]:Traveler,
        [Card.Farmhand]:Farmhand,
        [Card.Revolutionnary]:Revolutionnary,
        [Card.Firsherman]:Firsherman,
        [Card.Baker]:Baker,
        [Card.Beekeeper]:Beekeeper,

    }

    backImage = BackCard

}

export const cardDescription = new ChateauComboCardDescription()