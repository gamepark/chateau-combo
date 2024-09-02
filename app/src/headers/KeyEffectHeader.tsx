/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { KeyEffectRule } from '@gamepark/chateau-combo/rules/KeyEffectRule'
import { PlayMoveButton, useGame, usePlayerId, useRules } from '@gamepark/react-game'
import { isMoveItemType, ItemMoveType, MaterialGame, MaterialMove, MoveKind } from '@gamepark/rules-api'
import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const KeyEffectHeader = () => {
  const game = useGame<MaterialGame>()!
  const player = usePlayerId()
  // This is because useLegalMoves() can return 0 moves during animations
  const keyEffectRule = new KeyEffectRule(game)
  const activePlayer = keyEffectRule.getActivePlayer()
  const itsMe = player && activePlayer === player
  const legalMoves = useMemo(() => keyEffectRule.getPlayerMoves(), [game])
  const moveMessenger = legalMoves.find((move) => isMoveItemType(MaterialType.MessengerToken)(move))
  const discardCards = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard)

  return (
    <Trans defaults={itsMe ? 'key-effect.you' : 'key-effect.player'} values={{ place: keyEffectRule.messengerPlace }}>
      <PlayMoveButton move={moveMessenger}/>
      <PlayMoveButton move={discardCards}/>
    </Trans>
  )
}