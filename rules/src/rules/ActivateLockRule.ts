import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CustomMoveType } from './CustomMoveType'
import { LockHelper } from './helpers/LockHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ActivateLockRule extends PlayerTurnRule {
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
      this.memorize(Memory.ReturnRule, RuleId.EndOfTurn)
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
    return this.remind<RuleId>(Memory.ReturnRule) ?? RuleId.EndOfTurn
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
      this.memorize(Memory.ActivateLockReturnRule, this.passRule)
      return new LockHelper(this.game, this.player).activateLock(move.data as number, RuleId.ActivateLock)
    }

    return []
  }
}
