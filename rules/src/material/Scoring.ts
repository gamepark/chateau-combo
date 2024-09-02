import { Card } from './Card'
import { cardCharacteristics } from './CardCharacteristics'
import { Condition, ConditionType } from './Condition'

export type Scoring = {
  score: number
  condition: Condition
}

export const hasPurse = (card: Card) => (cardCharacteristics[card].scoringEffect).condition.type === ConditionType.PerGoldInPurse