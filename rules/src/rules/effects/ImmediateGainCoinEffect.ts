import { MaterialMove } from '@gamepark/rules-api'
import { coins } from '../../material/Coin'
import { GainGold } from '../../material/Effect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Tableau } from '../../material/Tableau'
import { AbstractImmediateEffect } from './AbstractImmediateEffect'

export class ImmediateGainCoinEffect extends AbstractImmediateEffect<GainGold> {

  getEffectMoves(effect: GainGold) {
    const moves: MaterialMove[] = []
    const myGain = this.getMyGain(effect)
    const opponentsGain = this.getOpponentsGain(effect)
    if (myGain) {
      moves.push(...this.gainGold(myGain))
    }

    if (opponentsGain) {
      for (const player of this.game.players) {
        if (player !== this.player) {
          moves.push(...this.gainGold(opponentsGain, player))
        }
      }
    }
    return moves
  }

  getMyGain(effect: GainGold) {
    const multiplier = effect.condition ? new Tableau(this.game, this.player).countCondition(effect.condition) : 1
    if (effect.gain) {
      return effect.gain * multiplier
    }

    return 0
  }

  getOpponentsGain(effect: GainGold) {
    const multiplier = effect.condition ? new Tableau(this.game, this.player).countCondition(effect.condition) : 1
    if (effect.opponentsGain) {
      return effect.opponentsGain * multiplier
    }

    return 0
  }

  gainGold(quantity: number, player = this.player) {
    return this.material(MaterialType.GoldCoin).money(coins).addMoney(quantity, { type: LocationType.PlayerGoldStock, player })
  }
}