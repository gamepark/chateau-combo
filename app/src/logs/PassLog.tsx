import { MaterialLogProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogPlayerName } from './LogPlayerName'

export const PassLog: FC<MaterialLogProps> = ({ context }) => {
  return (
    <Trans defaults="<0/> passes" i18nKey="log.pass">
      <LogPlayerName playerId={context.action.playerId}/>
    </Trans>
  )
}
