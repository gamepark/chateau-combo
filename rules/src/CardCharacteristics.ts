import { Card, isNoble } from './Card'
import { ImmediateEffectType } from './material/ImmediateEffectType'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Sign, SpaceFilling } from './rules/effects/AbstractImmediateEffect'
import { ScoringType } from './rules/EndGameRule'

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
  Different,
  MissingDifferent
}

export type CardPattern = {
  //banner:BannerType
  cost:number
  blazon:BlazonType[]
  canSwapMessengerToken:boolean
  // TDOO :
  immediateEffect?: ({ type: ImmediateEffectType } & Record<any, any>)[]
  scoringEffect?: ({ type: ScoringType} & Record<any, any>)
}

export const cardCharacteristics: Record<number, CardPattern> = {
  [Card.Steward]:            { cost: 0, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false },
  [Card.Scribe]:             { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Prayer]}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Teacher,line:true, column:true}} },
  [Card.MotherSuperior]:     { cost: 5, blazon: [BlazonType.Prayer, BlazonType.Prayer],   canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:4}], scoringEffect:{type:ScoringType.ByPosition, value:5, validPositions: [{x:-1, y:1},{x:0, y:1},{x:1, y:1}]} },
  [Card.HisHoliness]:        { cost: 7, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:3, condition:{opponentGain:1}}] },
  [Card.Chaplain]:           { cost: 5, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazonNumber:1}}], scoringEffect:{type:ScoringType.ByBanner, value:2, bannerType:BannerType.VillageBanner}  } ,
  [Card.Cardinal]:           { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {banner:BannerType.NobleBanner}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Prayer,line:true}}  },
  [Card.Templar]:            { cost: 5, blazon: [BlazonType.Prayer, BlazonType.Soldier],  canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Prayer], bestNeighbor:true}},{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Soldier]}}], scoringEffect:{type:ScoringType.ByKeys, value:1}  } ,
  [Card.Gravedigger]:        { cost: 4, blazon: [BlazonType.Prayer, BlazonType.Teacher],  canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.DiscardFromRiver, river:LocationType.VillageRiver, token:MaterialType.GoldCoin}] },
  [Card.Alchemist]:          { cost: 6, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByDiscount, value:4} },
  [Card.Astronomer]:         { cost: 5, blazon: [BlazonType.Teacher, BlazonType.Teacher], canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByPosition, value:8, validPositions: [{x:-1, y:-1},{x:-1, y:0},{x:-1, y:1}]} },
  [Card.Pilgrim]:            { cost: 6, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true  } ,
  [Card.Devout]:             { cost: 4, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {filledOrEmpty:SpaceFilling.Empty}}], scoringEffect:{type:ScoringType.ByMissingBlazon, value:10, missingBlazonType:BlazonType.Worker} },
  [Card.Nun]:                { cost: 3, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.NobleBanner}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Prayer, column:true}}   } ,
  [Card.Architect]:          { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true  } ,
  [Card.Goldsmith]:          { cost: 4, blazon: [BlazonType.Teacher, BlazonType.Worker],  canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazonNumber:2}}], scoringEffect:{type:ScoringType.ByPosition, value:6, validPositions: [{x:-1, y:-1},{x:-1, y:0},{x:-1, y:1}]}  } ,
  [Card.Apothecary]:         { cost: 3, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true, scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Teacher, column:true}}   } ,
  [Card.Professor]:          { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Different]}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Teacher,line:true}}   } ,
  [Card.Officer]:            { cost: 5, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Noble, BlazonType.Soldier]}}], scoringEffect:{type:ScoringType.ByBlazonGroup, value:4, blazonGroupType:[BlazonType.Noble, BlazonType.Soldier]} },
  [Card.Captain]:            { cost: 5, blazon: [BlazonType.Soldier, BlazonType.Soldier], canSwapMessengerToken: true, scoringEffect:{type:ScoringType.ByPosition, value:8, validPositions: [{x:1, y:-1},{x:1, y:0},{x:1, y:1}]}  } ,
  [Card.Judge]:              { cost: 4, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:2}] } ,
  [Card.Patron]:             { cost: 7, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:0, condition:{opponentGain:2}}]},
  [Card.Guildmaster]:        { cost: 5, blazon: [BlazonType.Worker, BlazonType.Worker],   canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.DiscardFromRiver, river:LocationType.VillageRiver, token:MaterialType.Key}], scoringEffect:{type:ScoringType.ByPosition, value:5, validPositions: [{x:-1, y:-1},{x:0, y:-1},{x:1, y:-1}]}  } ,
  [Card.General]:            { cost: 7, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Different]}}] },
  [Card.Knight]:             { cost: 5, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.NobleBanner}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Noble,line:true, column:true}}  },
  [Card.Lookout]:            { cost: 6, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Soldier]}}]},
  [Card.RoyalGuard]:         { cost: 4, blazon: [BlazonType.Noble, BlazonType.Soldier],   canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition:{opponentGain:1}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Noble, column:true}}   } ,
  [Card.Banker]:             { cost: 7, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true  } ,  // TODO : choose between, with gold on card
  [Card.Pawnbroker]:         { cost: 4, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {cardCost:{cost:4, sign:Sign.Equal}}}]  } ,
  [Card.Chetelaine]:         { cost: 2, blazon: [BlazonType.Noble, BlazonType.Worker],    canSwapMessengerToken: false },
  [Card.Glassblower]:        { cost: 5, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Prayer, BlazonType.Worker]}}], scoringEffect:{type:ScoringType.ByBlazonGroup, value:4, blazonGroupType:[BlazonType.Prayer, BlazonType.Worker]}  } ,
  [Card.Princess]:           { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: true, scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Noble,line:true}}   } ,
  [Card.Prince]:             { cost: 6, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Noble]}}], scoringEffect:{type:ScoringType.ByBlazon, value:4, blazonCondition:{blazonType:BlazonType.Noble,line:true}}  },
  [Card.HisMajesty]:         { cost: 6, blazon: [BlazonType.Noble, BlazonType.Prayer],    canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:0, condition:{opponentGain:1}}], scoringEffect:{type:ScoringType.ByBlazon, value:4, blazonCondition:{blazonType:BlazonType.Noble, column:true}}   } ,
  [Card.QueenMother]:        { cost: 3, blazon: [BlazonType.Noble, BlazonType.Noble],     canSwapMessengerToken: false },
  [Card.Jester]:             { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:2, condition: {blazon:[BlazonType.Noble]}}], scoringEffect:{type:ScoringType.ByBlazon, value:2, blazonCondition:{blazonType:BlazonType.Noble,line:true, column:true}}   } ,
  [Card.Chancellor]:         { cost: 6, blazon: [BlazonType.Noble, BlazonType.Teacher],   canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Teacher]}}], scoringEffect:{type:ScoringType.ByBanner, value:2, bannerType:BannerType.VillageBanner} },
  [Card.Baron]:              { cost: 3, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByMissingBlazon, value:10, missingBlazonType:BlazonType.Farmer} },
  [Card.HerMajestytheQueen]: { cost: 7, blazon: [BlazonType.Noble],                       canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Noble]}}], scoringEffect:{type:ScoringType.ByBlazonGroup, value:10, blazonGroupType:[BlazonType.Noble, BlazonType.Teacher, BlazonType.Worker]} },
  [Card.Duchesse]:           { cost: 5, blazon: [BlazonType.Noble, BlazonType.Noble],     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:2}], scoringEffect:{type:ScoringType.ByPosition, value:8, validPositions: [{x:-1, y:1},{x:0, y:1},{x:1, y:1}]}  },
  [Card.Inventor]:           { cost: 2, blazon: [BlazonType.Teacher, BlazonType.Teacher], canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher]}}], scoringEffect:{type:ScoringType.ByBanner, value:1, bannerType:BannerType.VillageBanner} },
  [Card.Spy]:                { cost: 4, blazon: [BlazonType.Teacher, BlazonType.Soldier], canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher]}},{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Soldier], bestNeighbor:true}}], scoringEffect:{type:ScoringType.ByPosition, value:6, validPositions: [{x:0, y:-1},{x:0, y:0},{x:0, y:1}]} },
  [Card.Vicar]:              { cost: 0, blazon: [BlazonType.Prayer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.VillageBanner}}]  } ,
  [Card.MiraculouslyCured]:  { cost: 3, blazon: [BlazonType.Prayer, BlazonType.Prayer],   canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {onStockCard:true}}]   } ,
  [Card.Squire]:             { cost: 0, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByBlazon, value:2, blazonCondition:{blazonType:BlazonType.Worker,line:true, column:true}}  },
  [Card.Philosopher]:        { cost: 2, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByMissingBlazon, value:10, missingBlazonType:BlazonType.Soldier} },
  [Card.Doctor]:             { cost: 5, blazon: [BlazonType.Teacher],                     canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher, BlazonType.Farmer]}}], scoringEffect:{type:ScoringType.ByBlazonGroup, value:4, blazonGroupType:[BlazonType.Teacher, BlazonType.Farmer]}  } ,
  [Card.Executionner]:       { cost: 0, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.DiscardFromRiver, river:LocationType.NobleRiver, token:MaterialType.GoldCoin}], scoringEffect:{type:ScoringType.ByBanner, value:2, bannerType:BannerType.NobleBanner}  } ,
  [Card.Barbarian]:          { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.ChooseBetween,effect1:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher], bestNeighbor:true}}, effect2:{type:ImmediateEffectType.GetKeys, value:2}}], scoringEffect:{type:ScoringType.ByMissingBlazon, value:10, missingBlazonType:BlazonType.Teacher}  } ,
  [Card.Militiaman]:         { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.ChooseBetween,effect1:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Farmer], bestNeighbor:true}}, effect2:{type:ImmediateEffectType.GetKeys, value:2}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Soldier,line:true}}   } ,
  [Card.Bombardier]:         { cost: 2, blazon: [BlazonType.Soldier],                     canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.ChooseBetween,effect1:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Worker], bestNeighbor:true}}, effect2:{type:ImmediateEffectType.GetKeys, value:2}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Soldier, column:true}}  },
  [Card.Stonemason]:         { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Worker, column:true}}   } ,
  [Card.Blacksmith]:         { cost: 5, blazon: [BlazonType.Soldier, BlazonType.Worker],  canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.ChooseBetween,effect1:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Noble], bestNeighbor:true}}, effect2:{type:ImmediateEffectType.GetKeys, value:2}}] },
  [Card.MasterAtArms]:       { cost: 2, blazon: [BlazonType.Soldier, BlazonType.Soldier], canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Soldier]}}] },
  [Card.Mercenary]:          { cost: 6, blazon: [BlazonType.Soldier, BlazonType.Farmer],  canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Different]}}], scoringEffect:{type:ScoringType.ByBlazonGroup, value:7, blazonGroupType:[BlazonType.Prayer, BlazonType.Soldier, BlazonType.Farmer]} },
  [Card.Innkeeper]:          { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false }, // TODO 
  [Card.Sculptor]:           { cost: 3, blazon: [BlazonType.Prayer, BlazonType.Worker],   canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Prayer]}}]  } ,
  [Card.Clockmaker]:         { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Worker]}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Worker,line:true}}   } ,
  [Card.SpiceMerchant]:      { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:2, condition: {blazon:[BlazonType.Worker]}}], scoringEffect:{type:ScoringType.ByPosition, value:5, validPositions: [{x:-1, y:0},{x:0, y:0},{x:1, y:0}]} },
  [Card.Armorer]:            { cost: 3, blazon: [BlazonType.Worker],                      canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Soldier,line:true, column:true}}  },
  [Card.Potter]:             { cost: 2, blazon: [BlazonType.Worker, BlazonType.Worker],   canSwapMessengerToken: true  } , // TODO
  [Card.Farmer]:             { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Farmer]}}], scoringEffect:{type:ScoringType.ByPosition, value:7, validPositions: [{x:-1, y:-1},{x:0, y:-1},{x:1, y:-1}]}    } ,
  [Card.Locksmith]:          { cost: 4, blazon: [BlazonType.Worker, BlazonType.Farmer],   canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Worker]}}], scoringEffect:{type:ScoringType.ByKeys, value:1} } ,
  [Card.Carpenter]:          { cost: 0, blazon: [BlazonType.Worker],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.MissingDifferent]}}]  } ,
  [Card.Witch]:              { cost: 4, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Farmer]}},{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Prayer], bestNeighbor:true}}], scoringEffect:{type:ScoringType.ByMissingBlazon, value:9, missingBlazonType:BlazonType.Prayer}  } ,
  [Card.Brigand]:            { cost: 7, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {banner:BannerType.NobleBanner, bestNeighbor:true}}] },
  [Card.Woodcutter]:         { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {filledOrEmpty:SpaceFilling.Filled}, scoringEffect:{type:ScoringType.ByPosition, value:5, validPositions: [{x:1, y:-1},{x:1, y:0},{x:1, y:1}]}  }]},
  [Card.Monk]:               { cost: 4, blazon: [BlazonType.Prayer, BlazonType.Farmer],   canSwapMessengerToken: true , immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Prayer]}}] } ,
  [Card.Beggar]:             { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {filledOrEmpty:SpaceFilling.Filled}}], scoringEffect:{type:ScoringType.ByBlazon, value:2, blazonCondition:{blazonType:BlazonType.Prayer,line:true, column:true}}  },
  [Card.StableBoy]:          { cost: 4, blazon: [BlazonType.Farmer, BlazonType.Noble],    canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazon:[BlazonType.Noble]}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Farmer, column:true}}  },
  [Card.Winemaker]:          { cost: 2, blazon: [BlazonType.Teacher, BlazonType.Farmer],  canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {banner:BannerType.VillageBanner}}] },
  [Card.Shepherd]:           { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {filledOrEmpty:SpaceFilling.Empty}}], scoringEffect:{type:ScoringType.ByBlazon, value:3, blazonCondition:{blazonType:BlazonType.Farmer,line:true}}   } ,
  [Card.Usurper]:            { cost: 5, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {blazonNumber:1}}], scoringEffect:{type:ScoringType.ByBanner, value:2, bannerType:BannerType.NobleBanner}  } ,
  [Card.Traveler]:           { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:3, condition: {cardCost:{cost:0, sign:Sign.Equal}}}] },
  [Card.Farmhand]:           { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, scoringEffect:{type:ScoringType.ByBlazon, value:2, blazonCondition:{blazonType:BlazonType.Farmer,line:true, column:true}}  } ,
  [Card.Revolutionnary]:     { cost: 4, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: true, immediateEffect:[{type:ImmediateEffectType.GetKeys, value:1, condition: {banner:BannerType.VillageBanner}}], scoringEffect:{type:ScoringType.ByMissingBlazon, value:9, missingBlazonType:BlazonType.Noble}  } ,
  [Card.Firsherman]:         { cost: 2, blazon: [BlazonType.Farmer, BlazonType.Farmer],   canSwapMessengerToken: false, scoringEffect:{type:ScoringType.ByPosition, value:4, validPositions: [{x:-1, y:-1},{x:-1, y:1},{x:1, y:-1},{x:1, y:1}]}  },
  [Card.Baker]:              { cost: 0, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false, immediateEffect:[{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Farmer]}}, {type:ImmediateEffectType.GetKeys, value:1, condition: {banner:BannerType.VillageBanner}}], scoringEffect:{type:ScoringType.ByPosition, value:3, validPositions: [{x:-1, y:0},{x:1, y:0},{x:0, y:-1},{x:0, y:1}]}   },
  [Card.Beekeeper]:          { cost: 2, blazon: [BlazonType.Farmer],                      canSwapMessengerToken: false }, // TODO

}

