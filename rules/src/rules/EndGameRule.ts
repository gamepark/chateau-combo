import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { BannerType, cardCharacteristics } from '../CardCharacteristics'
import { isNoble } from '../Card'

export class EndGameRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

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

}