import { BlazonType } from './CardCharacteristics'

export enum ConditionType {
  PerShield = 1,
  PerDifferentShieldType,
  PerMissingShieldType,
  IfShieldMissing,
  PerShieldsSet,
  PerIdenticalShieldsSet,
  PerBannersSet,
  PerCardWithShieldCount,
  PerCardWithCost,
  PerCardWithDiscount,
  IfCardFlippedDown,
  PerCardWithPurse,
  PerGoldOnThisPurse,
  PerGoldOnAllPurses,
  IfPosition
}

export type Condition = PerShield | PerDifferentShieldType | PerMissingShieldType | IfShieldMissing | PerShieldsSet

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

export type IfShieldMissing = {
  type: ConditionType.IfShieldMissing
  shield: BlazonType
}

export type PerShieldsSet = {
  type: ConditionType.PerShieldsSet
  shields: BlazonType[]
}
