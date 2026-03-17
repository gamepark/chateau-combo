import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { getViewPlayer } from './panelCoordinates.ts'

// GameTable bounds (must match GameDisplay.tsx)
const tableXMax = 46
const tableYMin = -18.5

// Panel layout in table em (must match PlayerPanels.tsx)
const panelScale = 0.6
const panelWidth = 22 * panelScale          // 13.2
const basePanelHeight = 8.48 * panelScale   // 5.088 — panel without strip
const stripHeight = 1.83 * panelScale       // 1.098 — neighbor strip
const rightMargin = 0.5                     // table em from xMax
const topMargin = 1                         // table em from yMin
const gap = 0.8 * panelScale               // 0.48

const panelCenterX = tableXMax - rightMargin - panelWidth / 2

function hasStrip(playerIndex: number, players: any[], me: any): boolean {
  const n = players.length
  if (me === undefined || n <= 1) return false
  const meIdx = players.indexOf(me)
  if (meIdx === -1) return false
  const leftNeighbor = players[(meIdx - 1 + n) % n]
  const rightNeighbor = players[(meIdx + 1) % n]
  const player = players[playerIndex]
  return player === leftNeighbor || player === rightNeighbor
}

/**
 * Animation-only locator: positions items at a player's panel center with tiny scale.
 * Used as a waypoint for trajectory animations (gold, keys, cards moving to/from non-viewed players).
 */
class OnPlayerPanelLocator extends ListLocator {
  getGap(): Partial<Coordinates> {
    return { z: 0.05 }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    const transforms = super.placeItem(item, context)
    if (item.location.player !== getViewPlayer(context)) {
      return [...transforms, 'scale(0)']
    }
    return [...transforms, 'scale(1)']
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const panelIndex = getRelativePlayerIndex(context, location.player)
    const players = context.rules.players
    const me = context.player

    // Sorted players (same order as usePlayers({ sortFromMe: true }))
    const meIdx = me !== undefined ? players.indexOf(me) : -1
    const sortedPlayers = meIdx >= 0
      ? [...players.slice(meIdx), ...players.slice(0, meIdx)]
      : [...players]

    // Cumulate Y offset for each panel before the target
    let y = tableYMin + topMargin
    for (let i = 0; i < panelIndex; i++) {
      const h = basePanelHeight + (hasStrip(players.indexOf(sortedPlayers[i]), players, me) ? stripHeight : 0)
      y += h + gap
    }
    const thisHeight = basePanelHeight + (hasStrip(players.indexOf(sortedPlayers[panelIndex]), players, me) ? stripHeight : 0)

    return {
      x: panelCenterX,
      y: y + thisHeight / 2,
      z: 10
    }
  }
}

export const onPlayerPanelLocator = new OnPlayerPanelLocator()

/**
 * Animation-only locator: positions items just left of a player's panel, visible (scale ~1.5).
 * Used as a brief waypoint so tokens "appear" near the panel before traveling to the stock.
 */
class BesidePanelLocator extends ListLocator {
  getGap(_location: Location, _context: MaterialContext): Partial<Coordinates> {
    return { z: 0.05 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const coords = onPlayerPanelLocator.getCoordinates(location, context)
    return {
      x: coords.x - panelWidth / 2 - 2,
      y: coords.y,
      z: 10
    }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    return [...super.placeItem(item, context), 'scale(1)']
  }
}

export const besidePanelLocator = new BesidePanelLocator()
