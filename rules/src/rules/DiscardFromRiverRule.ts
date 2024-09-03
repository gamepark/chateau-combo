import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { DiscardFromRiver } from '../material/ImmediateEffect'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DiscardFromRiverRule extends PlayerTurnRule {

  getPlayerMoves() {
    return this.discardRiver
      .moveItems({
        type: LocationType.Discard,
        id: this.discardPlace
      })
  }

  get placedCard() {
    return this
      .material(MaterialType.Card)
      .getItem(this.remind(Memory.PlacedCard))!
  }

  get discardRiver() {
    const riverId = this.discardPlace
    return this.material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(riverId)
  }

  get discardPlace() {
    return (cardCharacteristics[this.placedCard.id.front].immediateEffect![0] as DiscardFromRiver).river
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Discard) return []

    const effect = cardCharacteristics[this.placedCard.id.front].immediateEffect![0] as DiscardFromRiver
    const discardedCardId = this.material(MaterialType.Card).getItem(move.itemIndex)!.id.front
    const discardedCardCost = cardCharacteristics[discardedCardId].cost
    const moves: MaterialMove[] = []

    moves.push(
      this
        .material(effect.token)
        .createItem({
          location: {
            type: effect.token === MaterialType.GoldCoin ? LocationType.PlayerGoldStock : LocationType.PlayerKeyStock,
            player: this.player
          },
          quantity: discardedCardCost
        }))

    this.forget(Memory.ImmediateEffectsToPlay)
    moves.push(this.startRule(RuleId.EndOfTurn))

    return moves
  }
}
