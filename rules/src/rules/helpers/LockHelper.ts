import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Card, CardId, isOutOfTheOubliette } from '../../material/Card'
import { cardCharacteristics } from '../../material/CardCharacteristics'
import { Effect, EffectType } from '../../material/Effect'
import { keys } from '../../material/Key'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { ImmediateEffects, ImmediateEffectRule } from '../ImmediateEffectRule'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

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

  activateLock(cardIndex: number, returnRule: RuleId): MaterialMove[] {
    const card = this.material(MaterialType.Card).getItem<CardId>(cardIndex)
    const characteristics = cardCharacteristics[card.id!.front!]
    const moves: MaterialMove[] = []

    // Spend the key from the card
    moves.push(
      ...this.material(MaterialType.Key).money(keys).removeMoney(1, {
        type: LocationType.KeyOnCard, player: this.player, parent: cardIndex
      })
    )

    // Mark lock as activated this turn
    this.memorize(Memory.LockActivatedThisTurn, true)

    // Save context: original placed card and set lock card for effects
    this.memorize(Memory.OriginalPlacedCard, this.remind<number>(Memory.PlacedCard))
    this.memorize(Memory.PlacedCard, cardIndex)
    this.memorize(Memory.ReturnRule, returnRule)

    // Trigger the card's effects
    if (characteristics.effects.length) {
      this.memorize(Memory.PendingEffects, [...characteristics.effects])
      moves.push(...new ImmediateEffectRule(this.game).getPendingEffectsMoves())
    } else {
      moves.push(this.startRule(returnRule))
    }

    return moves
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
