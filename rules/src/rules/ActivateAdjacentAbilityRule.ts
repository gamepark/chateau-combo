import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { Effect, EffectType } from '../material/Effect'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ActivateAdjacentAbilityRule extends PlayerTurnRule {

  onRuleStart() {
    if (this.getPlayerMoves().length === 0) {
      return this.resolveAndContinue()
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.getAdjacentCardIndexes().map(index =>
      this.customMove(CustomMoveType.ActivateAdjacent, index)
    )
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ActivateAdjacent)(move)) return []

    const cardIndex = move.data as number
    const card = this.material(MaterialType.Card).getItem<CardId>(cardIndex)
    const effects = this.getActivatableEffects(card.id!.front!)

    if (effects.length > 0) {
      if (this.remind<number>(Memory.OriginalPlacedCard) === undefined) {
        this.memorize(Memory.OriginalPlacedCard, this.remind<number>(Memory.PlacedCard))
      }
      this.memorize(Memory.PlacedCard, cardIndex)
      const pendingEffects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
      this.memorize(Memory.PendingEffects, [...effects, ...pendingEffects])
      return new ImmediateEffectRule(this.game).getPendingEffectsMoves()
    }

    return this.resolveAndContinue()
  }

  resolveAndContinue(): MaterialMove[] {
    // Restore original placed card if it was changed
    const original = this.remind<number>(Memory.OriginalPlacedCard)
    if (original !== undefined) {
      this.memorize(Memory.PlacedCard, original)
      this.forget(Memory.OriginalPlacedCard)
    }
    const pendingEffects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
    if (pendingEffects.length) {
      return new ImmediateEffectRule(this.game).getPendingEffectsMoves()
    }
    const returnRule = this.remind<RuleId>(Memory.ReturnRule)
    return [this.startRule(returnRule ?? RuleId.MoveMessenger)]
  }

  getAdjacentCardIndexes(): number[] {
    const placedCard = this.material(MaterialType.Card).getItem(this.remind(Memory.PlacedCard))!
    const x = placedCard.location.x!
    const y = placedCard.location.y!

    const adjacentPositions = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 }
    ]

    const tableau = this.material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(this.player)

    const indexes: number[] = []
    for (const pos of adjacentPositions) {
      const adjacent = tableau.filter(item =>
        item.location.x === pos.x && item.location.y === pos.y && !item.location.rotation
      )
      if (adjacent.length > 0) {
        const card = adjacent.getItem<CardId>()
        if (card?.id?.front && this.getActivatableEffects(card.id.front).length > 0) {
          indexes.push(adjacent.getIndex())
        }
      }
    }
    return indexes
  }

  getActivatableEffects(card: Card): Effect[] {
    return cardCharacteristics[card].effects.filter(effect =>
      effect.type !== EffectType.ActivateAdjacentAbility &&
      effect.type !== EffectType.Discount
    )
  }
}
