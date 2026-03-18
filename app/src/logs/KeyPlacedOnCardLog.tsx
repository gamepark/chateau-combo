import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialLogProps } from '@gamepark/react-game'
import { CreateItem, MaterialRules } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { LogCardName } from './LogCardName'
import { KeyIcon, LockIcon } from './LogIcons'

export const KeyPlacedOnCardLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as CreateItem
  const rules = new MaterialRules(context.game)
  const parentCard = m.item.location.parent !== undefined
    ? rules.material(MaterialType.Card).getItem(m.item.location.parent)
    : undefined
  return (
    <Trans defaults="A <0/> is placed on <1/> <2/>" i18nKey="log.key-placed">
      <KeyIcon/>
      <LogCardName card={parentCard?.id?.front}/>
      <LockIcon/>
    </Trans>
  )
}
