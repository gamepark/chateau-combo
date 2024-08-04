import { BannerType, BlazonType, cardCharacteristics, getBanner, hasTheBlazon } from "../../CardCharacteristics";
import { ImmediateEffectType } from "../../material/ImmediateEffectType";
import { LocationType } from "../../material/LocationType";
import { MaterialType } from "../../material/MaterialType";
import { AbstractImmediateEffect } from "./AbstractImmediateEffect";

export type GainCoinEffect = {
    type: ImmediateEffectType.GetCoins,
    value: number;
    condition?: { column?: boolean, line?: boolean, banner?: BannerType, blazon?: BlazonType[] }
}

export class ImmediateGainCoinEffect extends AbstractImmediateEffect<GainCoinEffect> {

    
    getEffectMoves(effect: GainCoinEffect) {

        const panorama = this.panorama
        const column = this.cardItem.location.x
        const line = this.cardItem.location.y

        console.log ("effect : ", effect.condition?.blazon)
        
        
        const cardQuantityThatMatchCondition = panorama.filter((item) => 
            (effect.condition!.banner !== undefined && getBanner(item.id) === effect.condition!.banner) ||
            (effect.condition!.blazon !== undefined && effect.condition!.blazon.some(blazon =>  hasTheBlazon(item.id, blazon)))
        ).length

        console.log("cardThatMatch : ", cardQuantityThatMatchCondition)
        console.log("quantity : ",cardQuantityThatMatchCondition * effect.value )
        
        if (effect.condition !== undefined) {
            console.log ("Applay !")
            return [
                this
                    .material(MaterialType.GoldCoin)
                    .createItem({
                        location: {
                            type: LocationType.PlayerGoldStock,
                            player: this.player,
                        },
                        quantity: cardQuantityThatMatchCondition * effect.value
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