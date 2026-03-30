import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ActivateAdjacentAbilityHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const name = usePlayerName(activePlayer)
  const itsMe = activePlayer === player

  return (
    <Trans
      i18nKey={itsMe ? 'activate-adjacent.you' : 'activate-adjacent.player'}
      values={{ player: name }}
    />
  )
}
