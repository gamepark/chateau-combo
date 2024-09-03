import { MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { ImmediateEffectType } from '../material/ImmediateEffect'
import { MaterialType } from '../material/MaterialType'
import { AbstractImmediateEffect } from './effects/AbstractImmediateEffect'
import { ImmediateGainCoinEffect } from './effects/ImmediateGainCoinEffect'
import { ImmediateGainKeyEffect } from './effects/ImmediateGainKeyEffect'
import { ImmediatePutGoldOnCardEffect } from './effects/ImmediatePutGoldOnCardEffect'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ImmediateEffectRule extends PlayerTurnRule {
  onRuleStart() {
    const card = this.placedCard
    const immediateEffect = cardCharacteristics[card.id.front].immediateEffect
    const moves: MaterialMove[] = []

    // Si on a pas d'effets, alors on les calcule
    if (this.remind(Memory.ImmediateEffectsToPlay) === undefined) {
      if (immediateEffect === undefined) {
        moves.push(this.startRule(RuleId.MoveMessenger))
      } else {
        this.memorize(Memory.ImmediateEffectsToPlay, immediateEffect)
      }
    }

    // On parcourt la liste des effets à jouer, et on va dans les rules nécessaires
    const effects = this.remind(Memory.ImmediateEffectsToPlay)
    const firstEffect = effects.shift()
    const firstEffectType: ImmediateEffectType = firstEffect.type

    // Si c'est un effet gérable immédiatement, on le fait
    if (firstEffectType in ImmediateEffects) {
      moves.push(
        ...new ImmediateEffects[firstEffectType]!(this.game).getEffectMoves(firstEffect)
      )
    } // Sinon, on pousse une rule spécifique dans laquelle passer
    else {
      if (firstEffectType === ImmediateEffectType.DiscardFromRiver) {
        moves.push(this.startRule(RuleId.DiscardFromRiver))
        return moves
      }

      if (firstEffectType === ImmediateEffectType.ChooseBetween) {
        moves.push(this.startRule(RuleId.ChooseBetween))
        return moves
      }
    }

    // Dans tous les cas, on supprime l'élément du tableau mémorisé, car traité
    if (effects.length) {
      this.memorize(Memory.ImmediateEffectsToPlay, effects)
      moves.push(this.startRule(RuleId.ImmediateEffect))
    } else {
      this.forget(Memory.ImmediateEffectsToPlay)
      moves.push(this.startRule(RuleId.MoveMessenger))
    }

    return moves
  }

  get placedCard() {
    return this
      .material(MaterialType.Card)
      .getItem(this.remind(Memory.PlacedCard))!
  }
}

type EffectCreator = new (game: MaterialGame) => AbstractImmediateEffect<any>
const ImmediateEffects: Partial<Record<ImmediateEffectType, EffectCreator>> = {
  [ImmediateEffectType.GainGold]: ImmediateGainCoinEffect,
  [ImmediateEffectType.GetKeys]: ImmediateGainKeyEffect,
  [ImmediateEffectType.PutGoldOnCard]: ImmediatePutGoldOnCardEffect
}

