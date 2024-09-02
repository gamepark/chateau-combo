import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { RuleId } from './RuleId'

export class KeyEffectRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return [
      this.messenger.moveItem(item => ({
        type: LocationType.EndOfRiver,
        id: item.location.id === Place.Castle ? Place.Village : Place.Castle
      })),
      ...this.discardRiver()
    ]
  }

  get messenger() {
    return this.material(MaterialType.MessengerToken)
  }

  get messengerPlace(): Place {
    return this.messenger.getItem()!.location.id
  }

  get river() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(this.messengerPlace)
  }

  discardRiver() {
    return this.river.moveItems((item) => ({
      type: LocationType.Discard,
      id: item.location.id
    }))
  }

  dealCards() {
    const place = this.messengerPlace
    return this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .locationId(place)
      .deck()
      .deal({
        type: LocationType.River,
        id: place
      }, 3 - this.river.length)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move)) {
      if (move.location.type === LocationType.Discard && this.river.length === 2) {
        return this.discardRiver()
      }

      if (!this.river.length) {
        return [
          ...this.dealCards(),
          this.startRule(RuleId.BuyCard)
        ]
      }
    }

    return []
  }
}