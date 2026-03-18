
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { WaxSealButton } from '../theme/WaxSealButton'

export const SpendKeyHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const spend = useLegalMove((move) => isDeleteItemType(MaterialType.Key)(move))
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  return (
    <Trans i18nKey={itsMe ? "spend-key.you" : "spend-key.player"} values={{ player: playerName }}>
      <WaxSealButton move={spend}/>
    </Trans>
  )
}