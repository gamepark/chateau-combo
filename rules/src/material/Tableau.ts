import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { range, uniq } from 'lodash'
import sumBy from 'lodash/sumBy'
import { PlayerId } from '../PlayerId'
import { Card } from './Card'
import { cardCharacteristics, shields } from './CardCharacteristics'
import { Condition, ConditionType } from './Condition'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export class Tableau extends MaterialRulesPart {
  tableau: (Card | null)[][] = [[], [], []]

  constructor(game: MaterialGame, private player: PlayerId) {
    super(game)
    const cards = this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(player)
    const xMin = cards.minBy(item => item.location.x!).getItem()?.location.x ?? 0
    const yMin = cards.minBy(item => item.location.y!).getItem()?.location.y ?? 0
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        this.tableau[y][x] = cards.location(l => l.x === x + xMin && l.y === y + yMin).getItem()?.id.front ?? null
      }
    }
  }

  get score() {
    return sumBy(range(3), x => sumBy(range(3), y => this.getCardScore(x, y)))
  }

  getCardScore(x: number, y: number) {
    const card = this.tableau[x][y]
    if (card === null) return 0
    const scoring = cardCharacteristics[card].scoringEffect as { score: number, condition: Condition } // TODO remove cast once refactoring is complete
    if (!scoring.score) return 0 // TODO: remove once refactoring is complete
    return this.countCondition(scoring.condition, x, y) * scoring.score
  }

  countCondition(condition: Condition, x: number, y: number) {
    switch (condition.type) {
      case ConditionType.PerShield:
        return sumBy(this.getConsideredCards(condition, x, y), card =>
          card ? cardCharacteristics[card].blazon.filter(shield => shield === condition.shield).length : 0
        )
      case ConditionType.PerDifferentShieldType:
        return uniq(this.getConsideredCards(condition, x, y).map(card => card ? cardCharacteristics[card].blazon : [])).length
      case ConditionType.PerMissingShieldType:
        return shields.filter(shield =>
          !this.cards.some(card =>
            card && cardCharacteristics[card].blazon.some(cardShield => cardShield === shield)
          )
        ).length
      default:
        return 0
    }
  }

  getConsideredCards({ line, column }: { line?: boolean, column?: boolean }, x: number, y: number) {
    if (line && column) return this.tableau.flatMap((l, y2) => l.filter((_, x2) => y === y2 || x === x2))
    if (line && !column) return this.tableau[y]
    if (!line && column) return this.tableau.map(l => l[x])
    return this.cards
  }

  get cards() {
    return this.tableau.flatMap(l => l)
  }
}