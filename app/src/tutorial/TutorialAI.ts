import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { GameAI } from '@gamepark/react-client'
import { isDeleteItem, isMoveItem, MaterialGame } from '@gamepark/rules-api'
import { sample } from 'lodash'

export const TutorialAI: GameAI = (game: MaterialGame, player: number) => {
  let legalMoves = new ChateauComboRules(game).getLegalMoves(player)
  switch (game.rule?.id) {
    case RuleId.SpendKey:
      // Do not spend keys
      legalMoves = legalMoves.filter(move => !(isDeleteItem(move) && move.itemType === MaterialType.Key))
      if (legalMoves.some(move => isMoveItem(move) && move.location.type === LocationType.PlayerBoard && !move.location.rotation)) {
        // Do not pick face down card if I can take one face up
        legalMoves = legalMoves.filter(move => !(isMoveItem(move) && move.location.type === LocationType.PlayerBoard && move.location.rotation))
      }
      break
  }
  return Promise.resolve([sample(legalMoves)])
}