import { MaterialGame, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { Memory } from "./Memory";
import { cardCharacteristics } from "../CardCharacteristics";
import { RuleId } from "./RuleId";
import { ImmediateEffectType } from "../material/ImmediateEffectType";
import { AbstractImmediateEffect } from "./effects/AbstractImmediateEffect";
import { ImmediateGainCoinEffect } from "./effects/ImmediateGainCoinEffect";
import { ImmediateGainKeyEffect } from "./effects/ImmediateGainKeyEffect";

export class ImmediateEffectRule extends PlayerTurnRule {
    onRuleStart() {
        const card = this.card
        const immediateEffect = cardCharacteristics[card.id].immediateEffect 
        const moves: MaterialMove[] = []
        const effectCreatorArray: ({type: ImmediateEffectType} & Record<any, any>)[] = []

        // Si on a déjà mémorisé des effets, alors il en reste a appliquer
        if (this.remind(Memory.ImmediateEffectsToPlay) !== undefined){
        } // Sinon, c'est la première fois, donc on calcule les effets
        else {
            if( immediateEffect === undefined) {
                moves.push(this.startRule(RuleId.MoveMessenger))
            } else {
                immediateEffect.forEach(eff => {
                    effectCreatorArray.push(eff)    
                })
            }
            console.log(effectCreatorArray)
            this.memorize(Memory.ImmediateEffectsToPlay, effectCreatorArray)
            console.log(this.remind(Memory.ImmediateEffectsToPlay))
        }

        // On parcourt la liste des effets à jouer, et on va dans les rules nécessaires

        const EffectArray = this.remind(Memory.ImmediateEffectsToPlay)
        console.log(EffectArray)

        const firstEffectType:ImmediateEffectType = EffectArray[0].type

        const effectMoves:MaterialMove[] = new ImmediateEffects[firstEffectType]!(this.game).getEffectMoves(EffectArray[0])
        effectMoves.forEach(move => moves.push(move))
        EffectArray.shift()
        // On mémorise le nouveau tableau amputé du premier élément traité
        if (EffectArray.length !== 0){
            this.memorize(Memory.ImmediateEffectsToPlay, EffectArray)
        } else {
            moves.push(this.startRule(RuleId.MoveMessenger))
            this.forget(Memory.ImmediateEffectsToPlay)
        }

        return moves
    }

    get card() {
        return this
            .material(MaterialType.Card)
            .getItem(this.remind(Memory.PlacedCard))!
    }
}

type EffectCreator = new (game: MaterialGame) => AbstractImmediateEffect<any>
const ImmediateEffects: Partial<Record<ImmediateEffectType, EffectCreator>> = {
    [ImmediateEffectType.GetCoins]: ImmediateGainCoinEffect,
    [ImmediateEffectType.GetKeys]: ImmediateGainKeyEffect,
}

