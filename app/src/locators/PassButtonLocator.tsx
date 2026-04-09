import { css } from '@emotion/react'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { faForwardStep } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationDescription, Locator, MaterialContext, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType, Location } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SealMenuButton } from '../theme/SealMenuButton'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { getViewPlayer } from './panelCoordinates'
import { TABLEAU_X } from './TableauLocator'

const PassButton = () => {
  const passMove = useLegalMove(m => isCustomMoveType(CustomMoveType.Pass)(m))
  if (!passMove) return null
  return <SealMenuButton move={passMove} label={<Trans i18nKey="move.pass"/>} labelPosition="right">
    <FontAwesomeIcon icon={faForwardStep}/>
  </SealMenuButton>
}

class PassButtonLocator extends Locator {

  locationDescription = new PassButtonDescription()

  getCoordinates(location: Location, context: MaterialContext) {
    const { rules } = context
    const player = location.player!
    const cards = rules.material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(player)
      .getItems()

    const gap = { x: cardDescription.width + 0.2, y: cardDescription.height + 0.2 }

    if (cards.length === 0) {
      return { x: TABLEAU_X, y: 6.5 + gap.y + 1.5, z: 5 }
    }

    const xs = cards.map(c => c.location.x ?? 0)
    const ys = cards.map(c => c.location.y ?? 0)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const maxY = Math.max(...ys)
    const centerX = (minX + maxX) / 2

    return {
      x: TABLEAU_X + centerX * gap.x + 1,
      y: 6.5 + (maxY + 1) * gap.y + 1.5,
      z: 5
    }
  }

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
