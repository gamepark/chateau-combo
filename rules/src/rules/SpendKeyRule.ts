import { isMoveItemType, isMoveItemTypeAtOnce, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KeyDiscardLocationCardsRule } from './key/KeyDiscardLocationCardsRule'
import { KeyMoveMessengerRule } from './key/KeyMoveMessengerRule'
import { RuleId } from './RuleId'

export class SpendKeyRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return [
      ...new KeyDiscardLocationCardsRule(this.game).getPlayerMoves(),
      ...new KeyMoveMessengerRule(this.game).getPlayerMoves(),
      //this.startRule(RuleId.BuyCard)
    ]
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard) {
      return new KeyDiscardLocationCardsRule(this.game).afterItemMove(move)
    }

    if (isMoveItemType(MaterialType.MessengerToken)(move)) {
      return new KeyMoveMessengerRule(this.game).afterItemMove(move)
    }

    return []
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard) {
      return new KeyDiscardLocationCardsRule(this.game).beforeItemMove(move)
    }

    if (isMoveItemType(MaterialType.MessengerToken)(move)) {
      return new KeyMoveMessengerRule(this.game).beforeItemMove(move)
    }

    return []
  }
}