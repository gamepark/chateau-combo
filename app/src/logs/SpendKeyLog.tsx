import { MaterialLogProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { KeyIcon } from './LogIcons'
import { LogPlayerName } from './LogPlayerName'

export const SpendKeyLog: FC<MaterialLogProps> = ({ context }) => {
  return (
    <Trans i18nKey="log.spend-key">
      <LogPlayerName playerId={context.action.playerId}/>
      <KeyIcon/>
    </Trans>
  )
}
