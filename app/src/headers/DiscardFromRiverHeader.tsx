/** @jsxImportSource @emotion/react */
import { DiscardFromRiverRule } from '@gamepark/chateau-combo/rules/DiscardFromRiverRule'
import { useGame, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { useMemo } from 'react'
import { Trans } from 'react-i18next'

export const DiscardFromRiverHeader = () => {
  const game = useGame<MaterialGame>()!
  const player = usePlayerId()
  const discardRule = useMemo(() => new DiscardFromRiverRule(game), [game])
  const activePlayer = discardRule.getActivePlayer()
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  return (
    <Trans defaults={itsMe ? "discard.you" : "discard.player"} values={{ player: playerName, place: discardRule.discardPlace }}>
      <strong/>
    </Trans>
  )
}