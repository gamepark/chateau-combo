import { Sign, SpaceFilling } from '../rules/effects/AbstractImmediateEffect'
import { PutMethod } from '../rules/effects/ImmediatePutGoldOnCardEffect'
import { Card } from './Card'
import { ConditionType } from './Condition'
import { ImmediateEffect, ImmediateEffectType } from './ImmediateEffect'
import { MaterialType } from './MaterialType'
import { Place } from './Place'
import { Scoring, ScoringType } from './Scoring'


export enum BlazonType {
  Noble = 1,
  Prayer,
  Teacher,
  Soldier,
  Worker,
  Farmer,
  Different,
  MissingDifferent,
  Identical
}

export type CardPattern = {
  //banner:BannerType
  cost: number
  blazon: BlazonType[]
  moveMessenger?: boolean
  // TDOO :
  immediateEffect?: ImmediateEffect[]
  scoringEffect: Scoring
}

export const cardCharacteristics: Record<number, CardPattern> = {
  [Card.Steward]: {
    cost: 0,
    blazon: [BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, goldPut: 0, putMethod: PutMethod.onTwoBest }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 3 }
  },

  [Card.Scribe]: {
    cost: 4,
    blazon: [BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Prayer] } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Teacher, line: true, column: true } }
  },

  [Card.MotherSuperior]: {
    cost: 5,
    blazon: [BlazonType.Prayer, BlazonType.Prayer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 4 }],
    scoringEffect: { type: ScoringType.ByPosition, value: 5, validPositions: [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }
  },

  [Card.HisHoliness]: {
    cost: 7,
    blazon: [BlazonType.Prayer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 3, condition: { opponentGain: 1 } }],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 6, missingBlazonType: BlazonType.Different }
  },

  [Card.Chaplain]: {
    cost: 5,
    blazon: [BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazonNumber: 1 } }],
    scoringEffect: { type: ScoringType.ByBanner, value: 2, bannerType: Place.Village }
  },

  [Card.Cardinal]: {
    cost: 4,
    blazon: [BlazonType.Prayer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { banner: Place.Castle } }],
    scoringEffect: { score: 3, condition: {type: ConditionType.PerShield, shield: BlazonType.Prayer, line: true } }
  },

  [Card.Templar]: {
    cost: 5,
    blazon: [BlazonType.Prayer, BlazonType.Soldier],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.GetCoins,
      value: 1,
      condition: { blazon: [BlazonType.Prayer], bestNeighbor: true }
    }, { type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Soldier] } }],
    scoringEffect: { type: ScoringType.ByKeys, value: 1 }
  },

  [Card.Gravedigger]: {
    cost: 4,
    blazon: [BlazonType.Prayer, BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Village, token: MaterialType.GoldCoin }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 8 }
  },

  [Card.Alchemist]: {
    cost: 6, blazon: [BlazonType.Teacher],
    scoringEffect: { type: ScoringType.ByDiscount, value: 4 }
  },

  [Card.Astronomer]: {
    cost: 5,
    blazon: [BlazonType.Teacher, BlazonType.Teacher],
    scoringEffect: { type: ScoringType.ByPosition, value: 8, validPositions: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }] }
  },

  [Card.Pilgrim]: {
    cost: 6,
    blazon: [BlazonType.Prayer],
    moveMessenger: true,
    scoringEffect: { score: 4, condition: { type: ConditionType.PerDifferentShieldType, line: true } }
  },

  [Card.Devout]: {
    cost: 4,
    blazon: [BlazonType.Prayer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { filledOrEmpty: SpaceFilling.Empty } }],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 10, missingBlazonType: BlazonType.Worker }
  },

  [Card.Nun]: {
    cost: 3,
    blazon: [BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { banner: Place.Castle } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Prayer, column: true } }
  },

  [Card.Architect]: {
    cost: 4,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    scoringEffect: { score: 2, condition: { type: ConditionType.PerDifferentShieldType } }
  },

  [Card.Goldsmith]: {
    cost: 4,
    blazon: [BlazonType.Teacher, BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazonNumber: 2 } }],
    scoringEffect: { type: ScoringType.ByPosition, value: 6, validPositions: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }] }
  },

  [Card.Apothecary]: {
    cost: 3,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Teacher, column: true } }
  },

  [Card.Professor]: {
    cost: 4,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Different] } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Teacher, line: true } }
  },

  [Card.Officer]: {
    cost: 5,
    blazon: [BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Noble, BlazonType.Soldier] } }],
    scoringEffect: { type: ScoringType.ByBlazonGroup, value: 4, blazonGroupType: [BlazonType.Noble, BlazonType.Soldier] }
  },

  [Card.Captain]: {
    cost: 5,
    blazon: [BlazonType.Soldier, BlazonType.Soldier],
    moveMessenger: true,
    scoringEffect: { type: ScoringType.ByPosition, value: 8, validPositions: [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }] }
  },

  [Card.Judge]: {
    cost: 4,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 2 }],
    scoringEffect: { type: ScoringType.ByBannerGroup, value: 3, bannerConditions: { castleBanners: 1, villageBanners: 1 } }
  },

  [Card.Patron]: {
    cost: 7,
    blazon: [BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 0, condition: { opponentGain: 2 } }],
    scoringEffect: { type: ScoringType.ByCost, value: 5, cardCost: { cost: 5, sign: Sign.Plus } }
  },

  [Card.Guildmaster]: {
    cost: 5,
    blazon: [BlazonType.Worker, BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Village, token: MaterialType.Key }],
    scoringEffect: { type: ScoringType.ByPosition, value: 5, validPositions: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }] }
  },

  [Card.General]: {
    cost: 7,
    blazon: [BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Different] } }],
    scoringEffect: { type: ScoringType.ByBlazonGroup, value: 6, blazonGroupType: [BlazonType.Identical] }
  },

  [Card.Knight]: {
    cost: 5,
    blazon: [BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { banner: Place.Castle } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Noble, line: true, column: true } }
  },

  [Card.Lookout]: {
    cost: 6,
    blazon: [BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Soldier] } }],
    scoringEffect: { score: 4, condition: { type: ConditionType.PerDifferentShieldType, column: true } }
  },

  [Card.RoyalGuard]: {
    cost: 4,
    blazon: [BlazonType.Noble, BlazonType.Soldier],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { opponentGain: 1 } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Noble, column: true } }
  },

  [Card.Banker]: {
    cost: 7,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: { type: ImmediateEffectType.PutGoldOnCard, goldPut: 2, putMethod: PutMethod.onEach },
      effect2: { type: ImmediateEffectType.GetKeys, value: 3 }
    }],
    scoringEffect: { type: ScoringType.ByGoldOnAllCards, value: 1 }
  },  // TODO : choose between, with gold on card

  [Card.Pawnbroker]: {
    cost: 4,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { cardCost: { cost: 4, sign: Sign.Equal } } }],
    scoringEffect: { type: ScoringType.ByCost, value: 3, cardCost: { cost: 4, sign: Sign.Equal } }
  },

  [Card.Chatelaine]: {
    cost: 2,
    blazon: [BlazonType.Noble, BlazonType.Worker],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerDifferentShieldType, line: true } }
  },

  [Card.Glassblower]: {
    cost: 5,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Prayer, BlazonType.Worker] } }],
    scoringEffect: { type: ScoringType.ByBlazonGroup, value: 4, blazonGroupType: [BlazonType.Prayer, BlazonType.Worker] }
  },

  [Card.Princess]: {
    cost: 3,
    blazon: [BlazonType.Noble],
    moveMessenger: true,
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Noble, line: true } }
  },

  [Card.Prince]: {
    cost: 6,
    blazon: [BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Noble] } }],
    scoringEffect: { score: 4, condition: { type: ConditionType.PerShield, shield: BlazonType.Noble, line: true } }
  },

  [Card.HisMajesty]: {
    cost: 6,
    blazon: [BlazonType.Noble, BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 0, condition: { opponentGain: 1 } }],
    scoringEffect: { score: 4, condition: { type: ConditionType.PerShield, shield: BlazonType.Noble, column: true } }
  },

  [Card.QueenMother]: {
    cost: 3,
    blazon: [BlazonType.Noble, BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, goldPut: 2, putMethod: PutMethod.onEach }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 5 }
  },

  [Card.Jester]: {
    cost: 3,
    blazon: [BlazonType.Noble],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 2, condition: { blazon: [BlazonType.Noble] } }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerShield, shield: BlazonType.Noble, line: true, column: true } }
  },

  [Card.Chancellor]: {
    cost: 6,
    blazon: [BlazonType.Noble, BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Teacher] } }],
    scoringEffect: { type: ScoringType.ByBanner, value: 2, bannerType: Place.Village }
  },

  [Card.Baron]: {
    cost: 3,
    blazon: [BlazonType.Noble],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 10, missingBlazonType: BlazonType.Farmer }
  },

  [Card.HerMajestyTheQueen]: {
    cost: 7,
    blazon: [BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Noble] } }],
    scoringEffect: { type: ScoringType.ByBlazonGroup, value: 10, blazonGroupType: [BlazonType.Noble, BlazonType.Teacher, BlazonType.Worker] }
  },

  [Card.Duchess]: {
    cost: 5,
    blazon: [BlazonType.Noble, BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 2 }],
    scoringEffect: { type: ScoringType.ByPosition, value: 8, validPositions: [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }
  },

  [Card.Inventor]: {
    cost: 2,
    blazon: [BlazonType.Teacher, BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher] } }],
    scoringEffect: { type: ScoringType.ByBanner, value: 1, bannerType: Place.Village }
  },

  [Card.Spy]: {
    cost: 4,
    blazon: [BlazonType.Teacher, BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher] } }, {
      type: ImmediateEffectType.GetKeys,
      value: 1,
      condition: { blazon: [BlazonType.Soldier], bestNeighbor: true }
    }],
    scoringEffect: { type: ScoringType.ByPosition, value: 6, validPositions: [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }] }
  },

  [Card.Vicar]: {
    cost: 0,
    blazon: [BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { banner: Place.Village } }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 5 }
  },

  [Card.MiraculouslyCured]: {
    cost: 3,
    blazon: [BlazonType.Prayer, BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { onStockCard: true } }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 4 }
  },

  [Card.Squire]: {
    cost: 0,
    blazon: [BlazonType.Soldier],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerShield, shield: BlazonType.Worker, line: true, column: true } }
  },

  [Card.Philosopher]: {
    cost: 2,
    blazon: [BlazonType.Teacher],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 10, missingBlazonType: BlazonType.Soldier }
  },

  [Card.Doctor]: {
    cost: 5,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher, BlazonType.Farmer] } }],
    scoringEffect: { type: ScoringType.ByBlazonGroup, value: 4, blazonGroupType: [BlazonType.Teacher, BlazonType.Farmer] }
  },

  [Card.Executioner]: {
    cost: 0,
    blazon: [BlazonType.Soldier],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Castle, token: MaterialType.GoldCoin }],
    scoringEffect: { type: ScoringType.ByBanner, value: 2, bannerType: Place.Castle }
  },

  [Card.Barbarian]: {
    cost: 2,
    blazon: [BlazonType.Soldier],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: { type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher], bestNeighbor: true } },
      effect2: { type: ImmediateEffectType.GetKeys, value: 2 }
    }],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 10, missingBlazonType: BlazonType.Teacher }
  },

  [Card.Militiaman]: {
    cost: 2,
    blazon: [BlazonType.Soldier],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: { type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Farmer], bestNeighbor: true } },
      effect2: { type: ImmediateEffectType.GetKeys, value: 2 }
    }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Soldier, line: true } }
  },

  [Card.Bombardier]: {
    cost: 2,
    blazon: [BlazonType.Soldier],
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: { type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Worker], bestNeighbor: true } },
      effect2: { type: ImmediateEffectType.GetKeys, value: 2 }
    }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Soldier, column: true } }
  },

  [Card.Stonemason]: {
    cost: 3,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Worker, column: true } }
  },

  [Card.Blacksmith]: {
    cost: 5,
    blazon: [BlazonType.Soldier, BlazonType.Worker],
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: { type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Noble], bestNeighbor: true } },
      effect2: { type: ImmediateEffectType.GetKeys, value: 2 }
    }],
    scoringEffect: { type: ScoringType.ByBlazonCount, value: 2, blazonQuantity: 2 }
  },

  [Card.MasterAtArms]: {
    cost: 2,
    blazon: [BlazonType.Soldier, BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Soldier] } }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 4 }
  },

  [Card.Mercenary]: {
    cost: 6,
    blazon: [BlazonType.Soldier, BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Different] } }],
    scoringEffect: { type: ScoringType.ByBlazonGroup, value: 7, blazonGroupType: [BlazonType.Prayer, BlazonType.Soldier, BlazonType.Farmer] }
  },

  [Card.Innkeeper]: {
    cost: 0,
    blazon: [BlazonType.Worker],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, goldPut: 2, putMethod: PutMethod.onEach }, {
      type: ImmediateEffectType.GetCoins,
      value: 0,
      condition: { opponentGain: 2 }
    }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 6 }
  }, // TODO
  [Card.Sculptor]: {
    cost: 3,
    blazon: [BlazonType.Prayer, BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Prayer] } }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 7 }
  },

  [Card.Clockmaker]: {
    cost: 3,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Worker] } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Worker, line: true } }
  },

  [Card.SpiceMerchant]: {
    cost: 0,
    blazon: [BlazonType.Worker],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 2, condition: { blazon: [BlazonType.Worker] } }],
    scoringEffect: { type: ScoringType.ByPosition, value: 5, validPositions: [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }] }
  },

  [Card.Armorer]: {
    cost: 3,
    blazon: [BlazonType.Worker],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Soldier, line: true, column: true } }
  },

  [Card.Potter]: {
    cost: 2,
    blazon: [BlazonType.Worker, BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, goldPut: 2, putMethod: PutMethod.onEach }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 4 }
  }, // TODO
  [Card.Farmer]: {
    cost: 5,
    blazon: [BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Farmer] } }],
    scoringEffect: { type: ScoringType.ByPosition, value: 7, validPositions: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }] }
  },

  [Card.Locksmith]: {
    cost: 4,
    blazon: [BlazonType.Worker, BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Worker] } }],
    scoringEffect: { type: ScoringType.ByKeys, value: 1 }
  },

  [Card.Carpenter]: {
    cost: 0,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.MissingDifferent] } }],
    scoringEffect: { type: ScoringType.IfHiddenCard, value: 8 }
  },

  [Card.Witch]: {
    cost: 4,
    blazon: [BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Farmer] } }, {
      type: ImmediateEffectType.GetKeys,
      value: 1,
      condition: { blazon: [BlazonType.Prayer], bestNeighbor: true }
    }],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 9, missingBlazonType: BlazonType.Prayer }
  },

  [Card.Brigand]: {
    cost: 7,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { banner: Place.Castle, bestNeighbor: true } }],
    scoringEffect: { type: ScoringType.ByBannerGroup, value: 7, bannerConditions: { castleBanners: 0, villageBanners: 3 } }
  },

  [Card.Woodcutter]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{
      type: ImmediateEffectType.GetCoins,
      value: 1,
      condition: { filledOrEmpty: SpaceFilling.Filled }
    }],
    scoringEffect: { type: ScoringType.ByPosition, value: 5, validPositions: [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }] }
  },

  [Card.Monk]: {
    cost: 4,
    blazon: [BlazonType.Prayer, BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Prayer] } }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerShield, shield: BlazonType.Farmer, line: true, column: true } }
  },

  [Card.Beggar]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { filledOrEmpty: SpaceFilling.Filled } }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerShield, shield: BlazonType.Prayer, line: true, column: true } }
  },

  [Card.StableBoy]: {
    cost: 4,
    blazon: [BlazonType.Farmer, BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Noble] } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Farmer, column: true } }
  },

  [Card.Winemaker]: {
    cost: 2,
    blazon: [BlazonType.Teacher, BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { banner: Place.Village } }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerDifferentShieldType, column: true } }
  },

  [Card.Shepherd]: {
    cost: 5,
    blazon: [BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { filledOrEmpty: SpaceFilling.Empty } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Farmer, line: true } }
  },

  [Card.Usurper]: {
    cost: 5,
    blazon: [BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazonNumber: 1 } }],
    scoringEffect: { type: ScoringType.ByBanner, value: 2, bannerType: Place.Castle }
  },

  [Card.Traveler]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 3, condition: { cardCost: { cost: 0, sign: Sign.Equal } } }],
    scoringEffect: { type: ScoringType.ByCost, value: 2, cardCost: { cost: 0, sign: Sign.Equal } }
  },

  [Card.Farmhand]: { cost: 0, blazon: [BlazonType.Farmer], moveMessenger: true, scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 5 } },

  [Card.Revolutionary]: {
    cost: 4,
    blazon: [BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { banner: Place.Village } }],
    scoringEffect: { type: ScoringType.IfMissingBlazon, value: 9, missingBlazonType: BlazonType.Noble }
  },

  [Card.Fisherman]: {
    cost: 2,
    blazon: [BlazonType.Farmer, BlazonType.Farmer],
    scoringEffect: { type: ScoringType.ByPosition, value: 4, validPositions: [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }] }
  },

  [Card.Baker]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Farmer] } }, {
      type: ImmediateEffectType.GetKeys,
      value: 1,
      condition: { banner: Place.Village }
    }],
    scoringEffect: { type: ScoringType.ByPosition, value: 3, validPositions: [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }] }
  },

  [Card.Beekeeper]: {
    cost: 2,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, goldPut: 2, putMethod: PutMethod.onEach }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 9 }
  } // TODO

}

