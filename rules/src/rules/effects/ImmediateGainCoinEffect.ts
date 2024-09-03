import { MaterialMove } from '@gamepark/rules-api'
import { GainGold } from '../../material/ImmediateEffect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Tableau } from '../../material/Tableau'
import { AbstractImmediateEffect } from './AbstractImmediateEffect'

export class ImmediateGainCoinEffect extends AbstractImmediateEffect<GainGold> {

  getEffectMoves(effect: GainGold) {
    const multiplier = effect.condition ? new Tableau(this.game, this.player).countCondition(effect.condition) : 1
    const moves: MaterialMove[] = []
    if (effect.gain) {
      moves.push(...this.gainGold(effect.gain * multiplier))
    }
    if (effect.opponentsGain) {
      for (const player of this.game.players) {
        if (player !== this.player) {
          moves.push(...this.gainGold(effect.opponentsGain * multiplier, player))
        }
      }
    }
    return moves
  }

  gainGold(quantity: number, player = this.player) {
    if (!quantity) return []
    return [
      this
        .material(MaterialType.GoldCoin)
        .createItem({
          location: {
            type: LocationType.PlayerGoldStock,
            player
          },
          quantity: quantity
        })
    ]
  }
}