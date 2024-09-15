import { cardCharacteristics } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { isItemContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { ShieldDistributionHelp } from './component/ShieldDistributionHelp'

class ShieldsLocator extends Locator {
  locationDescription = new ShieldsDescription()
  parentItemType = MaterialType.Card

  getPositionOnParent(location: Location, context: MaterialContext) {
    const item = context.rules.material(MaterialType.Card).getItem(location.parent!)!
    const shields = cardCharacteristics[item.id.front].shields.length ?? 1
    return {x: 85.5, y: 12.5 + (shields === 2? 6: 0)}
  }
}

class ShieldsDescription extends LocationDescription {
  getLocationSize(location: Location, context: MaterialContext) {
    if (location.parent === undefined) return { width: 0, height: 0 }
    const item = context.rules.material(MaterialType.Card).getItem(location.parent!)!
    return {
      width: 1.5,
      height: 1.25 * cardCharacteristics[item.id.front].shields.length ?? 1,
    }
  }

  borderRadius = 0.3

  help = ShieldDistributionHelp
}

export const shieldsLocator = new ShieldsLocator()