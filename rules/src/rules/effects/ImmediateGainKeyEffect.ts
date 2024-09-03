import { MaterialMove } from '@gamepark/rules-api'
import { GainKeys } from '../../material/ImmediateEffect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Tableau } from '../../material/Tableau'
import { AbstractImmediateEffect } from './AbstractImmediateEffect'

export class ImmediateGainKeyEffect extends AbstractImmediateEffect<GainKeys> {

  getEffectMoves(effect: GainKeys) {
    const moves: MaterialMove[] = []
    const multiplier = effect.condition ? new Tableau(this.game, this.player).countCondition(effect.condition) : 1
    moves.push(...this.gainKeys(effect.gain * multiplier))
    if (effect.opponentsGain) {
      for (const player of this.game.players) {
        if (player !== this.player) {
          moves.push(...this.gainKeys(effect.opponentsGain!))
        }
      }
    }
    return moves
  }

  gainKeys(quantity: number, player = this.player) {
    if (!quantity) return []
    return [
      this
        .material(MaterialType.Key)
        .createItem({
          location: {
            type: LocationType.PlayerKeyStock,
            player
          },
          quantity: quantity
        })
    ]
  }
}