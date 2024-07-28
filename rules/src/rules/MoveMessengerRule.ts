import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics, getBanner } from '../CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MoveMessengerRule extends PlayerTurnRule {
  onRuleStart() {
    const messenger = this.messenger
    const card = this.placedCard
    const banner = getBanner(card.id)
    const canSwapMessengerToken = cardCharacteristics[card.id].canSwapMessengerToken
    const moves: MaterialMove[] = []
    if (canSwapMessengerToken && messenger.getItem()?.location.id !== banner) {
      moves.push(messenger.moveItem({
        type: LocationType.EndOfRiver,
        id: banner
      }))
    }

    moves.push(this.startPlayerTurn(RuleId.SpendKey, this.player))
    return moves
  }

  get messenger() {
    return this
      .material(MaterialType.MessengerToken)
      .location(LocationType.EndOfRiver)
  }

  get placedCard() {
    return this
      .material(MaterialType.Card)
      .getItem(this.remind(Memory.PlacedCard))!
  }

}