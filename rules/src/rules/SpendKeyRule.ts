import { isDeleteItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Key, keysMoney } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuyCardRule } from './BuyCardRule'
import { RuleId } from './RuleId'

export class SpendKeyRule extends BuyCardRule {
  getPlayerMoves(): MaterialMove[] {
    const playerKeys = keysMoney.count(this.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(this.player))
    if (playerKeys > 0) {
      return super.getPlayerMoves().concat(
        ...keysMoney.createOrDelete(this.material(MaterialType.Key), { type: LocationType.PlayerKeyStock, player: this.player }, -1)
      )
    }
    return super.getPlayerMoves()
  }

  beforeItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move) && this.material(MaterialType.Key).getItem(move.itemIndex).id === Key.Key3) {
      return keysMoney.createOrDelete(this.material(MaterialType.Key), { type: LocationType.PlayerKeyStock, player: this.player }, 2)
    }
    return super.beforeItemMove(move)
  }

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move)) {
      return [this.startRule(RuleId.KeyEffect)]
    }
    return super.afterItemMove(move)
  }
}