export const getCost = (card: Card) => cardCharacteristics[card].cost
export const getBlazons = (card: Card) => cardCharacteristics[card].blazon
export const countBlazonsOfType = (card: Card, blazon: BlazonType) => cardCharacteristics[card].blazon.filter((b) => b === blazon).length
export const countBlazons = (card: Card) => cardCharacteristics[card].blazon.length

const nobleDiscountArray = [Card.Alchemist, Card.Astronomer, Card.Apothecary, Card.Chatelaine, Card.Squire, Card.Philosopher, Card.Armorer, Card.Fisherman, Card.Princess, Card.Baron]
const villageDiscountArray = [Card.Alchemist, Card.Pilgrim, Card.Architect, Card.Captain, Card.Squire, Card.Stonemason, Card.Armorer, Card.Farmhand, Card.Baron]
export const isCastleDiscount = (card: Card) => nobleDiscountArray.includes(card)
export const isVillageDiscount = (card: Card) => villageDiscountArray.includes(card)
export const isDiscountForPlace = (possessedCard: Card, place: Place) => place === Place.Castle ? isCastleDiscount(possessedCard) : isVillageDiscount(possessedCard)
export const isDiscount = (card: Card) => isCastleDiscount(card) || isVillageDiscount(card)

export const canStockCoinsArray = [Card.Steward, Card.Gravedigger, Card.Vicar, Card.MiraculouslyCured, Card.MasterAtArms, Card.Innkeeper, Card.Sculptor, Card.Potter, Card.Farmhand, Card.Beekeeper, Card.QueenMother]
export const canStockCoins = (card: Card) => canStockCoinsArray.includes(card)


