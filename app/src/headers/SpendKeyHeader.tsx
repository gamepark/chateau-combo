/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const SpendKeyHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const spend = useLegalMove((move) => isDeleteItemType(MaterialType.Key)(move))
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  return (
    <Trans defaults={itsMe ? "spend-key.you" : "spend-key.player"} values={{ player: playerName }}>
      <PlayMoveButton move={spend}/>
    </Trans>
  )
}