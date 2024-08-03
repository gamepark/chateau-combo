import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { Memory } from "../Memory";
import { LocationType } from "../../material/LocationType";

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