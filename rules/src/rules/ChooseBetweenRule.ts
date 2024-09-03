import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { ChooseBetween, EffectType } from '../material/Effect'
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

  startImmediateEffect(effect:({ type: EffectType } & Record<any, any>)[]): MaterialMove[]{
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
    return [(cardCharacteristics[this.placedCard.id.front].immediateEffect![0] as ChooseBetween).effect1]
  }

  get effect2ToPlay() {
    return [(cardCharacteristics[this.placedCard.id.front].immediateEffect![0] as ChooseBetween).effect2]
  }



  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Choice){
      return this.startImmediateEffect(move.data)
    } 
    return []
    
  }


}
