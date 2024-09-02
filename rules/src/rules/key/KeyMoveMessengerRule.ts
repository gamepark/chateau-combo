import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Place } from '../../material/Place'
import { RuleId } from '../RuleId'

export class KeyMoveMessengerRule extends PlayerTurnRule {
  getPlayerMoves() {
    const messenger = this.messenger
    return [
      messenger.moveItem((item) => ({
        type: LocationType.EndOfRiver,
        id: item.location.id === Place.Village ? Place.Castle : Place.Village
      }))
    ]
  }

  afterItemMove(_move: ItemMove) {
    return [
      this
        .material(MaterialType.Key)
        .player(this.player)
        .deleteItem(1),
      this.startRule(RuleId.BuyCard)
    ]
  }

  get messenger() {
    return this
      .material(MaterialType.MessengerToken)
      .location(LocationType.EndOfRiver)
  }
}