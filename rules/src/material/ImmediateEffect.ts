import { Sign, SpaceFilling } from '../rules/effects/AbstractImmediateEffect'
import { PutGoldOnCardEffect } from '../rules/effects/ImmediatePutGoldOnCardEffect'
import { BlazonType } from './CardCharacteristics'
import { MaterialType } from './MaterialType'
import { Place } from './Place'

export enum ImmediateEffectType {
    GetCoins = 1,
    GetKeys,
    DiscardFromRiver,
    ChooseBetween,
    PutGoldOnCard
}

export type ImmediateEffect = GetCoinsEffect | GetKeysEffect | DiscardFromRiverEffect | ChooseBetweenEffect | PutGoldOnCardEffect

export type GetCoinsEffect = {
    type: ImmediateEffectType.GetCoins
    value: number
    condition: Condition
}

export type GetKeysEffect = {
    type: ImmediateEffectType.GetKeys
    value: number
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

type Condition = BlazonCondition | OpponentGainCondition | BlazonNumberCondition | BannerCondition | BlazonBestNeighborCondition | FilledOrEmptyCondition
  | CardCostCondition | OnStockCardCondition

type BlazonCondition = {
    blazon: BlazonType[]
}

type OpponentGainCondition = {
    opponentGain: number
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

type CardCost = {
    cost: number
    sign: Sign
}

type OnStockCardCondition = {
    onStockCard: true
}