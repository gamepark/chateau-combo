import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { coins } from '../../material/Coin'
import { keys } from '../../material/Key'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { CustomMoveType } from '../CustomMoveType'

export class GainHelper extends MaterialRulesPart {

  gainGold(quantity: number, player: PlayerId): MaterialMove[] {
    if (quantity <= 0) return []
    return [
      this.customMove(CustomMoveType.GainGold, { player, quantity }),
      ...this.material(MaterialType.GoldCoin).money(coins)
        .addMoney(quantity, { type: LocationType.PlayerGoldStock, player })
    ]
  }

  gainKeys(quantity: number, player: PlayerId): MaterialMove[] {
    if (quantity <= 0) return []
    return [
      this.customMove(CustomMoveType.GainKeys, { player, quantity }),
      ...this.material(MaterialType.Key).money(keys)
        .addMoney(quantity, { type: LocationType.PlayerKeyStock, player })
    ]
  }
}
