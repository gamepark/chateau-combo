import { MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Effect, EffectType } from '../material/Effect'
import { AbstractImmediateEffect } from './effects/AbstractImmediateEffect'
import { ImmediateGainCoinEffect } from './effects/ImmediateGainCoinEffect'
import { ImmediateGainKeyEffect } from './effects/ImmediateGainKeyEffect'
import { ImmediatePutGoldOnCardEffect } from './effects/ImmediatePutGoldOnCardEffect'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ImmediateEffectRule extends PlayerTurnRule {
  getPendingEffectsMoves() {
    const moves: MaterialMove[] = []

    // Scroll through the list of effects to be played, and select the necessary rules.
    const effects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
    if (effects.length === 0) return []

    const firstEffect = effects.shift()!
    const firstEffectType = firstEffect.type

    // If the effect is immediately manageable, we do it.
    if (firstEffectType in ImmediateEffects) {
      moves.push(
        ...new ImmediateEffects[firstEffectType]!(this.game).getEffectMoves(firstEffect)
      )
    } // Otherwise, we push a specific rule into which to pass
    else {
      if (firstEffectType === EffectType.DiscardFromRiver) {
        moves.push(this.startRule(RuleId.DiscardFromRiver))
        return moves
      }

      if (firstEffectType === EffectType.ChooseBetween) {
        moves.push(this.startRule(RuleId.ChooseBetween))
        return moves
      }
    }

    // In all cases, the element is deleted from the stored array, as it has been processed.
    if (effects.length) {
      moves.push(...this.getPendingEffectsMoves())
    } else {
      moves.push(this.startRule(RuleId.MoveMessenger))
    }

    return moves
  }
}

type EffectCreator = new (game: MaterialGame) => AbstractImmediateEffect<any>
const ImmediateEffects: Partial<Record<EffectType, EffectCreator>> = {
  [EffectType.GainGold]: ImmediateGainCoinEffect,
  [EffectType.GainKeys]: ImmediateGainKeyEffect,
  [EffectType.PutGoldOnCard]: ImmediatePutGoldOnCardEffect
}

