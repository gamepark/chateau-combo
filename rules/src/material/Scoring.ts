import { Card } from './Card'
import { cardCharacteristics } from './CardCharacteristics'
import { Condition } from './Condition'

export enum ScoringType {
  ByGoldOnCard,
  ByGoldOnAllCards
}

export type Scoring = ScoringByGoldOnCard | ScoringByGoldOnAllCards
  | { score: number, condition: Condition }

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