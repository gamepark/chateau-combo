import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place, places } from '../material/Place'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    for (const place of places) {
      const river = this.getRiver(place)
      const deck = this.getDeck(place)
      const cardsToDraw = 3 - river.length
      if (cardsToDraw) {
        moves.push(
          ...deck.deal({
            type: LocationType.River,
            id: place
          }, cardsToDraw)
        )
      }
    }

    const playersWithRemainingSpots = this.game.players.filter(player => 
      this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(player).getItems().length !== 9
    )

    if (playersWithRemainingSpots.length === 0){
      moves.push(this.startRule(RuleId.EndGame))
    } else {
      moves.push(this.startPlayerTurn(RuleId.BuyCard, this.nextPlayer))
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

  onRuleEnd() {
    // Cleaning
    this.forget(Memory.PlacedCard)
    this.forget(Memory.KeySpent)
    this.forget(Memory.ImmediateEffectsToPlay)
    return []
  }
}