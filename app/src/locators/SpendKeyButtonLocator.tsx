import { css } from '@emotion/react'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LocationDescription, Locator, MaterialContext, useLegalMove } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SealMenuButton } from '../theme/SealMenuButton'
import { getViewPlayer } from './panelCoordinates'
import { TABLEAU_X } from './TableauLocator'

const isKeyDelete = isDeleteItemType(MaterialType.Key)

const SpendKeyButton = () => {
  const spendMove = useLegalMove(m => isKeyDelete(m))
  if (!spendMove) return null
  return <SealMenuButton move={spendMove} label={<Trans defaults="Spend a key" i18nKey="move.spend-key"/>} labelPosition="right">
    <FontAwesomeIcon icon={faKey}/>
  </SealMenuButton>
}

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
