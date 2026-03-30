import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialLogProps } from '@gamepark/react-game'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogCardName } from './LogCardName'
import { LogPlayerName } from './LogPlayerName'

export const DiscardCardLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as MoveItem
  const rules = new ChateauComboRules(context.game)
  const card = rules.material(MaterialType.Card).getItem(m.itemIndex)
  return (
    <Trans i18nKey="log.discard-card">
      <LogPlayerName playerId={context.action.playerId}/>
      <LogCardName card={card.id?.front}/>
    </Trans>
  )
}
