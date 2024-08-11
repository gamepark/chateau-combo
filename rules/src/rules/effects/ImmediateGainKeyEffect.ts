import { BlazonType, getBanner, getBlazons, howManyBlazons, howManyTargettedBlazon } from "../../CardCharacteristics";
import { ImmediateEffectType } from "../../material/ImmediateEffectType";
import { LocationType } from "../../material/LocationType";
import { MaterialType } from "../../material/MaterialType";
import { AbstractImmediateEffect, Condition, SpaceFilling } from "./AbstractImmediateEffect";

export type GainKeyEffect = {
    type: ImmediateEffectType.GetKeys,
    value: number;
    condition?: Condition
}

export class ImmediateGainKeyEffect extends AbstractImmediateEffect<GainKeyEffect> {

    
    getEffectMoves(effect: GainKeyEffect) {

        const panorama = this.panorama

        const howManyDifferentBlazons:BlazonType[] = []
        panorama.getItems().forEach(item => {
            getBlazons(item.id).forEach(blazon => howManyDifferentBlazons.includes(blazon) === false && howManyDifferentBlazons.push(blazon))
        })        
        
        const howManyMatchedBanners = effect.condition !== undefined && effect.condition.banner !== undefined 
        ? panorama.filter((item) => ( getBanner(item.id) === effect.condition!.banner)).length
        : 0

        const howManyMatchedBlazons = (effect.condition !== undefined && effect.condition.blazon !== undefined) 
            ? effect.condition.blazon.some(blazon => blazon === BlazonType.Different || blazon === BlazonType.MissingDifferent) 
                ? effect.condition.blazon.includes(BlazonType.Different) ? howManyDifferentBlazons.length : 6 - howManyDifferentBlazons.length
                : panorama.getItems().reduce((cardAcc, currentCard) => cardAcc + effect.condition!.blazon!.reduce((blazonAcc, currentBlazon ) => blazonAcc + howManyTargettedBlazon(currentCard.id, currentBlazon), 0 ) , 0) 
            : 0

        const howManyMatchedBlazonsQuantity = (effect.condition !== undefined && effect.condition.blazonNumber !== undefined) 
            ? panorama.getItems().reduce((cardAcc, currentCard) => cardAcc + (howManyBlazons(currentCard.id) === effect.condition?.blazonNumber ? 1 : 0) , 0)
            : 0

        const howManyMatchedSpaceFilling = (effect.condition !== undefined && effect.condition.filledOrEmpty !== undefined) 
            ? effect.condition.filledOrEmpty === SpaceFilling.Filled ? panorama.length : 1 - panorama.length
            : 0
        
        if (effect.condition !== undefined) {
            return [
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
                            + howManyMatchedSpaceFilling) 
                            * effect.value
                    })
            ]
        } else {
            return [
                this
                    .material(MaterialType.Key)
                    .createItem({
                        location: {
                            type: LocationType.PlayerKeyStock,
                            player: this.player,
                        },
                        quantity: 1 * effect.value
                    })
            ]
        }




        // Pour chaque entrée dans effect.banners

        // Si column === true => compter l'ensemble des bannière === banner sur la même colonne
        // Si line === true => compter l'ensemble des bannières === banner sur la même ligne
        // Créer autant de gold que effect.value * la somme des deux lignes précédentes

        //(!effect.condition?.column && !effect.condition?.line) ||
        //(effect.condition?.column && item.location.x === column) || 
        //(effect.condition?.line && item.location.y === line)

        return []
    }
}