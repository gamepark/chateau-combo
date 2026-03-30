import { MaterialLogProps } from '@gamepark/react-game'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { GoldIcon } from './LogIcons'
import { LogPlayerName } from './LogPlayerName'

export const GainGoldLog: FC<MaterialLogProps> = ({ move }) => {
  const m = move as CustomMove
  const { player, quantity } = m.data as { player: number, quantity: number }
  return (
    <Trans i18nKey="log.gain-gold" values={{ quantity }}>
      <LogPlayerName playerId={player}/>
      <GoldIcon/>
    </Trans>
  )
}
