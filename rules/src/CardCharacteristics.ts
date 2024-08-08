import { Material } from '@gamepark/rules-api'
import { Card, isNoble } from './Card'
import { ImmediateEffectType } from './material/ImmediateEffectType'

export enum BannerType {
  NobleBanner = 1, VillageBanner
}

export enum BlazonType {
  Noble = 1,
  Prayer,
  Teacher,
  Soldier,
  Worker,
  Farmer,
}

export type CardPattern = {
  //banner:BannerType
  cost:number
  blazon:BlazonType[]
  canSwapMessengerToken:boolean
  // TDOO :
  immediateEffect?: { type: ImmediateEffectType } & Record<any, any> 
  // scoringEffect:() => void
}

export const cardCharacteristics: Record<number, CardPattern> = {
  [Card.Steward]:            { cost: 0, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false },
  [Card.Scribe]:             { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Prayer]}} },
  [Card.MotherSuperior]:     { cost: 5, blazon: [BlazonType.Prayer, BlazonType.Prayer],   canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:4}  },
  [Card.HisHoliness]:        { cost: 7, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false },
  [Card.Chaplain]:           { cost: 5, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true  } ,
  [Card.Cardinal]:           { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {banner:BannerType.NobleBanner}} },
  [Card.Templar]:            { cost: 5, blazon: [BlazonType.Prayer, BlazonType.Soldier],  canSwapMessengerToken: true  } ,
  [Card.Gravedigger]:        { cost: 4, blazon: [BlazonType.Prayer, BlazonType.Teacher],  canSwapMessengerToken: false },
  [Card.Alchemist]:          { cost: 6, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false },
  [Card.Astronomer]:         { cost: 5, blazon: [BlazonType.Teacher, BlazonType.Teacher], canSwapMessengerToken: false },
  [Card.Pilgrim]:            { cost: 6, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true  } ,
  [Card.Devout]:             { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false },
  [Card.Nun]:                { cost: 3, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.NobleBanner}}  } ,
  [Card.Architect]:          { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true  } ,
  [Card.Goldsmith]:          { cost: 4, blazon: [BlazonType.Teacher, BlazonType.Worker],  canSwapMessengerToken: true  } ,
  [Card.Apothecary]:         { cost: 3, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true  } ,
  [Card.Professor]:          { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true  } ,
  [Card.Officer]:            { cost: 5, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Noble, BlazonType.Soldier]}} },
  [Card.Captain]:            { cost: 5, blazon: [BlazonType.Soldier, BlazonType.Soldier], canSwapMessengerToken: true  } ,
  [Card.Judge]:              { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetKeys, value:2} } ,
  [Card.Patron]:             { cost: 7, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false },
  [Card.Guildmaster]:        { cost: 5, blazon: [BlazonType.Worker, BlazonType.Worker],   canSwapMessengerToken: true  } ,
  [Card.General]:            { cost: 7, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Knight]:             { cost: 5, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.NobleBanner}} },
  [Card.Lookout]:            { cost: 6, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Soldier]}}},
  [Card.RoyalGuard]:         { cost: 4, blazon: [BlazonType.Noble, BlazonType.Soldier],   canSwapMessengerToken: true  } ,
  [Card.Banker]:             { cost: 7, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Pawnbroker]:         { cost: 4, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Chetelaine]:         { cost: 2, blazon: [BlazonType.Noble, BlazonType.Worker],    canSwapMessengerToken: false },
  [Card.Glassblower]:        { cost: 5, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Prayer, BlazonType.Worker]}}  } ,
  [Card.Princess]:           { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: true  } ,
  [Card.Prince]:             { cost: 6, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Noble]}} },
  [Card.HisMajesty]:         { cost: 6, blazon: [BlazonType.Noble, BlazonType.Prayer],    canSwapMessengerToken: true  } ,
  [Card.QueenMother]:        { cost: 3, blazon: [BlazonType.Noble, BlazonType.Noble],     canSwapMessengerToken: false },
  [Card.Jester]:             { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:2, condition: {blazon:[BlazonType.Noble]}}  } ,
  [Card.Chancellor]:         { cost: 6, blazon: [BlazonType.Noble, BlazonType.Teacher],   canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Teacher]}} },
  [Card.Baron]:              { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false },
  [Card.HerMajestytheQueen]: { cost: 7, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Noble]}} },
  [Card.Duchesse]:           { cost: 5, blazon: [BlazonType.Noble, BlazonType.Noble],     canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:2} },
  [Card.Inventor]:           { cost: 2, blazon: [BlazonType.Teacher, BlazonType.Teacher], canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher]}} },
  [Card.Spy]:                { cost: 4, blazon: [BlazonType.Teacher, BlazonType.Soldier], canSwapMessengerToken: false },
  [Card.Vicar]:              { cost: 0, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.VillageBanner}}  } ,
  [Card.MiraculouslyCured]:  { cost: 3, blazon: [BlazonType.Prayer, BlazonType.Prayer],   canSwapMessengerToken: true  } ,
  [Card.Squire]:             { cost: 0, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Philosopher]:        { cost: 2, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false },
  [Card.Doctor]:             { cost: 5, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher, BlazonType.Farmer]}}  } ,
  [Card.Executionner]:       { cost: 0, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true  } ,
  [Card.Barbarian]:          { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true  } ,
  [Card.Militiaman]:         { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true  } ,
  [Card.Bombardier]:         { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Stonemason]:         { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Blacksmith]:         { cost: 5, blazon: [BlazonType.Soldier, BlazonType.Worker],  canSwapMessengerToken: false },
  [Card.MasterAtArms]:       { cost: 2, blazon: [BlazonType.Soldier, BlazonType.Soldier], canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Soldier]}} },
  [Card.Mercenary]:          { cost: 6, blazon: [BlazonType.Soldier, BlazonType.Farmer],  canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Farmer]}} },
  [Card.Innkeeper]:          { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false },
  [Card.Sculptor]:           { cost: 3, blazon: [BlazonType.Prayer, BlazonType.Worker],   canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Prayer]}}  } ,
  [Card.Clockmaker]:         { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Worker]}}  } ,
  [Card.SpiceMerchant]:      { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:2, condition: {blazon:[BlazonType.Worker]}} },
  [Card.Armorer]:            { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false },
  [Card.Potter]:             { cost: 2, blazon: [BlazonType.Worker, BlazonType.Worker],   canSwapMessengerToken: true  } ,
  [Card.Farmer]:             { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Locksmith]:          { cost: 4, blazon: [BlazonType.Worker, BlazonType.Farmer],   canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Worker]}}  } ,
  [Card.Carpenter]:          { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Witch]:              { cost: 4, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Brigand]:            { cost: 7, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Woodcutter]:         { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Monk]:               { cost: 4, blazon: [BlazonType.Prayer, BlazonType.Farmer],   canSwapMessengerToken: true , immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Prayer]}} } ,
  [Card.Beggar]:             { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.StableBoy]:          { cost: 4, blazon: [BlazonType.Farmer, BlazonType.Noble],    canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Noble]}} },
  [Card.Winemaker]:          { cost: 2, blazon: [BlazonType.Teacher, BlazonType.Farmer],  canSwapMessengerToken: false, immediateEffect:{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.NobleBanner}} },
  [Card.Shepherd]:           { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Usurper]:            { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Traveler]:           { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Farmhand]:           { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Revolutionnary]:     { cost: 4, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, immediateEffect:{type:ImmediateEffectType.GetKeys, value:1, condition: {banner:BannerType.VillageBanner}}  } ,
  [Card.Firsherman]:         { cost: 2, blazon: [BlazonType.Farmer, BlazonType.Farmer],   canSwapMessengerToken: false },
  [Card.Baker]:              { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Beekeeper]:          { cost: 2, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },

}

export const getBanner = (card: Card) => isNoble(card)? BannerType.NobleBanner: BannerType.VillageBanner
export const hasTheBlazon = (card:Card, targetBlazon: BlazonType) => cardCharacteristics[card].blazon.some(ownedBlazon => ownedBlazon === targetBlazon)
export const howManyTargettedBlazon = (card:Card, targetBlazon:BlazonType) => {
  return cardCharacteristics[card].blazon.reduce((acc, cur) => acc + (cur === targetBlazon ? 1 : 0), 0)
}

