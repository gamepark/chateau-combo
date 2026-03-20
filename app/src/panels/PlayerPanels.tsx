import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { ChateauComboPlayerPanel } from './ChateauComboPlayerPanel'
import { panelGapEm, panelRightMargin, panelScale, panelTopMargin } from './PanelConstants'

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
    <div css={[containerCss, n === 2 && twoPlayersCss]}>
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
  left: 50%;
  top: ${panelTopMargin / panelScale}em;
  transform: translateX(-50%) translateZ(1em);
  font-size: ${panelScale}em;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${panelGapEm}em;
`

const twoPlayersCss = css`
  left: 0;
  right: 0;
  transform: translateZ(1em);
  justify-content: space-between;
  padding: 0 ${panelRightMargin / panelScale}em;
`
