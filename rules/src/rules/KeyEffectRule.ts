import { isMoveItemType, isShuffle, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { DealCardsHelper } from './helpers/DealCardsHelper'
import { RuleId } from './RuleId'

export class KeyEffectRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = this.discardRiver()
    const otherPlace = this.messengerPlace === Place.Castle ? Place.Village : Place.Castle
    if (this.getRiver(otherPlace).length > 0) {
      moves.push(
        this.messenger.moveItem(item => ({
          type: LocationType.EndOfRiver,
          id: item.location.id === Place.Castle ? Place.Village : Place.Castle
        }))
      )
    }
    return moves
  }

  get messenger() {
    return this.material(MaterialType.MessengerPawn)
  }

  get messengerPlace(): Place {
    return this.messenger.getItem()!.location.id
  }

  getRiver(place = this.messengerPlace) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(place)
  }

  discardRiver() {
    return this.getRiver().moveItems((item) => ({
      type: LocationType.Discard,
      id: item.location.id
    }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.MessengerPawn)(move)) {
      return [
        this.startRule(RuleId.BuyCard)
      ]
    }
    if (isMoveItemType(MaterialType.Card)(move)) {
      if (move.location.type === LocationType.Discard) {
        const river = this.getRiver()
        if (river.length === 2) {
          return this.discardRiver()
        } else if (river.length === 0) {
          return new DealCardsHelper(this.game).completeRivers(this.startRule(RuleId.BuyCard))
        }
      }
    }

    if (isShuffle(move)) {
      return new DealCardsHelper(this.game).completeRivers(this.startRule(RuleId.BuyCard))
    }

    return []
  }
}