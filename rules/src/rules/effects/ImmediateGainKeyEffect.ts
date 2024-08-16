import { MaterialMove } from "@gamepark/rules-api";
import { BlazonType, canStockCoins, getBanner, getBlazons, howManyBlazons, howManyTargettedBlazon } from "../../CardCharacteristics";
import { ImmediateEffectType } from "../../material/ImmediateEffectType";
import { LocationType } from "../../material/LocationType";
import { MaterialType } from "../../material/MaterialType";
import { AbstractImmediateEffect, Condition, isRespectingCostCondition, SpaceFilling } from "./AbstractImmediateEffect";

export type GainKeyEffect = {
    type: ImmediateEffectType.GetKeys,
    value: number;
    condition?: Condition
}

export class ImmediateGainKeyEffect extends AbstractImmediateEffect<GainKeyEffect> {

    
    getEffectMoves(effect: GainKeyEffect) {

        const playerPanorama = this.panorama
        const neighborsPanoramas = effect.condition !== undefined && effect.condition.bestNeighbor === true 
            ? this.neighborPanorama
            : [this.panorama]
        const moves: MaterialMove[] = []

        const howManyDifferentBlazons:BlazonType[] = []
        playerPanorama.getItems().forEach(item => {
            getBlazons(item.id).forEach(blazon => howManyDifferentBlazons.includes(blazon) === false && howManyDifferentBlazons.push(blazon))
        })        
        
        const howManyMatchedBanners = effect.condition !== undefined && effect.condition.banner !== undefined 
        ? Math.max(...neighborsPanoramas.map(panorama => panorama.filter((item) => ( getBanner(item.id) === effect.condition!.banner)).length))
        : 0

        const howManyMatchedBlazons = (effect.condition !== undefined && effect.condition.blazon !== undefined) 
            ? effect.condition.blazon.some(blazon => blazon === BlazonType.Different || blazon === BlazonType.MissingDifferent) 
                ? effect.condition.blazon.includes(BlazonType.Different) ? howManyDifferentBlazons.length : 6 - howManyDifferentBlazons.length
                : Math.max(...neighborsPanoramas.map(panorama => panorama.getItems().reduce((cardAcc, currentCard) => cardAcc + effect.condition!.blazon!.reduce((blazonAcc, currentBlazon ) => blazonAcc + howManyTargettedBlazon(currentCard.id, currentBlazon), 0 ) , 0) ))
            : 0

        const howManyMatchedBlazonsQuantity = (effect.condition !== undefined && effect.condition.blazonNumber !== undefined) 
            ? playerPanorama.getItems().reduce((cardAcc, currentCard) => cardAcc + (howManyBlazons(currentCard.id) === effect.condition?.blazonNumber ? 1 : 0) , 0)
            : 0

        const howManyMatchedSpaceFilling = (effect.condition !== undefined && effect.condition.filledOrEmpty !== undefined) 
            ? effect.condition.filledOrEmpty === SpaceFilling.Filled ? playerPanorama.length : 1 - playerPanorama.length
            : 0

        const howManyMatchedCostCards = (effect.condition !== undefined && effect.condition.cardCost !== undefined)
            ? playerPanorama.getItems().reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id, effect.condition!.cardCost!) ? 1 : 0)) , 0 )
            : 0

        const howManyMatchedStoreCoinCards = (effect.condition !== undefined && effect.condition.onStockCard !== undefined)
            ? playerPanorama.getItems().filter(card => canStockCoins(card.id)).length
            : 0
        
        if (effect.condition !== undefined) {
            moves.push( 
                this
                    .material(MaterialType.Key)
                    .createItem({
                        location: {
                            type: LocationType.PlayerKeyStock,
                            player: this.player,
                        },
                        quantity: (howManyMatchedBlazonsQuantity 
                            + howManyMatchedBanners 
                            + howManyMatchedBlazons
                            + howManyMatchedSpaceFilling
                            + howManyMatchedCostCards
                            + howManyMatchedStoreCoinCards) 
                            * effect.value
                    })
            )
        } else {
            moves.push( 
                this
                    .material(MaterialType.Key)
                    .createItem({
                        location: {
                            type: LocationType.PlayerKeyStock,
                            player: this.player,
                        },
                        quantity: effect.value
                    })
            )
        }

        if (effect.condition !== undefined && effect.condition.opponentGain !== undefined){
            this.game.players.forEach(player => player !== this.player &&
                moves.push(
                    this.material(MaterialType.Key)
                    .createItem({
                        location:{
                            type: LocationType.PlayerKeyStock,
                            player
                        }, 
                        quantity:effect.condition!.opponentGain
                    })
                )
            )

        }

        return moves

    }
}