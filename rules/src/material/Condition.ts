import { BlazonType } from './CardCharacteristics'
import { Place } from './Place'

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

export type Condition = PerShield | PerDifferentShieldType | PerMissingShieldType | IfShieldMissing | PerShieldsSet | PerIdenticalShieldsSet
  | PerBannersSet | PerCardWithShieldCount

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

export type PerIdenticalShieldsSet = {
  type: ConditionType.PerIdenticalShieldsSet
  count: number
}

export type PerBannersSet = {
  type: ConditionType.PerBannersSet
  banners: Place[]
}

export type PerCardWithShieldCount = {
  type: ConditionType.PerCardWithShieldCount
  count: number
}
