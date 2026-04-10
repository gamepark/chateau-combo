import { CustomMove, isCustomMoveType, isShuffle, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { DealCardsHelper } from './helpers/DealCardsHelper'
import { LockHelper } from './helpers/LockHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    if (this.remind<RuleId>(Memory.ReturnRule) === RuleId.EndOfTurn) {
      this.forget(Memory.ReturnRule)
      const original = this.remind<number>(Memory.OriginalPlacedCard)
      if (original !== undefined) {
        this.memorize(Memory.PlacedCard, original)
        this.forget(Memory.OriginalPlacedCard)
      }
    }

    if (this.hasActivatableLocks) {
      return new DealCardsHelper(this.game).completeRivers()
    }

    return new DealCardsHelper(this.game).completeRivers(this.nextRuleMove)
  }

  get hasActivatableLocks() {
    return !this.remind<boolean>(Memory.LockActivatedThisTurn) &&
      new LockHelper(this.game, this.player).activatableLockCardIndexes.length > 0
  }

  get nextRuleMove() {
    const playersWithRemainingSpots = this.game.players.filter(player =>
      this.material(MaterialType.Card).location(LocationType.Tableau).player(player).getItems().length !== 9
    )

    if (playersWithRemainingSpots.length === 0) {
      return this.startRule(RuleId.EndGame)
    } else {
      return this.startPlayerTurn(RuleId.SpendKey, this.nextPlayer)
    }
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    for (const index of new LockHelper(this.game, this.player).activatableLockCardIndexes) {
      moves.push(this.customMove(CustomMoveType.ActivateLock, index))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.nextRuleMove]
    }
    if (isCustomMoveType(CustomMoveType.ActivateLock)(move)) {
      return new LockHelper(this.game, this.player).activateLock(move.data as number, RuleId.EndOfTurn)
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isShuffle(move)) {
      if (this.hasActivatableLocks) {
        return new DealCardsHelper(this.game).completeRivers()
      }
      return new DealCardsHelper(this.game).completeRivers(this.nextRuleMove)
    }
    return []
  }

  onRuleEnd() {
    if (this.remind<RuleId>(Memory.ReturnRule) === RuleId.EndOfTurn) return []
    this.forget(Memory.PlacedCard)
    this.forget(Memory.PendingEffects)
    this.forget(Memory.LockActivatedThisTurn)
    this.forget(Memory.ReturnRule)
    this.forget(Memory.OriginalPlacedCard)
    this.forget(Memory.ChosenRiver)
    return []
  }
}
