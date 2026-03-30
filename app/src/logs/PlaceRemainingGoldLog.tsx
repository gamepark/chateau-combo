import { MaterialLogProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { GoldIcon } from './LogIcons'
import { LogPlayerName } from './LogPlayerName'

export const PlaceRemainingGoldLog: FC<MaterialLogProps> = ({ context }) => {
  return (
    <Trans i18nKey="log.place-remaining">
      <LogPlayerName playerId={context.action.playerId}/>
      <GoldIcon/>
    </Trans>
  )
}
