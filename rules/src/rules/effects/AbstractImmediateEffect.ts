import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export abstract class AbstractImmediateEffect<T> extends PlayerTurnRule {
  abstract getEffectMoves(effect: T): MaterialMove[]

  get panorama() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(this.player)
  }

}
