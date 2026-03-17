import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { ChateauComboPlayerPanel } from './ChateauComboPlayerPanel'

const scale = 0.6

export const PlayerPanels: FC = () => {
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<ChateauComboRules>()!
  const me = usePlayerId()
  const viewedPlayer = (rules as any).game.view ?? me ?? players[0]?.id

  const allPlayers = rules.game.players as PlayerId[]
  const n = allPlayers.length

  // Neighbor is relative to the viewed player
  const viewedIndex = allPlayers.indexOf(viewedPlayer as PlayerId)
  const leftNeighborId = n > 2 ? allPlayers[(viewedIndex - 1 + n) % n] : undefined
  const rightNeighborId = n > 2 ? allPlayers[(viewedIndex + 1) % n] : undefined

  return (
    <div css={containerCss}>
      {players.map((player) => {
        const pid = player.id as PlayerId

        return (
          <ChateauComboPlayerPanel
            key={pid}
            playerId={pid}
            isViewed={pid === viewedPlayer}
            isLeftNeighbor={pid === leftNeighborId}
            isRightNeighbor={pid === rightNeighborId}
            viewedPlayer={viewedPlayer as PlayerId}
          />
        )
      })}
    </div>
  )
}

const containerCss = css`
  position: absolute;
  right: ${0.5 / scale}em;
  top: ${1 / scale}em;
  font-size: ${scale}em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
`
