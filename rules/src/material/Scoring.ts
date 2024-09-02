import { XYCoordinates } from '@gamepark/rules-api'
import { Card } from './Card'
import { cardCharacteristics } from './CardCharacteristics'
import { Condition } from './Condition'
import { Place } from './Place'

export enum ScoringType {
  ByBanner,
  ByKeys,
  ByPosition,
  IfHiddenCard,
  ByGoldOnCard,
  ByGoldOnAllCards
}

export type Scoring = ScoringByBanner
  | ScoringByKeys | ScoringByPosition | ScoringIfHiddenCard | ScoringByGoldOnCard | ScoringByGoldOnAllCards
  | { score: number, condition: Condition }

export type ScoringByBanner = {
  type: ScoringType.ByBanner
  value: number
  bannerType: Place
}

export type ScoringByKeys = {
  type: ScoringType.ByKeys
  value: number
}

export type ScoringByPosition = {
  type: ScoringType.ByPosition
  value: number
  validPositions: XYCoordinates[]
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

export const hasPurse = (card: Card) => (cardCharacteristics[card].scoringEffect as ScoringByGoldOnCard).type === ScoringType.ByGoldOnCard