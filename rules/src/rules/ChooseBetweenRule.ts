import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { RuleId } from './RuleId'
import { ImmediateEffectType } from '../material/ImmediateEffectType'
import { CustomMoveType } from './CustomMoveType'

export type ChooseBetweenRuleEffect = { 
    effect1:({ type: ImmediateEffectType } & Record<any, any>)[]
    effect2:({ type: ImmediateEffectType } & Record<any, any>)[]
}

export class ChooseBetweenRule extends PlayerTurnRule {

  getPlayerMoves() {
    return [
      this.customMove(CustomMoveType.Choice, this.effect1ToPlay),
      this.customMove(CustomMoveType.Choice, this.effect2ToPlay)
    ]
  }

  startImmediateEffect(effect:({ type: ImmediateEffectType } & Record<any, any>)[]): MaterialMove[]{
    this.forget(Memory.ImmediateEffectsToPlay)
    this.memorize(Memory.ImmediateEffectsToPlay, effect)
    return [this.startRule(RuleId.ImmediateEffect)]
  }

  get placedCard() {
    return this
        .material(MaterialType.Card)
        .getItem(this.remind(Memory.PlacedCard))!
  }

  get effect1ToPlay() {
    return [cardCharacteristics[this.placedCard.id.front].immediateEffect![0].effect1]
  }

  get effect2ToPlay() {
    return [cardCharacteristics[this.placedCard.id.front].immediateEffect![0].effect2]
  }



  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Choice){
      return this.startImmediateEffect(move.data)
    } 
    return []
    
  }


}
