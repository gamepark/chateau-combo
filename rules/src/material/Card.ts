import { getEnumValues } from '@gamepark/rules-api'

export enum Card {
  //Castle
  Steward = 1,
  HisHoliness,
  Chaplain,
  Cardinal,
  Templar,
  Gravedigger,
  Alchemist,
  Astronomer,
  Pilgrim,
  Devout,
  Nun,
  Architect,
  Goldsmith,
  Apothecary,
  Professor,
  Officer,
  Captain,
  Judge,
  Patron,
  Guildmaster,
  General,
  Knight,
  Lookout,
  RoyalGuard,
  Banker,
  Pawnbroker,
  Chatelaine,
  Glassblower,
  Princess,
  Prince,
  HisMajesty,
  QueenMother,
  Jester,
  Chancellor,
  Baron,
  HerMajestyTheQueen,
  Duchess,
  Scribe,
  MotherSuperior,
  // Village
  Inventor = 100,
  Spy,
  Vicar,
  MiraculouslyCured,
  Squire,
  Philosopher,
  Doctor,
  Executioner,
  Barbarian,
  Militiaman,
  Bombardier,
  Stonemason,
  Blacksmith,
  MasterAtArms,
  Mercenary,
  Innkeeper,
  Sculptor,
  Clockmaker,
  SpiceMerchant,
  Armorer,
  Potter,
  Farmer,
  Locksmith,
  Carpenter,
  Witch,
  Brigand,
  Woodcutter,
  Monk,
  Beggar,
  StableBoy,
  Winemaker,
  Shepherd,
  Usurper,
  Traveler,
  Farmhand,
  Revolutionary,
  Fisherman,
  Baker,
  Beekeeper,
}

export const cards = getEnumValues(Card)
export const getCardPlace = (card: Card) => Math.floor(card / 100) + 1
