import { MaterialMove } from '@gamepark/rules-api'
import { GainKeys } from '../../material/Effect'
import { keys } from '../../material/Key'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Tableau } from '../../material/Tableau'
import { AbstractImmediateEffect } from './AbstractImmediateEffect'

export class ImmediateGainKeyEffect extends AbstractImmediateEffect<GainKeys> {

  getEffectMoves(effect: GainKeys) {
    const moves: MaterialMove[] = []
    const myGain = this.getMyGain(effect)
    const opponentsGain = this.getOpponentsGain(effect)

    moves.push(...this.gainKeys(myGain))
    if (opponentsGain) {
      for (const player of this.game.players) {
        if (player !== this.player) {
          moves.push(...this.gainKeys(opponentsGain, player))
        }
      }
    }
    return moves
  }

  gainKeys(quantity: number, player = this.player) {
    if (!quantity) return []
    return this.material(MaterialType.Key).money(keys).addMoney(quantity, { type: LocationType.PlayerKeyStock, player })
  }

  getMyGain(effect: GainKeys) {
    const multiplier = effect.condition ? new Tableau(this.game, this.player).countCondition(effect.condition) : 1
    if (effect.gain) {
      return effect.gain * multiplier
    }

    return 0
  }

  getOpponentsGain(effect: GainKeys) {
    return effect.opponentsGain ?? 0
  }
}