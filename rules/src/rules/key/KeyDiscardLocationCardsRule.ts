import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'

export class KeyDiscardLocationCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return this
      .river
      .moveItems((item) => ({
        type: LocationType.Discard,
        id: item.location.id
      }))
  }

  get river() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(this.messengerPlace)
  }

  get messengerPlace() {
    return this.material(MaterialType.MessengerToken).getItem()!.location.id
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const river = this.river
    const place = this.messengerPlace
    const deck = this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .locationId(place)
      .deck()

    if (river.length !== 2) return []
    return [
      ...this.river.moveItems({
        type: LocationType.Discard,
        id: place
      }),
      ...deck.deal({
        type: LocationType.River,
        id: place
      }, 3),
      this.startRule(RuleId.BuyCard)
    ]
  }
}