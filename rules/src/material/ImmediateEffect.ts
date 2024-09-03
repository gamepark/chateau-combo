import { Condition } from './Condition'
import { MaterialType } from './MaterialType'
import { Place } from './Place'

export enum ImmediateEffectType {
  GainGold = 1,
  GainKeys,
  DiscardFromRiver,
  ChooseBetween,
  PutGoldOnCard
}

export type ImmediateEffect = GainGold | GainKeys | DiscardFromRiver | ChooseBetween | PutGoldOnCard

export type GainGold = {
  type: ImmediateEffectType.GainGold
  gain: number
  opponentsGain?: number
  condition?: Condition
}

export type GainKeys = {
  type: ImmediateEffectType.GainKeys
  gain: number
  opponentsGain?: number
  condition?: Condition
}

export type DiscardFromRiver = {
  type: ImmediateEffectType.DiscardFromRiver
  river: Place
  token: MaterialType.GoldCoin | MaterialType.Key
}

export type ChooseBetween = {
  type: ImmediateEffectType.ChooseBetween
  effect1: ImmediateEffect
  effect2: ImmediateEffect
}

export type PutGoldOnCard = {
  type: ImmediateEffectType.PutGoldOnCard
  gold?: number
  cardsLimit?: number
}
