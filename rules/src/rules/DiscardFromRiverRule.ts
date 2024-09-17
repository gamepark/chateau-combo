import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { coins } from '../material/Coin'
import { DiscardFromRiver } from '../material/Effect'
import { keys } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DiscardFromRiverRule extends PlayerTurnRule {

  onRuleStart() {
    if (this.getPlayerMoves().length === 0) {
      return [this.startRule(RuleId.EndOfTurn)]
    }
    return []
  }

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
    return (cardCharacteristics[this.placedCard.id.front].effects[0] as DiscardFromRiver).river
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Discard) return []

    const effect = cardCharacteristics[this.placedCard.id.front].effects[0] as DiscardFromRiver
    const discardedCardId = this.material(MaterialType.Card).getItem(move.itemIndex)!.id.front
    const discardedCardCost = cardCharacteristics[discardedCardId].cost
    const moves: MaterialMove[] = []

    if (effect.token === MaterialType.GoldCoin) {
      moves.push(
        ...this.material(MaterialType.GoldCoin).money(coins)
          .addMoney(discardedCardCost, { type: LocationType.PlayerGoldStock, player: this.player })
      )
    } else {
      moves.push(
        ...this.material(MaterialType.Key).money(keys)
          .addMoney(discardedCardCost, { type: LocationType.PlayerKeyStock, player: this.player })
      )
    }

    moves.push(this.startRule(RuleId.MoveMessenger))

    return moves
  }
}
