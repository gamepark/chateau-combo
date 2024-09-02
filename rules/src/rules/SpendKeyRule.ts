import { isDeleteItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { BuyCardRule } from './BuyCardRule'
import { RuleId } from './RuleId'

export class SpendKeyRule extends BuyCardRule {
  getPlayerMoves(): MaterialMove[] {
    if (this.keys.getQuantity()) {
      return super.getPlayerMoves().concat(this.keys.deleteItem(1))
    }
    return super.getPlayerMoves().concat()
  }

  get keys() {
    return this
      .material(MaterialType.Key)
      .player(this.player)
  }

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move)) {
      return [this.startRule(RuleId.KeyEffect)]
    }
    return super.afterItemMove(move)
  }
}
