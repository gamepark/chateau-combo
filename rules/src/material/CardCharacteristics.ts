import { getEnumValues } from '@gamepark/rules-api'
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

const X = true, _ = false

export const shields = getEnumValues(BlazonType).filter(shield => shield <= 6) // TODO: remove filter once enum is cleaned

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
    scoringEffect: {
      score: 5, condition: {
        type: ConditionType.IfPosition, position: [
          [X, X, X],
          [_, _, _],
          [_, _, _]
        ]
      }
    }
  },

  [Card.HisHoliness]: {
    cost: 7,
    blazon: [BlazonType.Prayer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 3, condition: { opponentGain: 1 } }],
    scoringEffect: { score: 6, condition: { type: ConditionType.PerMissingShieldType } }
  },

  [Card.Chaplain]: {
    cost: 5,
    blazon: [BlazonType.Prayer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazonNumber: 1 } }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Village } }
  },

  [Card.Cardinal]: {
    cost: 4,
    blazon: [BlazonType.Prayer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { banner: Place.Castle } }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerShield, shield: BlazonType.Prayer, line: true } }
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
    scoringEffect: { score: 1, condition: { type: ConditionType.PerKey } }
  },

  [Card.Gravedigger]: {
    cost: 4,
    blazon: [BlazonType.Prayer, BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Village, token: MaterialType.GoldCoin }],
    scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 8 }
  },

  [Card.Alchemist]: {
    cost: 6, blazon: [BlazonType.Teacher],
    scoringEffect: { score: 4, condition: { type: ConditionType.PerCardWithDiscount } }
  },

  [Card.Astronomer]: {
    cost: 5,
    blazon: [BlazonType.Teacher, BlazonType.Teacher],
    scoringEffect: {
      score: 8, condition: {
        type: ConditionType.IfPosition, position: [
          [X, _, _],
          [X, _, _],
          [X, _, _]
        ]
      }
    }
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
    scoringEffect: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: BlazonType.Worker } }
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
    scoringEffect: {
      score: 6, condition: {
        type: ConditionType.IfPosition, position: [
          [X, _, _],
          [X, _, _],
          [X, _, _]
        ]
      }
    }
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
    scoringEffect: { score: 4, condition: { type: ConditionType.PerShieldsSet, shields: [BlazonType.Noble, BlazonType.Soldier] } }
  },

  [Card.Captain]: {
    cost: 5,
    blazon: [BlazonType.Soldier, BlazonType.Soldier],
    moveMessenger: true,
    scoringEffect: {
      score: 8, condition: {
        type: ConditionType.IfPosition, position: [
          [_, _, X],
          [_, _, X],
          [_, _, X]
        ]
      }
    }
  },

  [Card.Judge]: {
    cost: 4,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 2 }],
    scoringEffect: { score: 3, condition: { type: ConditionType.PerBannersSet, banners: [Place.Castle, Place.Village] } }
  },

  [Card.Patron]: {
    cost: 7,
    blazon: [BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 0, condition: { opponentGain: 2 } }],
    scoringEffect: { score: 5, condition: { type: ConditionType.PerCardWithCost, cost: 5, orGreater: true } }
  },

  [Card.Guildmaster]: {
    cost: 5,
    blazon: [BlazonType.Worker, BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Village, token: MaterialType.Key }],
    scoringEffect: {
      score: 5, condition: {
        type: ConditionType.IfPosition, position: [
          [_, _, _],
          [_, _, _],
          [X, X, X]
        ]
      }
    }
  },

  [Card.General]: {
    cost: 7,
    blazon: [BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Different] } }],
    scoringEffect: { score: 6, condition: { type: ConditionType.PerIdenticalShieldsSet, count: 3 } }
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
    scoringEffect: { score: 3, condition: { type: ConditionType.PerCardWithCost, cost: 4 } }
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
    scoringEffect: { score: 4, condition: { type: ConditionType.PerShieldsSet, shields: [BlazonType.Prayer, BlazonType.Worker] } }
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
    scoringEffect: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Village } }
  },

  [Card.Baron]: {
    cost: 3,
    blazon: [BlazonType.Noble],
    scoringEffect: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: BlazonType.Farmer } }
  },

  [Card.HerMajestyTheQueen]: {
    cost: 7,
    blazon: [BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Noble] } }],
    scoringEffect: { score: 10, condition: { type: ConditionType.PerShieldsSet, shields: [BlazonType.Noble, BlazonType.Teacher, BlazonType.Worker] } }
  },

  [Card.Duchess]: {
    cost: 5,
    blazon: [BlazonType.Noble, BlazonType.Noble],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 2 }],
    scoringEffect: {
      score: 8, condition: {
        type: ConditionType.IfPosition, position: [
          [X, X, X],
          [_, _, _],
          [_, _, _]
        ]
      }
    }
  },

  [Card.Inventor]: {
    cost: 2,
    blazon: [BlazonType.Teacher, BlazonType.Teacher],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher] } }],
    scoringEffect: { score: 1, condition: { type: ConditionType.PerBanner, banner: Place.Village } }
  },

  [Card.Spy]: {
    cost: 4,
    blazon: [BlazonType.Teacher, BlazonType.Soldier],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher] } }, {
      type: ImmediateEffectType.GetKeys,
      value: 1,
      condition: { blazon: [BlazonType.Soldier], bestNeighbor: true }
    }],
    scoringEffect: {
      score: 6, condition: {
        type: ConditionType.IfPosition, position: [
          [_, X, _],
          [_, X, _],
          [_, X, _]
        ]
      }
    }
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
    scoringEffect: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: BlazonType.Soldier } }
  },

  [Card.Doctor]: {
    cost: 5,
    blazon: [BlazonType.Teacher],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Teacher, BlazonType.Farmer] } }],
    scoringEffect: { score: 4, condition: { type: ConditionType.PerShieldsSet, shields: [BlazonType.Teacher, BlazonType.Farmer] } }
  },

  [Card.Executioner]: {
    cost: 0,
    blazon: [BlazonType.Soldier],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Castle, token: MaterialType.GoldCoin }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }
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
    scoringEffect: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: BlazonType.Teacher } }
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
    scoringEffect: { score: 2, condition: { type: ConditionType.PerCardWithShieldCount, count: 2 } }
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
    scoringEffect: { score: 7, condition: { type: ConditionType.PerShieldsSet, shields: [BlazonType.Prayer, BlazonType.Soldier, BlazonType.Farmer] } }
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
    scoringEffect: {
      score: 5, condition: {
        type: ConditionType.IfPosition, position: [
          [_, _, _],
          [X, X, X],
          [_, _, _]
        ]
      }
    }
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
    scoringEffect: {
      score: 7, condition: {
        type: ConditionType.IfPosition, position: [
          [_, _, _],
          [_, _, _],
          [X, X, X]
        ]
      }
    }
  },

  [Card.Locksmith]: {
    cost: 4,
    blazon: [BlazonType.Worker, BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.Worker] } }],
    scoringEffect: { score: 1, condition: { type: ConditionType.PerKey } }
  },

  [Card.Carpenter]: {
    cost: 0,
    blazon: [BlazonType.Worker],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { blazon: [BlazonType.MissingDifferent] } }],
    scoringEffect: { score: 8, condition: { type: ConditionType.IfCardFlippedDown } }
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
    scoringEffect: { score: 9, condition: { type: ConditionType.IfShieldMissing, shield: BlazonType.Prayer } }
  },

  [Card.Brigand]: {
    cost: 7,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { banner: Place.Castle, bestNeighbor: true } }],
    scoringEffect: { score: 7, condition: { type: ConditionType.PerBannersSet, banners: [Place.Village, Place.Village, Place.Village] } }
  },

  [Card.Woodcutter]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{
      type: ImmediateEffectType.GetCoins,
      value: 1,
      condition: { filledOrEmpty: SpaceFilling.Filled }
    }],
    scoringEffect: {
      score: 5, condition: {
        type: ConditionType.IfPosition, position: [
          [_, _, X],
          [_, _, X],
          [_, _, X]
        ]
      }
    }
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
    scoringEffect: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }
  },

  [Card.Traveler]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 3, condition: { cardCost: { cost: 0, sign: Sign.Equal } } }],
    scoringEffect: { score: 2, condition: { type: ConditionType.PerCardWithCost, cost: 0 } }
  },

  [Card.Farmhand]: { cost: 0, blazon: [BlazonType.Farmer], moveMessenger: true, scoringEffect: { type: ScoringType.ByGoldOnCard, value: 2, limit: 5 } },

  [Card.Revolutionary]: {
    cost: 4,
    blazon: [BlazonType.Farmer],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GetKeys, value: 1, condition: { banner: Place.Village } }],
    scoringEffect: { score: 9, condition: { type: ConditionType.IfShieldMissing, shield: BlazonType.Noble } }
  },

  [Card.Fisherman]: {
    cost: 2,
    blazon: [BlazonType.Farmer, BlazonType.Farmer],
    scoringEffect: {
      score: 4, condition: {
        type: ConditionType.IfPosition, position: [
          [X, _, X],
          [_, _, _],
          [X, _, X]
        ]
      }
    }
  },

  [Card.Baker]: {
    cost: 0,
    blazon: [BlazonType.Farmer],
    immediateEffect: [{ type: ImmediateEffectType.GetCoins, value: 1, condition: { blazon: [BlazonType.Farmer] } }, {
      type: ImmediateEffectType.GetKeys,
      value: 1,
      condition: { banner: Place.Village }
    }],
    scoringEffect: {
      score: 3, condition: {
        type: ConditionType.IfPosition, position: [
          [_, X, _],
          [X, _, X],
          [_, X, _]
        ]
      }
    }
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


