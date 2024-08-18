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

//{type:ImmediateEffectType.GetCoins, value:1, condition: {blazon:[BlazonType.Noble], bestNeighbor:true}}]
//{type:ImmediateEffectType.GetKeys, value:2]

export class ChooseBetweenRule extends PlayerTurnRule {

  getPlayerMoves() {

    return []
  }

  get placedCard() {
    return this
        .material(MaterialType.Card)
        .index(this.remind(Memory.PlacedCard))
  }

  afterItemMove(move: ItemMove) {

  return []
  }
}
