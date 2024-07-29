import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    const villageRiver = this.villageRiver
    const villageDeck = this.villageDeck
    const villageToDraw = 3 - villageRiver.length
    if (villageToDraw) {
      moves.push(
        ...villageDeck.deal({
          type: LocationType.VillageRiver
        }, villageToDraw)
      )
    }

    const nobleRiver = this.nobleRiver
    const nobleDeck = this.nobleDeck
    const nobleToDraw = 3 - nobleRiver.length
    if (nobleToDraw) {
      moves.push(
        ...nobleDeck.deal({
          type: LocationType.NobleRiver
        }, nobleToDraw)
      )
    }

    moves.push(
      this.startPlayerTurn(RuleId.SpendKey, this.nextPlayer)
    )

    return moves
  }

  get nobleDeck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.NobleDeck)
      .deck()
  }

  get villageDeck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.VillageDeck)
      .deck()
  }

  get nobleRiver() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.NobleRiver)
  }

  get villageRiver() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.VillageRiver)
  }
}