import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { getViewPlayer } from './panelCoordinates.ts'

// GameTable bounds (must match GameDisplay.tsx)
const tableYMin = -18.5

// Panel layout in table em (must match PlayerPanels.tsx)
const panelScale = 0.6
const panelWidth = 22 * panelScale          // 13.2
const basePanelHeight = 8.48 * panelScale   // 5.088
const leftMargin = 1                        // table em from left (1/scale in panel font-size)
const topMargin = 0.3                       // table em from top
const gap = 0.75 * panelScale              // 0.45

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

    // Cumulate X offset for each panel before the target
    let x = -37 + leftMargin
    for (let i = 0; i < panelIndex; i++) {
      x += panelWidth + gap
    }

    return {
      x: x + panelWidth / 2,
      y: tableYMin + topMargin + basePanelHeight / 2,
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
      y: coords.y + basePanelHeight / 2 + 2,
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
      y: coords.y + basePanelHeight / 2 + 3.5,
      z: 10
    }
  }
}

export const besidePanelCardLocator = new BesidePanelCardLocator()
