import { PlayerTurnRule } from '@gamepark/rules-api'

export class KeyMoveMessengerRule extends PlayerTurnRule {
  getPlayerMoves() {
    return []
  }
}