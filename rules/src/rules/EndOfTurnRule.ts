import { isShuffle, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { DealCardsHelper } from './helpers/DealCardsHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    return new DealCardsHelper(this.game).completeRivers(this.nextRuleMove)
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
      return new DealCardsHelper(this.game).completeRivers(this.nextRuleMove)
    }
    return []
  }

  onRuleEnd() {
    // Cleaning
    this.forget(Memory.PlacedCard)
    this.forget(Memory.PendingEffects)
    return []
  }
}