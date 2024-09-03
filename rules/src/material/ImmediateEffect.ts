import { PutGoldOnCardEffect } from '../rules/effects/ImmediatePutGoldOnCardEffect'
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

export type ImmediateEffect = GainGold | GainKeys | DiscardFromRiverEffect | ChooseBetweenEffect | PutGoldOnCardEffect

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

export type DiscardFromRiverEffect = {
  type: ImmediateEffectType.DiscardFromRiver
  river: Place
  token: MaterialType.GoldCoin | MaterialType.Key
}

export type ChooseBetweenEffect = {
  type: ImmediateEffectType.ChooseBetween
  effect1: ImmediateEffect
  effect2: ImmediateEffect
}
