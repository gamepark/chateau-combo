import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { ChooseBetweenEffect, ImmediateEffectType } from '../material/ImmediateEffect'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

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
    return [(cardCharacteristics[this.placedCard.id.front].immediateEffect![0] as ChooseBetweenEffect).effect1]
  }

  get effect2ToPlay() {
    return [(cardCharacteristics[this.placedCard.id.front].immediateEffect![0] as ChooseBetweenEffect).effect2]
  }



  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Choice){
      return this.startImmediateEffect(move.data)
    } 
    return []
    
  }


}
