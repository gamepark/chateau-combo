/** @jsxImportSource @emotion/react */
import { Player } from '@gamepark/react-client'
import { FC, HTMLAttributes } from 'react'

type ChateauComboPlayerPanelProps = {
    player: Player
  } & HTMLAttributes<HTMLDivElement>

export const ChateauComboPlayerPanel: FC<ChateauComboPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  return null
}