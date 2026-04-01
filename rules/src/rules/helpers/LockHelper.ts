import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Card, CardId, isOutOfTheOubliette } from '../../material/Card'
import { cardCharacteristics } from '../../material/CardCharacteristics'
import { Effect, EffectType } from '../../material/Effect'
import { keys } from '../../material/Key'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { ImmediateEffects } from '../ImmediateEffectRule'

export class LockHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get activatableLockCardIndexes(): number[] {
    const lockCards = this.material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(this.player)
      .filter<CardId>(item =>
        !item.location.rotation &&
        !!item.id?.front &&
        isOutOfTheOubliette(item.id.front)
      )

    return lockCards.getIndexes().filter(index => {
      if (this.material(MaterialType.Key).money(keys).location(LocationType.KeyOnCard).parent(index).count === 0) return false
      const card = lockCards.index(index).getItem<CardId>()!
      const effects = cardCharacteristics[card.id.front as Card].effects.filter(e => e.type !== EffectType.Discount)
      return this.hasEffectiveMoves(effects)
    })
  }

  private hasEffectiveMoves(effects: Effect[]): boolean {
    for (const effect of effects) {
      if (effect.type in ImmediateEffects) {
        const moves = new ImmediateEffects[effect.type]!(this.game).getEffectMoves(effect)
        if (moves.length > 0) return true
      } else {
        // Complex effects (DiscardFromRiver, ChooseBetween, DiscardEntireRiver, ActivateAdjacent) always produce interaction
        return true
      }
    }
    return false
  }
}
