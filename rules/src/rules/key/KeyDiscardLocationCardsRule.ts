import { isMoveItemTypeAtOnce, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class KeyDiscardLocationCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    const messengerPosition = this.material(MaterialType.MessengerToken).getItem()!.location.id

    return [
      this
        .material(MaterialType.Card)
        .location(LocationType.River)
        .locationId(messengerPosition)
        .moveItemsAtOnce({
          type: LocationType.Discard,
          id: messengerPosition
        })
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemTypeAtOnce(MaterialType.Card)(move)) return []
    const originLocation = this.material(MaterialType.Card).getItem(move.indexes[0])!.location
    const deck = this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .locationId(originLocation.id)
      .deck()

    return deck.deal({
      type: originLocation.type,
      id: originLocation.id
    }, 3)
  }

  afterItemMove(_move: ItemMove) {
    return this
      .material(MaterialType.Key)
      .player(this.player)
      .deleteItems(1)
  }
}