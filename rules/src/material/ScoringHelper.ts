import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { PlayerId } from '../PlayerId'
import { coins } from './Coin'
import { keys } from './Key'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'
import { Tableau } from './Tableau'

export class ScoringHelper extends MaterialRulesPart {
  readonly tableau: Tableau

  constructor(game: MaterialGame, private player: PlayerId) {
    super(game)
    this.tableau = new Tableau(game, player)
  }

  get keyScore() {
    return this.material(MaterialType.Key).money(keys).player(this.player).count
  }

  get goldCount() {
    return this.material(MaterialType.GoldCoin).money(coins).location(LocationType.PlayerGoldStock).player(this.player).count
  }

  get tableauScore() {
    return this.tableau.score
  }

  get totalScore() {
    return this.tableauScore + this.keyScore
  }

  getCardScore(x: number, y: number) {
    return this.tableau.getCardScore(x, y)
  }

  get cardScores(): { x: number, y: number, score: number }[] {
    return range(3).flatMap(y =>
      range(3).map(x => ({ x, y, score: this.getCardScore(x, y) }))
    )
  }
}
