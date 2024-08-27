/** @jsxImportSource @emotion/react */
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'
import { css } from '@emotion/react'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({players}) => {
  const tableSized = getTableSize(players)
  return <>
    <GameTable 
    xMin={tableSized.xMin}
     xMax={tableSized.xMax}
      yMin={tableSized.yMin}
       yMax={tableSized.yMax}
               margin={{ top: 7, left: 0, right: 30, bottom: 0 }}
        css={css`background-color: #ffffff80`}         
               >
      <GameTableNavigation/>
    </GameTable>
    <PlayerPanels/>
  </>
}

function getTableSize(playerNumber: number): { xMin: number, xMax: number, yMin: number, yMax: number } {
  switch (playerNumber) {
    case 1:
    case 2:
    case 3:
      return { xMin: -50, xMax: 50, yMin: -25, yMax: 30 }
    case 4:
    case 5:
    default:
      return { xMin: -50, xMax: 50, yMin: -25, yMax: 35 }
  }
}