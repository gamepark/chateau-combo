import { faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { useLegalMove } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SealMenuButton } from '../../theme/SealMenuButton'

const isKeyDelete = isDeleteItemType(MaterialType.Key)

export const SpendKeyButton = () => {
  const spendMove = useLegalMove(m => isKeyDelete(m))
  if (!spendMove) return null
  return <SealMenuButton move={spendMove} label={<Trans i18nKey="move.spend-key"/>} labelPosition="right">
    <FontAwesomeIcon icon={faKey}/>
  </SealMenuButton>
}
