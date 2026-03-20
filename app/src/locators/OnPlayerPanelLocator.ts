import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { getPanelX, panelHeight, panelTopMargin, tableYMin } from '../panels/PanelConstants'
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
    return {
      x: getPanelX(getRelativePlayerIndex(context, location.player), context.rules.players.length),
      y: tableYMin + panelTopMargin + panelHeight / 2,
      z: 10
    }
  }
}

export const onPlayerPanelLocator = new OnPlayerPanelLocator()

/**
 * Animation-only locator: positions items just below a player's panel, visible.
 */
class BelowPanelLocator extends ListLocator {
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

export const belowPanelLocator = new BelowPanelLocator()

class BelowPanelCardLocator extends BelowPanelLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const coords = onPlayerPanelLocator.getCoordinates(location, context)
    return {
      x: coords.x,
      y: coords.y + panelHeight / 2 + 3.5,
      z: 10
    }
  }
}

export const belowPanelCardLocator = new BelowPanelCardLocator()
