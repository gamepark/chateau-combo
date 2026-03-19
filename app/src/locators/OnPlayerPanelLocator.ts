import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { panelGap, panelHeight, panelRightMargin, panelTopMargin, panelWidth, tableXMax, tableYMin } from '../panels/PanelConstants'
import { getViewPlayer } from './panelCoordinates.ts'

/**
 * Animation-only locator: positions items at a player's panel center with tiny scale.
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
    const totalPlayers = context.rules.players.length

    // Panels are centered horizontally (center of table = x:0 in table coords = (xMin+xMax)/2 = 4.5)
    const tableCenter = (-37 + 46) / 2   // (xMin + xMax) / 2
    const totalWidth = totalPlayers * panelWidth + (totalPlayers - 1) * panelGap
    const startX = tableCenter - totalWidth / 2
    const x = startX + panelIndex * (panelWidth + panelGap) + panelWidth / 2

    return {
      x,
      y: tableYMin + panelTopMargin + panelHeight / 2,
      z: 10
    }
  }
}

export const onPlayerPanelLocator = new OnPlayerPanelLocator()

/**
 * Animation-only locator: positions items just below a player's panel, visible.
 */
class BesidePanelLocator extends ListLocator {
  getGap(_location: Location, _context: MaterialContext): Partial<Coordinates> {
    return { z: 0.05 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const coords = onPlayerPanelLocator.getCoordinates(location, context)
    return {
      x: coords.x,
      y: coords.y + panelHeight / 2 + 2,
      z: 10
    }
  }

  placeItem(item: MaterialItem, context: ItemContext): string[] {
    return [...super.placeItem(item, context), 'scale(1)']
  }
}

export const besidePanelLocator = new BesidePanelLocator()

class BesidePanelCardLocator extends BesidePanelLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coords = onPlayerPanelLocator.getCoordinates(location, context)
    return {
      x: coords.x,
      y: coords.y + panelHeight / 2 + 3.5,
      z: 10
    }
  }
}

export const besidePanelCardLocator = new BesidePanelCardLocator()
