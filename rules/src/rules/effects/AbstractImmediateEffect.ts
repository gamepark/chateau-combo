import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { Memory } from "../Memory";
import { LocationType } from "../../material/LocationType";
import { BannerType, BlazonType, getCost } from "../../CardCharacteristics";

export abstract class AbstractImmediateEffect<T> extends PlayerTurnRule {
    abstract getEffectMoves(effect: T): MaterialMove[]

    get panorama() {
        return this
            .material(MaterialType.Card)
            .location(LocationType.PlayerBoard)
            .player(this.player)
    }

    get card() {
        return this
            .material(MaterialType.Card)
            .index(this.remind(Memory.PlacedCard))
    }

    get cardItem() {
        return this
            .card
            .getItem()!
    }
}

export type Condition = {
    banner?: BannerType,
    blazon?: BlazonType[]
    blazonNumber?: number
    filledOrEmpty?:SpaceFilling
    cardCost?:{cost:number, sign:Sign}
}

export enum SpaceFilling{Filled=1, Empty}
export enum Sign{Minus, Equal, Plus}


export function isRespectingCostCondition(cardId:number, costCondition:{cost:number, sign:Sign}):boolean {
    switch(costCondition.sign){
        case Sign.Equal:
            return getCost(cardId) === costCondition.cost
        case Sign.Minus:
            return getCost(cardId) <= costCondition.cost
        case Sign.Plus:
            return getCost(cardId) >= costCondition.cost
    }
}