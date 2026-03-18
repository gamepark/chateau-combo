import { Place } from '@gamepark/chateau-combo/material/Place'
import { MaterialLogProps } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogPlayerName } from './LogPlayerName'

export const DiscardRiverLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as CustomMove
  const place = m.data === Place.Castle ? 'Castle' : 'Village'
  return (
    <Trans defaults="<0/> discards the {place} river" i18nKey="log.discard-river" values={{ place }}>
      <LogPlayerName playerId={context.action.playerId}/>
    </Trans>
  )
}
