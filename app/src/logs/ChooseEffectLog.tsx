import { CardId } from '@gamepark/chateau-combo/material/Card'
import { cardCharacteristics } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { ChooseBetween } from '@gamepark/chateau-combo/material/Effect'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Memory } from '@gamepark/chateau-combo/rules/Memory'
import { MaterialLogProps } from '@gamepark/react-game'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { CustomMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getEffectDescription } from '../material/help/ChateauComboCardHelp'
import { LogPlayerName } from './LogPlayerName'

export const ChooseEffectLog: FC<MaterialLogProps> = ({ move, context }) => {
  const m = move as CustomMove
  const rules = new ChateauComboRules(context.game)
  const placedCardIndex = rules.remind(Memory.PlacedCard)
  const card = rules.material(MaterialType.Card).getItem<CardId>(placedCardIndex)
  const chooseBetween = cardCharacteristics[card.id!.front!].effects[0] as ChooseBetween
  const chosenEffect = m.data === 1 ? chooseBetween.effect1 : chooseBetween.effect2

  return (
    <Trans i18nKey="log.choose-effect">
      <LogPlayerName playerId={context.action.playerId}/>
      {getEffectDescription(chosenEffect)}
    </Trans>
  )
}
