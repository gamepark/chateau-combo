import { MaterialLogProps } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { KeyIcon } from './LogIcons'
import { LogPlayerName } from './LogPlayerName'

export const GainKeysLog: FC<MaterialLogProps> = ({ move }) => {
  const m = move as CustomMove
  const { player, quantity } = m.data as { player: number, quantity: number }
  return (
    <Trans defaults="<0/> gains {quantity} <1/>" i18nKey="log.gain-keys" values={{ quantity }}>
      <LogPlayerName playerId={player}/>
      <KeyIcon/>
    </Trans>
  )
}
