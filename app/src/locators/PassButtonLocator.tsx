import { css } from '@emotion/react'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { PassButton } from './component/PassButton'
import { getViewPlayer } from './panelCoordinates'

class PassButtonLocator extends Locator {

  locationDescription = new PassButtonDescription()

  coordinates = { x: -19, y: 25, z: 1 }

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    const rule = rules.game.rule
    const viewPlayer = getViewPlayer(context)
    if (rule?.id !== RuleId.EndOfTurn || rule?.player !== viewPlayer) return []
    if (player !== viewPlayer) return []
    return [{ type: LocationType.PassButton, player }]
  }
}

class PassButtonDescription extends LocationDescription {
  height = 2
  width = 2
  borderRadius = 1
  extraCss = css`pointer-events: auto !important;`
  content = PassButton
}

export const passButtonLocator = new PassButtonLocator()
