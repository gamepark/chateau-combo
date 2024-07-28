import { isMoveItemType, isMoveItemTypeAtOnce, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KeyDiscardLocationCardsRule } from './key/KeyDiscardLocationCardsRule'
import { KeyMoveMessengerRule } from './key/KeyMoveMessengerRule'
import { RuleId } from './RuleId'

export class SpendKeyRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    if (!this.keys) return [this.startRule(RuleId.BuyCard)]
    return [
      ...new KeyDiscardLocationCardsRule(this.game).getPlayerMoves(),
      ...new KeyMoveMessengerRule(this.game).getPlayerMoves()
    ]
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move) || isMoveItemType(MaterialType.MessengerToken)(move)) {
      return [this.startRule(RuleId.BuyCard)]
    }

    return []
  }

  get keys() {
    return this
      .material(MaterialType.Key)
      .player(this.player)
      .getQuantity()
  }
}