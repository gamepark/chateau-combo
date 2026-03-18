import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { keys } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { LockHelper } from './helpers/LockHelper'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ActivateLockAfterBuyRule extends PlayerTurnRule {
  onRuleStart() {
    // Restore context when returning from lock effects
    const savedReturn = this.remind<RuleId>(Memory.ActivateLockReturnRule)
    if (savedReturn) {
      this.memorize(Memory.ReturnRule, savedReturn)
      this.forget(Memory.ActivateLockReturnRule)
      // Restore original placed card
      const original = this.remind<number>(Memory.OriginalPlacedCard)
      if (original !== undefined) {
        this.memorize(Memory.PlacedCard, original)
        this.forget(Memory.OriginalPlacedCard)
      }
    } else if (!this.remind<RuleId>(Memory.ReturnRule)) {
      this.memorize(Memory.ReturnRule, RuleId.MoveMessenger)
    }

    // If no lock is activatable, skip directly
    if (this.remind<boolean>(Memory.LockActivatedThisTurn) || this.activatableLockIndexes.length === 0) {
      return [this.startRule(this.passRule)]
    }
    return []
  }

  get activatableLockIndexes() {
    return new LockHelper(this.game, this.player).activatableLockCardIndexes
  }

  get passRule() {
    return this.remind<RuleId>(Memory.ReturnRule) ?? RuleId.MoveMessenger
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []

    // Lock activation
    if (!this.remind<boolean>(Memory.LockActivatedThisTurn)) {
      for (const index of this.activatableLockIndexes) {
        moves.push(this.customMove(CustomMoveType.ActivateLock, index))
      }
    }

    // Pass to continue
    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(this.passRule)]
    }

    if (isCustomMoveType(CustomMoveType.ActivateLock)(move)) {
      const cardIndex = move.data as number
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

      // Save context: original placed card + real return rule
      this.memorize(Memory.OriginalPlacedCard, this.remind<number>(Memory.PlacedCard))
      this.memorize(Memory.PlacedCard, cardIndex)
      this.memorize(Memory.ActivateLockReturnRule, this.passRule)
      this.memorize(Memory.ReturnRule, RuleId.ActivateLockAfterBuy)

      // Trigger the card's effects
      if (characteristics.effects.length) {
        this.memorize(Memory.PendingEffects, [...characteristics.effects])
        moves.push(...new ImmediateEffectRule(this.game).getPendingEffectsMoves())
      } else {
        moves.push(this.startRule(RuleId.ActivateLockAfterBuy))
      }

      return moves
    }

    return []
  }
}
