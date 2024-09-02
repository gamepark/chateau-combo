import { BlazonType } from './CardCharacteristics'

export enum ConditionType {
  PerShield = 1,
  PerDifferentShieldType,
  PerMissingShieldType,
  IfShieldMissing,
  PerSet,
  PerCardWithShieldCount,
  PerCardWithCost,
  PerCardWithDiscount,
  IfCardFlippedDown,
  PerCardWithPurse,
  PerGoldOnThisPurse,
  PerGoldOnAllPurses,
  IfPosition
}

export type Condition = PerShield | PerDifferentShieldType | PerMissingShieldType

export type PerShield = {
  type: ConditionType.PerShield
  shield: BlazonType
  line?: boolean
  column?: boolean
}

export type PerDifferentShieldType = {
  type: ConditionType.PerDifferentShieldType
  line?: boolean
  column?: boolean
}

export type PerMissingShieldType = {
  type: ConditionType.PerMissingShieldType
}
