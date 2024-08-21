import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { cardCharacteristics } from '../CardCharacteristics'
import { RuleId } from './RuleId'
import { ImmediateEffectType } from '../material/ImmediateEffectType'

export type ChooseBetweenRuleEffect = { 
    effect1:({ type: ImmediateEffectType } & Record<any, any>)[]
    effect2:({ type: ImmediateEffectType } & Record<any, any>)[]
}

//[Card.Barbarian]:
//   immediateEffect:[{type:ImmediateEffectType.ChooseBetween,
// effect1:{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Teacher], bestNeighbor:true}},
// effect2:{type:ImmediateEffectType.GetKeys, value:2}
//}]  } ,


export class ChooseBetweenRule extends PlayerTurnRule {

  getPlayerMoves() {
    return [this.startRule(RuleId.ImmediateEffect)]
  }

  startImmediateEffect(effect:({ type: ImmediateEffectType } & Record<any, any>)[]){
    this.forget(Memory.ImmediateEffectsToPlay)
    this.memorize(Memory.EffectChosenBetween, {effect})
    this.startRule(RuleId.ImmediateEffect)
  }

  get placedCard() {
    return this
        .material(MaterialType.Card)
        .index(this.remind(Memory.PlacedCard))
  }

  get effect1ToPlay() {
    return cardCharacteristics[this.placedCard.getItem()!.id].immediateEffect![0].effect1
  }

  get effect2ToPlay() {
    return cardCharacteristics[this.placedCard.getItem()!.id].immediateEffect![0].effect2
  }

  afterItemMove(move: ItemMove) {

  return []
  }


}
