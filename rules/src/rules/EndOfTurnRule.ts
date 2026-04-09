import { isShuffle, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { DealCardsHelper } from './helpers/DealCardsHelper'
import { LockHelper } from './helpers/LockHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    // If returning from lock activation, go to next player
    if (this.remind<RuleId>(Memory.ReturnRule) === RuleId.EndOfTurn) {
      this.forget(Memory.ReturnRule)
      return [this.nextRuleMove]
    }
    return new DealCardsHelper(this.game).completeRivers(this.afterRefillMove)
  }

  get afterRefillMove() {
    // If player hasn't activated a lock this turn and has activatable locks, offer it
    if (!this.remind<boolean>(Memory.LockActivatedThisTurn)) {
      const lockIndexes = new LockHelper(this.game, this.player).activatableLockCardIndexes
      if (lockIndexes.length > 0) {
        this.memorize(Memory.ReturnRule, RuleId.EndOfTurn)
        return this.startRule(RuleId.ActivateLock)
      }
    }
    return this.nextRuleMove
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

  afterItemMove(move: ItemMove) {
    if (isShuffle(move)) {
      return new DealCardsHelper(this.game).completeRivers(this.afterRefillMove)
    }
    return []
  }

  onRuleEnd() {
    // Don't clean up if going to lock activation (will come back)
    if (this.remind<RuleId>(Memory.ReturnRule) === RuleId.EndOfTurn) return []
    // Cleaning
    this.forget(Memory.PlacedCard)
    this.forget(Memory.PendingEffects)
    this.forget(Memory.LockActivatedThisTurn)
    this.forget(Memory.ReturnRule)
    this.forget(Memory.ActivateLockReturnRule)
    this.forget(Memory.OriginalPlacedCard)
    this.forget(Memory.ChosenRiver)
    return []
  }
}