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
  BestNeighbor,
  PerDifferentCost,
  SumOfCostsInRow,
  SumOfCostsInColumn,
  IfNoDiscount,
  IfNoPurse,
  IfNoFaceDown,
  IfShieldInRow,
  IfShieldInColumn,
  PerLockCard
}

export type Condition = PerShield | PerDifferentShieldType | PerMissingShieldType | IfShieldMissing | PerShieldsSet | PerIdenticalShieldsSet
  | PerKey | PerBanner | PerBannersSet | PerCardWithShieldCount | PerCardWithCost | PerCardWithDiscount | IfCardFlippedDown
  | PerCardWithPurse | PerGoldInPurse | PerGoldInAllPurses | PerFullPosition | PerEmptyPosition | IfPosition | BestNeighbor
  | PerDifferentCost | SumOfCostsInRow | SumOfCostsInColumn | IfNoDiscount | IfNoPurse | IfNoFaceDown | IfShieldInRow | IfShieldInColumn | PerLockCard

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

export type PerDifferentCost = {
  type: ConditionType.PerDifferentCost
}

export type SumOfCostsInRow = {
  type: ConditionType.SumOfCostsInRow
}

export type SumOfCostsInColumn = {
  type: ConditionType.SumOfCostsInColumn
}

export type IfNoDiscount = {
  type: ConditionType.IfNoDiscount
}

export type IfNoPurse = {
  type: ConditionType.IfNoPurse
}

export type IfNoFaceDown = {
  type: ConditionType.IfNoFaceDown
}

export type IfShieldInRow = {
  type: ConditionType.IfShieldInRow
  shield: Shield
}

export type IfShieldInColumn = {
  type: ConditionType.IfShieldInColumn
  shield: Shield
}

export type PerLockCard = {
  type: ConditionType.PerLockCard
}
