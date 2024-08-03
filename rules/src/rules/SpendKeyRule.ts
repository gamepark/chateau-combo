import { isMoveItemType, isMoveItemTypeAtOnce, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { KeyDiscardLocationCardsRule } from './key/KeyDiscardLocationCardsRule'
import { KeyMoveMessengerRule } from './key/KeyMoveMessengerRule'
import { RuleId } from './RuleId'

export class SpendKeyRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.keys) return [this.startRule(RuleId.BuyCard)]
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return [
      ...new KeyDiscardLocationCardsRule(this.game).getPlayerMoves(),
      ...new KeyMoveMessengerRule(this.game).getPlayerMoves(),
      this.startRule(RuleId.BuyCard)
    ]
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move)) {
      moves.push(
        ...new KeyDiscardLocationCardsRule(this.game).afterItemMove(move)
      )
      
      moves.push(this.startRule(RuleId.BuyCard))
    }

    if (isMoveItemType(MaterialType.MessengerToken)(move)) {
      moves.push(
        ...new KeyMoveMessengerRule(this.game).afterItemMove(move)
      )

      moves.push(this.startRule(RuleId.BuyCard))
    }

    return moves
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemTypeAtOnce(MaterialType.Card)(move)) {
      moves.push(
        ...new KeyDiscardLocationCardsRule(this.game).beforeItemMove(move)
      )
    }

    if (isMoveItemType(MaterialType.MessengerToken)(move)) {
      moves.push(
        ...new KeyMoveMessengerRule(this.game).beforeItemMove(move)
      )
    }

    return moves
  }

  get keys() {
    return this
      .material(MaterialType.Key)
      .player(this.player)
      .getQuantity()
  }
}