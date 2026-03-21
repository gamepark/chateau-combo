import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialLogProps } from '@gamepark/react-game'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { CreateItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogCardName } from './LogCardName'
import { GoldIcon } from './LogIcons'
import { LogPlayerName } from './LogPlayerName'

export const PlaceGoldOnCardLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as CreateItem
  const quantity = m.item.quantity ?? 1
  const rules = new ChateauComboRules(context.game)
  const parentCard = m.item.location.parent !== undefined
    ? rules.material(MaterialType.Card).getItem(m.item.location.parent)
    : undefined
  return (
    <Trans defaults="<0/> places {quantity} <1/> on <2/>" i18nKey="log.place-gold" values={{ quantity }}>
      <LogPlayerName playerId={m.item.location.player}/>
      <GoldIcon/>
      <LogCardName card={parentCard?.id?.front}/>
    </Trans>
  )
}
