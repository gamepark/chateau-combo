import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Place } from '../../material/Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class KeyMoveMessengerRule extends PlayerTurnRule {
  getPlayerMoves() {
    const messenger = this.messenger
    return [
      messenger.moveItem((item) => ({
        type: LocationType.EndOfRiver,
        id: item.location.id === Place.Village? Place.Castle: Place.Village,
      }))
    ]
  }

  afterItemMove(_move: ItemMove) {
    return this
      .material(MaterialType.Key)
      .player(this.player)
      .deleteItems(1)
  }

  get messenger() {
    return this
      .material(MaterialType.MessengerToken)
      .location(LocationType.EndOfRiver)
  }
}