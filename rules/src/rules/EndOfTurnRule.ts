import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { BannerType, cardCharacteristics } from '../CardCharacteristics'
import { isCastleType, isNoble } from '../material/Card'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    // Move Messenger if it should
    if (this.placedCard?.id.front !== undefined && this.placedCard.location.rotation === undefined && cardCharacteristics[this.placedCard.id.front].canSwapMessengerToken) {
      moves.push(this.messenger.moveItem({
        type: LocationType.EndOfRiver,
        id: isCastleType(this.placedCard.id) ? BannerType.VillageBanner : BannerType.NobleBanner
      }))
    }

    // Refill villageRiver
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

    // Refill NobleRiver
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

  get placedCard() {
    return this
      .material(MaterialType.Card)
      .getItem(this.remind(Memory.PlacedCard))
  }

  onRuleEnd() {
    // Cleaning
    this.forget(Memory.PlacedCard)
    this.forget(Memory.ImmediateEffectsToPlay)
    return []
  }
}