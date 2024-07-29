import { ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class KeyDiscardLocationCardsRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      this
        .material(MaterialType.Card)
        .location(LocationType.NobleRiver)
        .moveItemsAtOnce({
          type: LocationType.NobleDiscard
        }),
      this
        .material(MaterialType.Card)
        .location(LocationType.VillageRiver)
        .moveItemsAtOnce({
          type: LocationType.VillageDiscard
        })
    ]
  }

  afterItemMove(_move: ItemMove) {
    return this
      .material(MaterialType.Key)
      .player(this.player)
      .deleteItems(1)
  }
}