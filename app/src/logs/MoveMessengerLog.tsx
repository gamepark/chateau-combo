import { Place } from '@gamepark/chateau-combo/material/Place'
import { MaterialLogProps } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogPlayerName } from './LogPlayerName'

export const MoveMessengerLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as MoveItem
  const place = m.location.id === Place.Castle ? 'Castle' : 'Village'

  if (context.consequenceIndex !== undefined) {
    return <Trans defaults="The Messenger moves to {place}" i18nKey="log.messenger.auto" values={{ place }}/>
  }

  return (
    <Trans defaults="<0/> moves the Messenger to {place}" i18nKey="log.messenger" values={{ place }}>
      <LogPlayerName playerId={context.action.playerId}/>
    </Trans>
  )
}
