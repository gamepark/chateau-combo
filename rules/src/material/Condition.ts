import { Shield } from './CardCharacteristics'
import { Place } from './Place'

export enum ConditionType {
  PerShield = 1,
  PerDifferentShieldType,
  PerMissingShieldType,
  IfShieldMissing,
  PerShieldsSet,
  PerIdenticalShieldsSet,
  PerKey,
  PerBanner,
  PerBannersSet,
  PerCardWithShieldCount,
  PerCardWithCost,
  PerCardWithDiscount,
  IfCardFlippedDown,
  PerCardWithPurse,
  PerGoldInPurse,
  PerGoldInAllPurses,
  PerFullPosition,
  PerEmptyPosition,
  IfPosition,
  BestNeighbor
}

export type Condition = PerShield | PerDifferentShieldType | PerMissingShieldType | IfShieldMissing | PerShieldsSet | PerIdenticalShieldsSet
  | PerKey | PerBanner | PerBannersSet | PerCardWithShieldCount | PerCardWithCost | PerCardWithDiscount | IfCardFlippedDown
  | PerCardWithPurse | PerGoldInPurse | PerGoldInAllPurses | PerFullPosition | PerEmptyPosition | IfPosition | BestNeighbor

export type PerShield = {
  type: ConditionType.PerShield
  shield: Shield
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
  shield: Shield
}

export type PerShieldsSet = {
  type: ConditionType.PerShieldsSet
  shields: Shield[]
}

export type PerIdenticalShieldsSet = {
  type: ConditionType.PerIdenticalShieldsSet
  count: number
}

export type PerKey = {
  type: ConditionType.PerKey
}

export type PerBanner = {
  type: ConditionType.PerBanner
  banner: Place
}

export type PerBannersSet = {
  type: ConditionType.PerBannersSet
  banners: Place[]
}

export type PerCardWithShieldCount = {
  type: ConditionType.PerCardWithShieldCount
  count: number
}

export type PerCardWithCost = {
  type: ConditionType.PerCardWithCost
  cost: number
  orGreater?: boolean
}

export type PerCardWithDiscount = {
  type: ConditionType.PerCardWithDiscount
}

export type IfCardFlippedDown = {
  type: ConditionType.IfCardFlippedDown
}

export type PerCardWithPurse = {
  type: ConditionType.PerCardWithPurse
}

export type PerGoldInPurse = {
  type: ConditionType.PerGoldInPurse
  limit: number
}

export type PerGoldInAllPurses = {
  type: ConditionType.PerGoldInAllPurses
}

export type PerFullPosition = {
  type: ConditionType.PerFullPosition
}

export type PerEmptyPosition = {
  type: ConditionType.PerEmptyPosition
}

export type IfPosition = {
  type: ConditionType.IfPosition
  position: boolean[][]
}

export type BestNeighbor = {
  type: ConditionType.BestNeighbor
  condition: Condition
}
