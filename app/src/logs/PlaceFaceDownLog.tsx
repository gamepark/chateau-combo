import { MaterialLogProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogPlayerName } from './LogPlayerName'

export const PlaceFaceDownLog: FC<MaterialLogProps> = ({ context }) => {
  return (
    <Trans defaults="<0/> takes a card face down" i18nKey="log.face-down">
      <LogPlayerName playerId={context.action.playerId}/>
    </Trans>
  )
}
