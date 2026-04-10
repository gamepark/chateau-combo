import { css } from '@emotion/react'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { LocationDescription, Locator, MaterialContext, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SealMenuButton } from '../theme/SealMenuButton'
import { getViewPlayer } from './panelCoordinates'

const PassButton = () => {
  const passMove = useLegalMove(m => isCustomMoveType(CustomMoveType.Pass)(m))
  if (!passMove) return null
  return <SealMenuButton move={passMove} label={<Trans i18nKey="move.pass"/>} labelPosition="right">
    <FontAwesomeIcon icon={faForwardStep}/>
  </SealMenuButton>
}

class PassButtonLocator extends Locator {

  locationDescription = new PassButtonDescription()

  coordinates = { x: -19, y: 25, z: 1 }

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    const rule = rules.game.rule
    const viewPlayer = getViewPlayer(context)
    if (rule?.id !== RuleId.ActivateLock || rule?.player !== viewPlayer) return []
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
