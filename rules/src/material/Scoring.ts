import { XYCoordinates } from '@gamepark/rules-api'
import { Card } from './Card'
import { cardCharacteristics } from './CardCharacteristics'
import { Condition } from './Condition'

export enum ScoringType {
  ByPosition,
  ByGoldOnCard,
  ByGoldOnAllCards
}

export type Scoring = ScoringByPosition | ScoringByGoldOnCard | ScoringByGoldOnAllCards
  | { score: number, condition: Condition }

export type ScoringByPosition = {
  type: ScoringType.ByPosition
  value: number
  validPositions: XYCoordinates[]
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