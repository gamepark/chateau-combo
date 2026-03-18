/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { usePlayers, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'

// Colors matching the panel background tones (Panel1 through Panel5)
const playerColors = ['#2868A8', '#A83838', '#2E7830', '#8838A8', '#B87020']

export const LogPlayerName: FC<{ playerId?: number }> = ({ playerId }) => {
  const name = usePlayerName(playerId)
  const players = usePlayers()
  const playerIndex = players.findIndex(p => p.id === playerId)
  const color = playerColors[playerIndex % playerColors.length] ?? playerColors[0]
  return <strong css={playerNameCss(color)}>{name}</strong>
}

const playerNameCss = (color: string) => css`
  font-weight: 600;
  color: ${color};
`
