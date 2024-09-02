/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api/dist/material/moves/items/DeleteItem'
import { Trans } from 'react-i18next'

export const BuyCardHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const keys = rules.material(MaterialType.Key).player(activePlayer).getQuantity()
  const spend = useLegalMove((move) => isDeleteItemType(MaterialType.Key)(move))
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  if (keys) {
    return (
      <Trans defaults={itsMe ? "spend-key.you" : "spend-key.player"} values={{ player: playerName }}>
        <PlayMoveButton move={spend}/>
      </Trans>
    )
  }

  return (
    <Trans defaults={itsMe ? "buy.you" : "buy.player"} values={{ player: playerName }}>
      <strong/>
    </Trans>
  )
}