import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { WaxSealButton } from '../theme/WaxSealButton'

export const DiscardEntireRiverHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.game.rule?.player
  const castle = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseRiver)(move) && move.data === Place.Castle)
  const village = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseRiver)(move) && move.data === Place.Village)
  const itsMe = player && player === activePlayer
  const playerName = usePlayerName(activePlayer)
  return (
    <Trans i18nKey={itsMe ? 'discard-entire-river.you' : 'discard-entire-river.player'}
           values={{ player: playerName }}>
      <WaxSealButton move={itsMe ? castle : undefined}/>
      <WaxSealButton move={itsMe ? village : undefined}/>
    </Trans>
  )
}
