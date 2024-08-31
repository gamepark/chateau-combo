/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { ChateauComboPlayerPanel } from './ChateauComboPlayerPanel'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  return (
    <>
      {players.map((player, index) =>
        <ChateauComboPlayerPanel key={player.id} player={player} css={panelPosition(index)}/>
      )}
    </>
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
  height: 14em;
`