export const getCost = (card:Card) => cardCharacteristics[card].cost
export const getBlazons = (card:Card) => cardCharacteristics[card].blazon
export const getBanner = (card: Card) => isNoble(card)? BannerType.NobleBanner: BannerType.VillageBanner
export const hasTheBlazon = (card:Card, targetBlazon: BlazonType) => cardCharacteristics[card].blazon.some(ownedBlazon => ownedBlazon === targetBlazon)
export const howManyTargettedBlazon = (card:Card, targetBlazon:BlazonType) => {
  return cardCharacteristics[card].blazon.reduce((acc, cur) => acc + (cur === targetBlazon ? 1 : 0), 0)
}

export const howManyBlazons = (card:Card) => cardCharacteristics[card].blazon.length

const nobleDiscountArray = [Card.Alchemist, Card.Astronomer, Card.Apothecary, Card.Chetelaine, Card.Squire, Card.Philosopher, Card.Armorer, Card.Firsherman, Card.Princess, Card.Baron]
const villageDiscountArray = [Card.Alchemist, Card.Pilgrim, Card.Architect, Card.Captain, Card.Squire, Card.Stonemason, Card.Armorer, Card.Farmhand, Card.Baron ]
export const isNobleDiscount = (card:Card) => nobleDiscountArray.includes(card) 
export const isVillageDiscount = (card:Card) => villageDiscountArray.includes(card)

export const canStockCoinsArray = [Card.Steward, Card.Gravedigger, Card.Vicar, Card.MiraculouslyCured, Card.MasterAtArms, Card.Innkeeper, Card.Sculptor, Card.Potter, Card.Farmhand, Card.Beekeeper, Card.QueenMother]
export const canStockCoins = (card:Card) => canStockCoinsArray.includes(card)


