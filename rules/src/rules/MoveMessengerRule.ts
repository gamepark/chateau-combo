import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveMessengerRule extends PlayerTurnRule {
  onRuleStart() {
    const messenger = this.messenger
    const card = this.placedCard
    const place = card.id.back
    const moves: MaterialMove[] = []
    const otherPlace = place === Place.Castle ? Place.Village : Place.Castle
    if (cardCharacteristics[card.id.front].moveMessenger && this.getRiver(otherPlace).length > 0) {
      moves.push(messenger.moveItem({
        type: LocationType.EndOfRiver,
        id: otherPlace
      }))
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
      .getItem(this.remind(Memory.PlacedCard))!
  }

  getRiver(place: Place) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(place)
  }
}