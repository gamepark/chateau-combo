import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { MaterialContext } from '@gamepark/react-game'
import { panelHeight, panelRightMargin, panelTopOffset, panelWidth, tableXMax, tableYMin } from '../panels/PanelConstants'

export function getViewPlayer(context: MaterialContext<PlayerId, MaterialType, LocationType>): PlayerId | undefined {
  return (context.rules as any).game.view ?? context.player ?? context.rules.players[0]
}

export function getViewPlayerIndex(context: MaterialContext<PlayerId, MaterialType, LocationType>, player?: PlayerId): number {
  if (player === undefined) return -1
  const players = context.rules.players
  const viewPlayer = getViewPlayer(context)
  if (viewPlayer === undefined || players[0] === viewPlayer) return players.indexOf(player)
  return (players.indexOf(player) - players.indexOf(viewPlayer) + players.length) % players.length
}

export function getPanelCoordinates(panelIndex: number) {
  const x = tableXMax - panelRightMargin - panelWidth / 2
  const y = tableYMin + panelTopOffset(panelIndex) + panelHeight / 2
  return { x, y }
}
