import { Sign, SpaceFilling } from '../rules/effects/AbstractImmediateEffect'
import { PutGoldOnCardEffect } from '../rules/effects/ImmediatePutGoldOnCardEffect'
import { BlazonType } from './CardCharacteristics'
import { Condition } from './Condition'
import { MaterialType } from './MaterialType'
import { Place } from './Place'

export enum ImmediateEffectType {
    GainGold = 1,
    GetKeys,
    DiscardFromRiver,
    ChooseBetween,
    PutGoldOnCard
}

export type ImmediateEffect = GainGold | GetKeysEffect | DiscardFromRiverEffect | ChooseBetweenEffect | PutGoldOnCardEffect

export type GainGold = {
    type: ImmediateEffectType.GainGold
    gain: number
    opponentsGain?: number
    condition?: Condition
}

export type GetKeysEffect = {
    type: ImmediateEffectType.GetKeys
    value: number
    opponentGain?: number
    condition?: ConditionOld
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

type ConditionOld = BlazonCondition | BlazonNumberCondition | BannerCondition | BlazonBestNeighborCondition | FilledOrEmptyCondition
  | CardCostCondition | OnStockCardCondition

type BlazonCondition = {
    blazon: BlazonType[]
}

type BlazonNumberCondition = {
    blazonNumber: number
}

type BannerCondition = {
    banner: Place
}

type BlazonBestNeighborCondition = {
    blazon: BlazonType[],
    bestNeighbor: true
}

type FilledOrEmptyCondition = {
    filledOrEmpty: SpaceFilling
}

type CardCostCondition = {
    cardCost: CardCost
}

export type CardCost = {
    cost: number
    sign: Sign
}

type OnStockCardCondition = {
    onStockCard: true
}