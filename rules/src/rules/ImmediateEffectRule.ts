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
        const immediateEffect = cardCharacteristics[card.id].immediateEffect ?? { type: ImmediateEffectType.GetCoins }
        const Effect = ImmediateEffects[immediateEffect.type]!
        const moves: MaterialMove[] = new Effect(this.game).getEffectMoves(immediateEffect)
        
        moves.push(this.startRule(RuleId.MoveMessenger))
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

