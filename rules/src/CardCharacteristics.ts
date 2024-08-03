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
  [Card.HisHoliness]:        { cost: 7, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false },
  [Card.Chaplain]:           { cost: 5, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true  } ,
  [Card.Cardinal]:           { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false },
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
  [Card.Officer]:            { cost: 5, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Captain]:            { cost: 5, blazon: [BlazonType.Soldier, BlazonType.Soldier], canSwapMessengerToken: true  } ,
  [Card.Judge]:              { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true  } ,
  [Card.Patron]:             { cost: 7, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false },
  [Card.Guildmaster]:        { cost: 5, blazon: [BlazonType.Worker, BlazonType.Worker],   canSwapMessengerToken: true  } ,
  [Card.General]:            { cost: 7, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Knight]:             { cost: 5, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Lookout]:            { cost: 6, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.RoyalGuard]:         { cost: 4, blazon: [BlazonType.Noble, BlazonType.Soldier],   canSwapMessengerToken: true  } ,
  [Card.Banker]:             { cost: 7, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Pawnbroker]:         { cost: 4, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Chetelaine]:         { cost: 2, blazon: [BlazonType.Noble, BlazonType.Worker],    canSwapMessengerToken: false },
  [Card.Glassblower]:        { cost: 5, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Princess]:           { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: true  } ,
  [Card.Prince]:             { cost: 6, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false },
  [Card.HisMajesty]:         { cost: 6, blazon: [BlazonType.Noble, BlazonType.Prayer],    canSwapMessengerToken: true  } ,
  [Card.QueenMother]:        { cost: 3, blazon: [BlazonType.Noble, BlazonType.Noble],     canSwapMessengerToken: false },
  [Card.Jester]:             { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: true  } ,
  [Card.Chancellor]:         { cost: 6, blazon: [BlazonType.Noble, BlazonType.Teacher],   canSwapMessengerToken: false },
  [Card.Baron]:              { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false },
  [Card.HerMajestytheQueen]: { cost: 7, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false },
  [Card.Duchesse]:           { cost: 5, blazon: [BlazonType.Noble, BlazonType.Noble],     canSwapMessengerToken: false },
  [Card.Inventor]:           { cost: 2, blazon: [BlazonType.Teacher, BlazonType.Teacher], canSwapMessengerToken: false },
  [Card.Spy]:                { cost: 4, blazon: [BlazonType.Teacher, BlazonType.Soldier], canSwapMessengerToken: false },
  [Card.Vicar]:              { cost: 0, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true  } ,
  [Card.MiraculouslyCured]:  { cost: 3, blazon: [BlazonType.Prayer, BlazonType.Prayer],   canSwapMessengerToken: true  } ,
  [Card.Squire]:             { cost: 0, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Philosopher]:        { cost: 2, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false },
  [Card.Doctor]:             { cost: 5, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true  } ,
  [Card.Executionner]:       { cost: 0, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true  } ,
  [Card.Barbarian]:          { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true  } ,
  [Card.Militiaman]:         { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true  } ,
  [Card.Bombardier]:         { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false },
  [Card.Stonemason]:         { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Blacksmith]:         { cost: 5, blazon: [BlazonType.Soldier, BlazonType.Worker],  canSwapMessengerToken: false },
  [Card.MasterAtArms]:       { cost: 2, blazon: [BlazonType.Soldier, BlazonType.Soldier], canSwapMessengerToken: false },
  [Card.Mercenary]:          { cost: 6, blazon: [BlazonType.Soldier, BlazonType.Farmer],  canSwapMessengerToken: false },
  [Card.Innkeeper]:          { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false },
  [Card.Sculptor]:           { cost: 3, blazon: [BlazonType.Prayer, BlazonType.Worker],   canSwapMessengerToken: true  } ,
  [Card.Clockmaker]:         { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.SpiceMerchant]:      { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false },
  [Card.Armorer]:            { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false },
  [Card.Potter]:             { cost: 2, blazon: [BlazonType.Worker, BlazonType.Worker],   canSwapMessengerToken: true  } ,
  [Card.Farmer]:             { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Locksmith]:          { cost: 4, blazon: [BlazonType.Worker, BlazonType.Farmer],   canSwapMessengerToken: true  } ,
  [Card.Carpenter]:          { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,
  [Card.Witch]:              { cost: 4, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Brigand]:            { cost: 7, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Woodcutter]:         { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Monk]:               { cost: 4, blazon: [BlazonType.Prayer, BlazonType.Farmer],   canSwapMessengerToken: true  } ,
  [Card.Beggar]:             { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.StableBoy]:          { cost: 4, blazon: [BlazonType.Farmer, BlazonType.Noble],    canSwapMessengerToken: false },
  [Card.Winemaker]:          { cost: 2, blazon: [BlazonType.Teacher, BlazonType.Farmer],  canSwapMessengerToken: false },
  [Card.Shepherd]:           { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Usurper]:            { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Traveler]:           { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Farmhand]:           { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Revolutionnary]:     { cost: 4, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true  } ,
  [Card.Firsherman]:         { cost: 2, blazon: [BlazonType.Farmer, BlazonType.Farmer],   canSwapMessengerToken: false },
  [Card.Baker]:              { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },
  [Card.Beekeeper]:          { cost: 2, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false },

}

export const getBanner = (card: Card) => isNoble(card)? BannerType.NobleBanner: BannerType.VillageBanner

export function getNunImmediateEffectValue(panorama:Material<number, number, number>):number {
  return panorama.getItems().filter(item => getBanner(item.id) === BannerType.NobleBanner).length
}