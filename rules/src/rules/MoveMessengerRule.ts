import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveMessengerRule extends PlayerTurnRule {
  onRuleStart() {
    // Restore original placed card if it was changed by ActivateAdjacentAbility
    const original = this.remind<number>(Memory.OriginalPlacedCard)
    if (original !== undefined) {
      this.memorize(Memory.PlacedCard, original)
      this.forget(Memory.OriginalPlacedCard)
    }
    const messenger = this.messenger
    const card = this.placedCard
    const moves: MaterialMove[] = []
    if (card?.id?.front) {
      const place = card.id.back
      const otherPlace = place === Place.Castle ? Place.Village : Place.Castle
      if (cardCharacteristics[card.id.front].moveMessenger && this.getRiver(otherPlace).length > 0) {
        moves.push(messenger.moveItem({
          type: LocationType.EndOfRiver,
          id: otherPlace
        }))
      }
    }

    moves.push(this.startPlayerTurn(RuleId.EndOfTurn, this.player))
    return moves
  }

  get messenger() {
    return this
      .material(MaterialType.MessengerPawn)
      .location(LocationType.EndOfRiver)
  }

  get placedCard() {
    return this
      .material(MaterialType.Card)
      .getItem<CardId>(this.remind(Memory.PlacedCard))!
  }

  getRiver(place: Place) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(place)
  }
}