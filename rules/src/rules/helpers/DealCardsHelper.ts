import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Place, places } from '../../material/Place'

export class DealCardsHelper extends MaterialRulesPart {
  completeRivers(moveOnceComplete: MaterialMove) {
    const moves: MaterialMove[] = []
    for (const place of places) {
      const river = this.getRiver(place)
      const deck = this.getDeck(place)
      const cardsToDraw = 3 - river.length
      if (cardsToDraw) {
        if (cardsToDraw <= deck.length) {
          moves.push(...deck.deal({ type: LocationType.River, id: place }, cardsToDraw))
          moves.push(moveOnceComplete)
        } else {
          const discard = this.getDiscard(place)
          if (discard.length) {
            moves.push(...deck.deal({ type: LocationType.River, id: place }, deck.length))
            moves.push(discard.moveItemsAtOnce({ type: LocationType.Deck, id: place }))
            moves.push(discard.shuffle())
          } else {
            moves.push(...river.deleteItems())
            moves.push(...deck.deleteItems())
            const messenger = this.material(MaterialType.MessengerPawn)
            if (messenger.getItem()!.location.id === place) {
              moves.push(messenger.moveItem({ type: LocationType.EndOfRiver, id: place === Place.Castle ? Place.Village : Place.Castle }))
            }
            moves.push(moveOnceComplete)
          }
        }
      }
    }
    return moves
  }

  getDeck(place: Place) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .locationId(place)
      .deck()
  }

  getRiver(place: Place) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(place)
  }

  getDiscard(place: Place) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .locationId(place)
  }
}
