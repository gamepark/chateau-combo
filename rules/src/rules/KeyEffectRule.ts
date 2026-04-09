import { CustomMove, isCustomMoveType, isMoveItemType, isShuffle, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { CustomMoveType } from './CustomMoveType'
import { DealCardsHelper } from './helpers/DealCardsHelper'
import { LockHelper } from './helpers/LockHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class KeyEffectRule extends PlayerTurnRule {
  get returnRule() {
    return this.remind<RuleId>(Memory.ReturnRule) ?? RuleId.BuyCard
  }
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = [this.customMove(CustomMoveType.ChooseRiver, this.messengerPlace)]
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

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ChooseRiver)(move)) return []
    return this.discardRiver()
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
      if (!this.remind<boolean>(Memory.LockActivatedThisTurn)) {
        const lockIndexes = new LockHelper(this.game, this.player).activatableLockCardIndexes
        if (lockIndexes.length > 0) {
          this.memorize(Memory.ReturnRule, this.returnRule)
          return [this.startRule(RuleId.ActivateLock)]
        }
      }
      return [this.startRule(this.returnRule)]
    }
    if (isMoveItemType(MaterialType.Card)(move)) {
      if (move.location.type === LocationType.Discard) {
        const river = this.getRiver()
        if (river.length === 0) {
          return new DealCardsHelper(this.game).completeRivers(this.startRule(this.returnRule))
        }
      }
    }

    if (isShuffle(move)) {
      return new DealCardsHelper(this.game).completeRivers(this.startRule(this.returnRule))
    }

    return []
  }
}