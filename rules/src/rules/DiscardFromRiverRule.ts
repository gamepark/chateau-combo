import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { ImmediateEffectType } from '../material/ImmediateEffectType'
import { cardCharacteristics } from '../CardCharacteristics'
import { RuleId } from './RuleId'

export type DiscardFromRiverEffect = { 
    type:ImmediateEffectType.DiscardFromRiver,
    river:LocationType.NobleRiver | LocationType.VillageRiver
    token:MaterialType.GoldCoin | MaterialType.Key
}

export class DiscardFromRiverRule extends PlayerTurnRule {

  getPlayerMoves() {
    return this.material(MaterialType.Card).location(this.riverToDiscard).moveItems({type:this.riverDiscard})
  }

  get placedCard() {
    return this
        .material(MaterialType.Card)
        .index(this.remind(Memory.PlacedCard))
  }

  get riverToDiscard(){
    return cardCharacteristics[this.placedCard!.getItem()!.id.front].immediateEffect![0].river
  }

  get riverDiscard(){
    return this.riverToDiscard === LocationType.NobleRiver 
        ? LocationType.NobleDiscard
        : LocationType.VillageDiscard
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && (move.location.type === LocationType.VillageDiscard || move.location.type === LocationType.NobleDiscard)) {
      const effect = cardCharacteristics[this.placedCard.getItem()!.id.front].immediateEffect![0]
      const discardedCardCost = cardCharacteristics[this.material(MaterialType.Card).getItem(move.itemIndex)!.id.front].cost
      const moves: MaterialMove[] = []

      moves.push(
        this
            .material(effect.token)
            .createItem({
                location: {
                    type: effect.token === MaterialType.GoldCoin ? LocationType.PlayerGoldStock : LocationType.PlayerKeyStock,
                    player: this.player,
                },
                quantity: discardedCardCost
            }))

      this.forget(Memory.ImmediateEffectsToPlay)
      moves.push(this.startRule(RuleId.EndOfTurn))
      
      
      return moves
    }
  return []
  }
}
