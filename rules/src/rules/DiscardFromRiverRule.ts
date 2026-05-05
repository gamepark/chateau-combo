import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { DiscardFromRiver, Effect } from '../material/Effect'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { GainHelper } from './helpers/GainHelper'
import { ImmediateEffectRule } from './ImmediateEffectRule'
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
      .getItem<CardId>(this.remind(Memory.PlacedCard))!
  }

  get discardRiver() {
    const riverId = this.discardPlace
    return this.material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(riverId)
  }

  get discardPlace() {
    return (cardCharacteristics[this.placedCard.id.front!].effects[0] as DiscardFromRiver).river
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Discard) return []

    const effect = cardCharacteristics[this.placedCard.id.front!].effects[0] as DiscardFromRiver
    const discardedCardId = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)!.id.front as Card
    const discardedCardCost = cardCharacteristics[discardedCardId].cost
    const gain = new GainHelper(this.game)
    const moves: MaterialMove[] = []

    if (effect.token === MaterialType.GoldCoin) {
      moves.push(...gain.gainGold(discardedCardCost, this.player))
    } else {
      moves.push(...gain.gainKeys(discardedCardCost, this.player))
    }

    const pendingEffects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
    if (pendingEffects.length) {
      moves.push(...new ImmediateEffectRule(this.game).getPendingEffectsMoves())
    } else {
      const returnRule = this.remind<RuleId>(Memory.ReturnRule)
      moves.push(this.startRule(returnRule ?? RuleId.MoveMessenger))
    }

    return moves
  }
}
