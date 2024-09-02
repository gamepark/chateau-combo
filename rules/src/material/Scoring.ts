import { XYCoordinates } from '@gamepark/rules-api'
import { BlazonType } from './CardCharacteristics'
import { CardCost } from './ImmediateEffect'
import { Place } from './Place'

export enum ScoringType {
  ByBlazon = 1,
  ByBlazonGroup,
  ByBlazonCount,
  IfMissingBlazon,
  ByBanner,
  ByBannerGroup,
  ByKeys,
  ByDiscount,
  ByPosition,
  ByCost,
  IfHiddenCard,
  ByGoldOnCard,
  ByGoldOnAllCards
}

export type Scoring = ScoringByBlazon | ScoringByBlazonGroup | ScoringByBlazonCount | ScoringIfMissingBlazon | ScoringByBanner | ScoringByBannerGroup
  | ScoringByKeys | ScoringByDiscount | ScoringByPosition | ScoringByCost | ScoringIfHiddenCard | ScoringByGoldOnCard | ScoringByGoldOnAllCards

export type ScoringByBlazon = {
  type: ScoringType.ByBlazon
  value: number
  blazonCondition: BlazonCondition
}

export type ScoringByBlazonGroup = {
  type: ScoringType.ByBlazonGroup
  value: number
  blazonGroupType: BlazonType[]
}

export type ScoringByBlazonCount = {
  type: ScoringType.ByBlazonCount
  value: number
  blazonQuantity: number
}

export type ScoringIfMissingBlazon = {
  type: ScoringType.IfMissingBlazon
  value: number
  missingBlazonType: BlazonType
}

export type ScoringByBanner = {
  type: ScoringType.ByBanner
  value: number
  bannerType: Place
}

export type ScoringByBannerGroup = {
  type: ScoringType.ByBannerGroup
  value: number
  bannerConditions: { castleBanners: number, villageBanners: number }
}

export type ScoringByKeys = {
  type: ScoringType.ByKeys
  value: number
}

export type ScoringByDiscount = {
  type: ScoringType.ByDiscount
  value: number
}

export type ScoringByPosition = {
  type: ScoringType.ByPosition
  value: number
  validPositions: XYCoordinates[]
}

export type ScoringByCost = {
  type: ScoringType.ByCost
  cardCost: CardCost
  value: number
}

export type ScoringIfHiddenCard = {
  type: ScoringType.IfHiddenCard
  value: number
}

export type ScoringByGoldOnCard = {
  type: ScoringType.ByGoldOnCard
  value: number
  limit: number
}

export type ScoringByGoldOnAllCards = {
  type: ScoringType.ByGoldOnAllCards
  value: number
}

type BlazonCondition = {
  blazonType: BlazonType
  line?: boolean
  column?: boolean
}