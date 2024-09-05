import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { ChooseBetween, Effect } from '../material/Effect'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from './CustomMoveType'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'

export class ChooseBetweenRule extends PlayerTurnRule {

  getPlayerMoves() {
    return [
      this.customMove(CustomMoveType.Choice, 1),
      this.customMove(CustomMoveType.Choice, 2)
    ]
  }

  startImmediateEffect(effect: Effect): MaterialMove[] {
    this.memorize(Memory.PendingEffects, (effects: Effect[]) => [effect, ...effects])
    return new ImmediateEffectRule(this.game).getPendingEffectsMoves()
  }

  get placedCard() {
    return this
        .material(MaterialType.Card)
        .getItem(this.remind(Memory.PlacedCard))!
  }

  get effect1ToPlay() {
    return (cardCharacteristics[this.placedCard.id.front].effects[0] as ChooseBetween).effect1
  }

  get effect2ToPlay() {
    return (cardCharacteristics[this.placedCard.id.front].effects[0] as ChooseBetween).effect2
  }



  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type === CustomMoveType.Choice){
      const effect = move.data === 1? this.effect1ToPlay: this.effect2ToPlay
      return this.startImmediateEffect(effect)
    }
    return []

  }


}
