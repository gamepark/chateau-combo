import { isDeleteItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { Key, keys } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuyCardRule } from './BuyCardRule'
import { RuleId } from './RuleId'

export class SpendKeyRule extends BuyCardRule {
  getPlayerMoves(): MaterialMove[] {
    const keysMoney = this.material(MaterialType.Key).money(keys)
    const playerKeys = keysMoney.location(LocationType.PlayerKeyStock).player(this.player).count
    if (playerKeys > 0) {
      return super.getPlayerMoves().concat(
        ...keysMoney.removeMoney(1, { type: LocationType.PlayerKeyStock, player: this.player })
      )
    }
    return super.getPlayerMoves()
  }

  beforeItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move) && this.material(MaterialType.Key).getItem(move.itemIndex).id === Key.Key3) {
      return this.material(MaterialType.Key).money(keys).addMoney(2, { type: LocationType.PlayerKeyStock, player: this.player })
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
