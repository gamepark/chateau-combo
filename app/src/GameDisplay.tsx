/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({ players }) => {
  return <GameTable {...(players === 2 ? tableSize2Players : tableSize)}
                    css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
    <GameTableNavigation css={players === 2 ? twoPlayersNavigationCss : players === 3 ? threePlayersNavigationCss : navigationCss}/>
    <PlayerPanels/>
  </GameTable>
}

const navigationCss = css`
  top: 50%;
  left: auto;
  right: 5em;
`

const twoPlayersNavigationCss = css`
  top: auto;
  bottom: 3em;
  left: 50%;
  transform: translateX(-50%);
`

const threePlayersNavigationCss = css`
  top: 10em;
  left: auto;
  right: 2em;
`

const tableSize = { xMin: -63, xMax: 63, yMin: -55, yMax: 7 }
const tableSize2Players = { xMin: -42, xMax: 45, yMin: -25, yMax: 22 }
