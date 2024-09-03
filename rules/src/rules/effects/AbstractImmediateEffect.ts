import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { Place } from '../../material/Place'
import { Memory } from "../Memory";
import { LocationType } from "../../material/LocationType";
import { BlazonType, getCost } from "../../material/CardCharacteristics";

export abstract class AbstractImmediateEffect<T> extends PlayerTurnRule {
    abstract getEffectMoves(effect: T): MaterialMove[]

    get panorama() {
        return this
            .material(MaterialType.Card)
            .location(LocationType.PlayerBoard)
            .player(this.player)
    }

    get neighborPanorama(){

        if (this.game.players.length === 2){
            return [this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(this.nextPlayer)]
        }

        const neighbors:number[] = [
            this.player-1 === 0 ? this.game.players.length : this.player - 1 ,
            this.nextPlayer
        ]
        return [this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(neighbors[0]),
                this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(neighbors[1])
               ]
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

export type ConditionOld = {
    banner?: Place,
    blazon?: BlazonType[]
    blazonNumber?: number
    filledOrEmpty?:SpaceFilling
    cardCost?:{cost:number, sign:Sign}
    onStockCard?:boolean
    bestNeighbor?:boolean
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