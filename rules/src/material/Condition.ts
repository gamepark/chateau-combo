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

export type Condition = PerShieldCondition | PerDifferentShieldType

export type PerShieldCondition = {
  type: ConditionType.PerShield
  shield: BlazonType
  line?: boolean
  column?: boolean
}

export type PerDifferentShieldType = {
  type: ConditionType.PerDifferentShieldType
}
