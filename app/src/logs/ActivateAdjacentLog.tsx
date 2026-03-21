import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialLogProps } from '@gamepark/react-game'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogCardName } from './LogCardName'
import { LogPlayerName } from './LogPlayerName'

export const ActivateAdjacentLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as CustomMove
  const rules = new ChateauComboRules(context.game)
  const card = rules.material(MaterialType.Card).getItem(m.data)
  return (
    <Trans defaults="<0/> activates <1/>'s ability" i18nKey="log.activate-adjacent">
      <LogPlayerName playerId={context.action.playerId}/>
      <LogCardName card={card.id?.front}/>
    </Trans>
  )
}
