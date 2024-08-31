import { isMoveItemTypeAtOnce, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Place } from '../../material/Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class KeyDiscardLocationCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    const messengerPosition = this.material(MaterialType.MessengerToken).getItem()!.location.id
    
    return [
      messengerPosition === Place.Castle 
      ? this
        .material(MaterialType.Card)
        .location(LocationType.NobleRiver)
        .moveItemsAtOnce({
          type: LocationType.NobleDiscard
        })
      : this
        .material(MaterialType.Card)
        .location(LocationType.VillageRiver)
        .moveItemsAtOnce({
          type: LocationType.VillageDiscard
        })
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemTypeAtOnce(MaterialType.Card)(move)) return []
    const discardLocationType = this.material(MaterialType.Card).getItem(move.indexes[0])!.location.type
    const deck = this.material(MaterialType.Card).location(discardLocationType === LocationType.NobleRiver? LocationType.NobleDeck: LocationType.VillageDeck).deck()
    return deck.deal({
      type: discardLocationType
    }, 3)
  }

  afterItemMove(_move: ItemMove) {
    return this
      .material(MaterialType.Key)
      .player(this.player)
      .deleteItems(1)
  }
}