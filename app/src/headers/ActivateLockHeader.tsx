import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { WaxSealButton } from '../theme/WaxSealButton'

export const ActivateLockHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const pass = useLegalMove((move) => isCustomMoveType(CustomMoveType.Pass)(move))
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  return (
    <Trans i18nKey={itsMe ? 'activate-lock-after-buy.you' : 'activate-lock-after-buy.player'}
           values={{ player: playerName }}>
      <WaxSealButton move={itsMe ? pass : undefined}/>
    </Trans>
  )
}
