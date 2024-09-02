/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const BuyCardHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  return (
    <Trans defaults={itsMe ? "buy.you" : "buy.player"} values={{ player: playerName }}>
      <strong/>
    </Trans>
  )
}