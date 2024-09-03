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
    if (cardCharacteristics[card.id.front].moveMessenger) {
      moves.push(messenger.moveItem({
        type: LocationType.EndOfRiver,
        id: place === Place.Castle ? Place.Village : Place.Castle
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

}