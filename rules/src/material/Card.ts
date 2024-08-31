import { getEnumValues, isEnumValue } from '@gamepark/rules-api'

export enum Card {
    //Noble
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
    Chetelaine,
    Glassblower,
    Princess,
    Prince,
    HisMajesty,
    QueenMother,
    Jester,
    Chancellor,
    Baron,
    HerMajestytheQueen,
    Duchesse,
    Scribe,
    MotherSuperior,
    // Village
    Inventor=100,
    Spy,
    Vicar,
    MiraculouslyCured,
    Squire,
    Philosopher,
    Doctor,
    Executionner,
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
    Revolutionnary,
    Firsherman,
    Baker,
    Beekeeper,

}

export const cards = getEnumValues(Card)
export const isNoble = (card: Card) => card < Card.Inventor
export const isCastleType = (id: { front: Card, back: Place }) => id.back === Place.Castle
export const nobles = cards.filter(isNoble)
export const isVillage = (card: Card) => card >= Card.Inventor
export const isVillageType = (id: { front: Card, back: Place }) => id.back === Place.Village
export const villages = cards.filter(isVillage)

export enum Place {
    Village = 1,
    Castle
}
export const places = getEnumValues(Place)
