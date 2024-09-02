/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { ComponentType } from 'react'
import { BuyCardHeader } from './BuyCardHeader'
import { KeyEffectHeader } from './KeyEffectHeader'
import { DiscardFromRiverHeader } from './DiscardFromRiver'
import { ChooseBetweenHeader } from './ChooseBetweenHeader'
import { ImmediateEffectHeader } from './ImmediateEffectHeader'
import { EndOfTurnHeader } from './EndOfTurnHeader'
import { EndGameHeader } from './EndGameHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.BuyCard]: BuyCardHeader,
  [RuleId.KeyEffect]: KeyEffectHeader,
  [RuleId.DiscardFromRiver]: DiscardFromRiverHeader,
  [RuleId.ChooseBetween]: ChooseBetweenHeader,
  [RuleId.ImmediateEffect]: ImmediateEffectHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.EndGame]:EndGameHeader
}