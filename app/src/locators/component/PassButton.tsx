import { faForwardStep } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SealMenuButton } from '../../theme/SealMenuButton'

export const PassButton = () => {
  const passMove = useLegalMove(m => isCustomMoveType(CustomMoveType.Pass)(m))
  if (!passMove) return null
  return <SealMenuButton move={passMove} label={<Trans i18nKey="move.pass"/>} labelPosition="right">
    <FontAwesomeIcon icon={faForwardStep}/>
  </SealMenuButton>
}
