/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { ChateauComboPlayerPanel } from './ChateauComboPlayerPanel'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <ChateauComboPlayerPanel player={player} key={player.id} css={panelPosition(index)} />
      )}
    </>,
    root
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
`