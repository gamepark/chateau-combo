import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics } from '../CardCharacteristics'
import { Place, places } from '../material/Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const placedCard = this.placedCard
    // Move Messenger if it should
    if (placedCard.id.front !== undefined && this.placedCard.location.rotation === undefined && cardCharacteristics[placedCard.id.front].canSwapMessengerToken) {
      moves.push(this.messenger.moveItem({
        type: LocationType.EndOfRiver,
        id: placedCard.id.back
      }))
    }

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
      moves.push(this.startPlayerTurn(RuleId.SpendKey, this.nextPlayer))
    }

    return moves
  }

  get messenger() {
    return this
      .material(MaterialType.MessengerToken)
      .location(LocationType.EndOfRiver)
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
      .location(place)
  }

  get placedCard() {
    return this
      .material(MaterialType.Card)
      .getItem(this.remind(Memory.PlacedCard))!
  }

  onRuleEnd() {
    // Cleaning
    this.forget(Memory.PlacedCard)
    this.forget(Memory.ImmediateEffectsToPlay)
    return []
  }
}