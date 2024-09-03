import { getEnumValues } from '@gamepark/rules-api'
import { Card } from './Card'
import { ConditionType } from './Condition'
import { ImmediateEffect, ImmediateEffectType } from './ImmediateEffect'
import { MaterialType } from './MaterialType'
import { Place } from './Place'
import { Scoring } from './Scoring'


export enum Shield {
  Nobility = 1,
  Faith,
  Scholarship,
  Military,
  Craftsmanship,
  Peasantry
}

const X = true, _ = false

export const shields = getEnumValues(Shield)

export type CardPattern = {
  //banner:BannerType
  cost: number
  shields: Shield[]
  moveMessenger?: boolean
  immediateEffect?: ImmediateEffect[]
  scoring: Scoring
}

export const cardCharacteristics: Record<number, CardPattern> = {
  [Card.Steward]: {
    cost: 0,
    shields: [Shield.Nobility],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, cardsLimit: 2 }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 3 } }
  },

  [Card.Scribe]: {
    cost: 4,
    shields: [Shield.Faith],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Faith } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship, line: true, column: true } }
  },

  [Card.MotherSuperior]: {
    cost: 5,
    shields: [Shield.Faith, Shield.Faith],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 4 }],
    scoring: {
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
    shields: [Shield.Faith],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 3, opponentsGain: 1 }],
    scoring: { score: 6, condition: { type: ConditionType.PerMissingShieldType } }
  },

  [Card.Chaplain]: {
    cost: 5,
    shields: [Shield.Faith],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerCardWithShieldCount, count: 1 } }],
    scoring: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Village } }
  },

  [Card.Cardinal]: {
    cost: 4,
    shields: [Shield.Faith],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Faith, line: true } }
  },

  [Card.Templar]: {
    cost: 5,
    shields: [Shield.Faith, Shield.Military],
    moveMessenger: true,
    immediateEffect: [
      {
        type: ImmediateEffectType.GainGold, gain: 1, condition: {
          type: ConditionType.BestNeighbor, condition: { type: ConditionType.PerShield, shield: Shield.Faith }
        }
      },
      { type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Military } }
    ],
    scoring: { score: 1, condition: { type: ConditionType.PerKey } }
  },

  [Card.Gravedigger]: {
    cost: 4,
    shields: [Shield.Faith, Shield.Scholarship],
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Village, token: MaterialType.GoldCoin }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 8 } }
  },

  [Card.Alchemist]: {
    cost: 6, shields: [Shield.Scholarship],
    scoring: { score: 4, condition: { type: ConditionType.PerCardWithDiscount } }
  },

  [Card.Astronomer]: {
    cost: 5,
    shields: [Shield.Scholarship, Shield.Scholarship],
    scoring: {
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
    shields: [Shield.Faith],
    moveMessenger: true,
    scoring: { score: 4, condition: { type: ConditionType.PerDifferentShieldType, line: true } }
  },

  [Card.Devout]: {
    cost: 4,
    shields: [Shield.Faith],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerEmptyPosition } }],
    scoring: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: Shield.Craftsmanship } }
  },

  [Card.Nun]: {
    cost: 3,
    shields: [Shield.Faith],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Faith, column: true } }
  },

  [Card.Architect]: {
    cost: 4,
    shields: [Shield.Scholarship],
    moveMessenger: true,
    scoring: { score: 2, condition: { type: ConditionType.PerDifferentShieldType } }
  },

  [Card.Goldsmith]: {
    cost: 4,
    shields: [Shield.Scholarship, Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerCardWithShieldCount, count: 2 } }],
    scoring: {
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
    shields: [Shield.Scholarship],
    moveMessenger: true,
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship, column: true } }
  },

  [Card.Professor]: {
    cost: 4,
    shields: [Shield.Scholarship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerDifferentShieldType } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship, line: true } }
  },

  [Card.Officer]: {
    cost: 5,
    shields: [Shield.Military],
    immediateEffect: [
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Nobility } },
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Military } }
    ],
    scoring: { score: 4, condition: { type: ConditionType.PerShieldsSet, shields: [Shield.Nobility, Shield.Military] } }
  },

  [Card.Captain]: {
    cost: 5,
    shields: [Shield.Military, Shield.Military],
    moveMessenger: true,
    scoring: {
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
    shields: [Shield.Scholarship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 2 }],
    scoring: { score: 3, condition: { type: ConditionType.PerBannersSet, banners: [Place.Castle, Place.Village] } }
  },

  [Card.Patron]: {
    cost: 7,
    shields: [Shield.Scholarship],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 0, opponentsGain: 2 }],
    scoring: { score: 5, condition: { type: ConditionType.PerCardWithCost, cost: 5, orGreater: true } }
  },

  [Card.Guildmaster]: {
    cost: 5,
    shields: [Shield.Craftsmanship, Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Village, token: MaterialType.Key }],
    scoring: {
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
    shields: [Shield.Military],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerDifferentShieldType } }],
    scoring: { score: 6, condition: { type: ConditionType.PerIdenticalShieldsSet, count: 3 } }
  },

  [Card.Knight]: {
    cost: 5,
    shields: [Shield.Military],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Nobility, line: true, column: true } }
  },

  [Card.Lookout]: {
    cost: 6,
    shields: [Shield.Military],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Military } }],
    scoring: { score: 4, condition: { type: ConditionType.PerDifferentShieldType, column: true } }
  },

  [Card.RoyalGuard]: {
    cost: 4,
    shields: [Shield.Nobility, Shield.Military],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, opponentsGain: 1 }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Nobility, column: true } }
  },

  [Card.Banker]: {
    cost: 7,
    shields: [Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: { type: ImmediateEffectType.PutGoldOnCard, gold: 2 },
      effect2: { type: ImmediateEffectType.GainKeys, gain: 3 }
    }],
    scoring: { score: 1, condition: { type: ConditionType.PerGoldInAllPurses } }
  },

  [Card.Pawnbroker]: {
    cost: 4,
    shields: [Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerCardWithCost, cost: 4 } }],
    scoring: { score: 3, condition: { type: ConditionType.PerCardWithCost, cost: 4 } }
  },

  [Card.Chatelaine]: {
    cost: 2,
    shields: [Shield.Nobility, Shield.Craftsmanship],
    scoring: { score: 2, condition: { type: ConditionType.PerDifferentShieldType, line: true } }
  },

  [Card.Glassblower]: {
    cost: 5,
    shields: [Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Faith } },
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship } }
    ],
    scoring: { score: 4, condition: { type: ConditionType.PerShieldsSet, shields: [Shield.Faith, Shield.Craftsmanship] } }
  },

  [Card.Princess]: {
    cost: 3,
    shields: [Shield.Nobility],
    moveMessenger: true,
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Nobility, line: true } }
  },

  [Card.Prince]: {
    cost: 6,
    shields: [Shield.Nobility],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Nobility } }],
    scoring: { score: 4, condition: { type: ConditionType.PerShield, shield: Shield.Nobility, line: true } }
  },

  [Card.HisMajesty]: {
    cost: 6,
    shields: [Shield.Nobility, Shield.Faith],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 0, opponentsGain: 1 }],
    scoring: { score: 4, condition: { type: ConditionType.PerShield, shield: Shield.Nobility, column: true } }
  },

  [Card.QueenMother]: {
    cost: 3,
    shields: [Shield.Nobility, Shield.Nobility],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, gold: 2 }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 5 } }
  },

  [Card.Jester]: {
    cost: 3,
    shields: [Shield.Nobility],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 2, condition: { type: ConditionType.PerShield, shield: Shield.Nobility } }],
    scoring: { score: 2, condition: { type: ConditionType.PerShield, shield: Shield.Nobility, line: true, column: true } }
  },

  [Card.Chancellor]: {
    cost: 6,
    shields: [Shield.Nobility, Shield.Scholarship],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship } }],
    scoring: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }
  },

  [Card.Baron]: {
    cost: 3,
    shields: [Shield.Nobility],
    scoring: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: Shield.Peasantry } }
  },

  [Card.HerMajestyTheQueen]: {
    cost: 7,
    shields: [Shield.Nobility],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Nobility } }],
    scoring: { score: 10, condition: { type: ConditionType.PerShieldsSet, shields: [Shield.Nobility, Shield.Scholarship, Shield.Craftsmanship] } }
  },

  [Card.Duchess]: {
    cost: 5,
    shields: [Shield.Nobility, Shield.Nobility],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 2 }],
    scoring: {
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
    shields: [Shield.Scholarship, Shield.Scholarship],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship } }],
    scoring: { score: 1, condition: { type: ConditionType.PerBanner, banner: Place.Village } }
  },

  [Card.Spy]: {
    cost: 4,
    shields: [Shield.Scholarship, Shield.Military],
    immediateEffect: [
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship } },
      {
        type: ImmediateEffectType.GainKeys, gain: 1, condition: {
          type: ConditionType.BestNeighbor,
          condition: { type: ConditionType.PerShield, shield: Shield.Military }
        }
      }
    ],
    scoring: {
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
    shields: [Shield.Faith],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Village } }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 5 } }
  },

  [Card.MiraculouslyCured]: {
    cost: 3,
    shields: [Shield.Faith, Shield.Faith],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerCardWithPurse } }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 4 } }
  },

  [Card.Squire]: {
    cost: 0,
    shields: [Shield.Military],
    scoring: { score: 2, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship, line: true, column: true } }
  },

  [Card.Philosopher]: {
    cost: 2,
    shields: [Shield.Scholarship],
    scoring: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: Shield.Military } }
  },

  [Card.Doctor]: {
    cost: 5,
    shields: [Shield.Scholarship],
    moveMessenger: true,
    immediateEffect: [
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Scholarship } },
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry } }
    ],
    scoring: { score: 4, condition: { type: ConditionType.PerShieldsSet, shields: [Shield.Scholarship, Shield.Peasantry] } }
  },

  [Card.Executioner]: {
    cost: 0,
    shields: [Shield.Military],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.DiscardFromRiver, river: Place.Castle, token: MaterialType.GoldCoin }],
    scoring: { score: 1, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }
  },

  [Card.Barbarian]: {
    cost: 2,
    shields: [Shield.Military],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: {
        type: ImmediateEffectType.GainGold, gain: 1, condition: {
          type: ConditionType.BestNeighbor,
          condition: { type: ConditionType.PerShield, shield: Shield.Scholarship }
        }
      },
      effect2: { type: ImmediateEffectType.GainKeys, gain: 2 }
    }],
    scoring: { score: 10, condition: { type: ConditionType.IfShieldMissing, shield: Shield.Scholarship } }
  },

  [Card.Militiaman]: {
    cost: 2,
    shields: [Shield.Military],
    moveMessenger: true,
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: {
        type: ImmediateEffectType.GainGold, gain: 1, condition: {
          type: ConditionType.BestNeighbor,
          condition: { type: ConditionType.PerShield, shield: Shield.Peasantry }
        }
      },
      effect2: { type: ImmediateEffectType.GainKeys, gain: 2 }
    }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Military, line: true } }
  },

  [Card.Bombardier]: {
    cost: 2,
    shields: [Shield.Military],
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: {
        type: ImmediateEffectType.GainGold, gain: 1, condition: {
          type: ConditionType.BestNeighbor,
          condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship }
        }
      },
      effect2: { type: ImmediateEffectType.GainKeys, gain: 2 }
    }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Military, column: true } }
  },

  [Card.Stonemason]: {
    cost: 3,
    shields: [Shield.Craftsmanship],
    moveMessenger: true,
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship, column: true } }
  },

  [Card.Blacksmith]: {
    cost: 5,
    shields: [Shield.Military, Shield.Craftsmanship],
    immediateEffect: [{
      type: ImmediateEffectType.ChooseBetween,
      effect1: {
        type: ImmediateEffectType.GainGold, gain: 1, condition: {
          type: ConditionType.BestNeighbor,
          condition: { type: ConditionType.PerShield, shield: Shield.Nobility }
        }
      },
      effect2: { type: ImmediateEffectType.GainKeys, gain: 2 }
    }],
    scoring: { score: 2, condition: { type: ConditionType.PerCardWithShieldCount, count: 2 } }
  },

  [Card.MasterAtArms]: {
    cost: 2,
    shields: [Shield.Military, Shield.Military],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Military } }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 4 } }
  },

  [Card.Mercenary]: {
    cost: 6,
    shields: [Shield.Military, Shield.Peasantry],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerDifferentShieldType } }],
    scoring: { score: 7, condition: { type: ConditionType.PerShieldsSet, shields: [Shield.Faith, Shield.Military, Shield.Peasantry] } }
  },

  [Card.Innkeeper]: {
    cost: 0,
    shields: [Shield.Craftsmanship],
    immediateEffect: [
      { type: ImmediateEffectType.PutGoldOnCard, gold: 2 },
      { type: ImmediateEffectType.GainGold, gain: 0, opponentsGain: 2 }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 6 } }
  }, // TODO
  [Card.Sculptor]: {
    cost: 3,
    shields: [Shield.Faith, Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Faith } }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 7 } }
  },

  [Card.Clockmaker]: {
    cost: 3,
    shields: [Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship, line: true } }
  },

  [Card.SpiceMerchant]: {
    cost: 0,
    shields: [Shield.Craftsmanship],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 2, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship } }],
    scoring: {
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
    shields: [Shield.Craftsmanship],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Military, line: true, column: true } }
  },

  [Card.Potter]: {
    cost: 2,
    shields: [Shield.Craftsmanship, Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, gold: 2 }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 4 } }
  }, // TODO
  [Card.Farmer]: {
    cost: 5,
    shields: [Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry } }],
    scoring: {
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
    shields: [Shield.Craftsmanship, Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Craftsmanship } }],
    scoring: { score: 1, condition: { type: ConditionType.PerKey } }
  },

  [Card.Carpenter]: {
    cost: 0,
    shields: [Shield.Craftsmanship],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerMissingShieldType } }],
    scoring: { score: 8, condition: { type: ConditionType.IfCardFlippedDown } }
  },

  [Card.Witch]: {
    cost: 4,
    shields: [Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry } }, {
      type: ImmediateEffectType.GainKeys,
      gain: 1,
      condition: {
        type: ConditionType.BestNeighbor,
        condition: { type: ConditionType.PerShield, shield: Shield.Faith }
      }
    }],
    scoring: { score: 9, condition: { type: ConditionType.IfShieldMissing, shield: Shield.Faith } }
  },

  [Card.Brigand]: {
    cost: 7,
    shields: [Shield.Peasantry],
    immediateEffect: [{
      type: ImmediateEffectType.GainKeys, gain: 1, condition: {
        type: ConditionType.BestNeighbor,
        condition: { type: ConditionType.PerBanner, banner: Place.Castle }
      }
    }],
    scoring: { score: 7, condition: { type: ConditionType.PerBannersSet, banners: [Place.Village, Place.Village, Place.Village] } }
  },

  [Card.Woodcutter]: {
    cost: 0,
    shields: [Shield.Peasantry],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerFullPosition } }],
    scoring: {
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
    shields: [Shield.Faith, Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Faith } }],
    scoring: { score: 2, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry, line: true, column: true } }
  },

  [Card.Beggar]: {
    cost: 0,
    shields: [Shield.Peasantry],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerFullPosition } }],
    scoring: { score: 2, condition: { type: ConditionType.PerShield, shield: Shield.Faith, line: true, column: true } }
  },

  [Card.StableBoy]: {
    cost: 4,
    shields: [Shield.Peasantry, Shield.Nobility],
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Nobility } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry, column: true } }
  },

  [Card.Winemaker]: {
    cost: 2,
    shields: [Shield.Scholarship, Shield.Peasantry],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Village } }],
    scoring: { score: 2, condition: { type: ConditionType.PerDifferentShieldType, column: true } }
  },

  [Card.Shepherd]: {
    cost: 5,
    shields: [Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerEmptyPosition } }],
    scoring: { score: 3, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry, line: true } }
  },

  [Card.Usurper]: {
    cost: 5,
    shields: [Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerCardWithShieldCount, count: 1 } }],
    scoring: { score: 2, condition: { type: ConditionType.PerBanner, banner: Place.Castle } }
  },

  [Card.Traveler]: {
    cost: 0,
    shields: [Shield.Peasantry],
    immediateEffect: [{ type: ImmediateEffectType.GainGold, gain: 3, condition: { type: ConditionType.PerCardWithCost, cost: 0 } }],
    scoring: { score: 2, condition: { type: ConditionType.PerCardWithCost, cost: 0 } }
  },

  [Card.Farmhand]: {
    cost: 0,
    shields: [Shield.Peasantry],
    moveMessenger: true,
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 5 } }
  },

  [Card.Revolutionary]: {
    cost: 4,
    shields: [Shield.Peasantry],
    moveMessenger: true,
    immediateEffect: [{ type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Village } }],
    scoring: { score: 9, condition: { type: ConditionType.IfShieldMissing, shield: Shield.Nobility } }
  },

  [Card.Fisherman]: {
    cost: 2,
    shields: [Shield.Peasantry, Shield.Peasantry],
    scoring: {
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
    shields: [Shield.Peasantry],
    immediateEffect: [
      { type: ImmediateEffectType.GainGold, gain: 1, condition: { type: ConditionType.PerShield, shield: Shield.Peasantry } },
      { type: ImmediateEffectType.GainKeys, gain: 1, condition: { type: ConditionType.PerBanner, banner: Place.Village } }
    ],
    scoring: {
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
    shields: [Shield.Peasantry],
    immediateEffect: [{ type: ImmediateEffectType.PutGoldOnCard, gold: 2 }],
    scoring: { score: 2, condition: { type: ConditionType.PerGoldInPurse, limit: 9 } }
  }
}

const nobleDiscountArray = [Card.Alchemist, Card.Astronomer, Card.Apothecary, Card.Chatelaine, Card.Squire, Card.Philosopher, Card.Armorer, Card.Fisherman, Card.Princess, Card.Baron]
const villageDiscountArray = [Card.Alchemist, Card.Pilgrim, Card.Architect, Card.Captain, Card.Squire, Card.Stonemason, Card.Armorer, Card.Farmhand, Card.Baron]
export const isCastleDiscount = (card: Card) => nobleDiscountArray.includes(card)
export const isVillageDiscount = (card: Card) => villageDiscountArray.includes(card)
export const isDiscountForPlace = (possessedCard: Card, place: Place) => place === Place.Castle ? isCastleDiscount(possessedCard) : isVillageDiscount(possessedCard)
export const isDiscount = (card: Card) => isCastleDiscount(card) || isVillageDiscount(card)
