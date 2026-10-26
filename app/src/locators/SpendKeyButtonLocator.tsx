import { css } from '@emotion/react'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { SpendKeyButton } from './component/SpendKeyButton'
import { getViewPlayer } from './panelCoordinates'
import { TABLEAU_X } from './TableauLocator'

class SpendKeyButtonLocator extends Locator {
  coordinates = { x: TABLEAU_X + 21, y: 25, z: 5 }

  locationDescription = new SpendKeyButtonDescription()

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    const rule = rules.game.rule
    const viewPlayer = getViewPlayer(context)
    if (rule?.id !== RuleId.SpendKey || rule?.player !== viewPlayer) return []
    const hasKeys = rules.material(MaterialType.Key)
      .location(LocationType.PlayerKeyStock).player(player).length > 0
    if (!hasKeys) return []
    return [{ type: LocationType.SpendKeyButton, player }]
  }
}

class SpendKeyButtonDescription extends LocationDescription {
  height = 2
  width = 2
  borderRadius = 1
  extraCss = css`pointer-events: auto !important;`
  content = SpendKeyButton
}

export const spendKeyButtonLocator = new SpendKeyButtonLocator()
