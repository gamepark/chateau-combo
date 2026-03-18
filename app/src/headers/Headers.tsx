import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { ComponentType } from 'react'
import { ActivateAdjacentAbilityHeader } from './ActivateAdjacentAbilityHeader'
import { ActivateLockAfterBuyHeader } from './ActivateLockAfterBuyHeader'
import { BuyCardHeader } from './BuyCardHeader'
import { ChooseBetweenHeader } from './ChooseBetweenHeader'
import { DiscardEntireRiverHeader } from './DiscardEntireRiverHeader'
import { DiscardFromRiverHeader } from './DiscardFromRiverHeader'
import { EndGameHeader } from './EndGameHeader'
import { EndOfTurnHeader } from './EndOfTurnHeader'
import { KeyEffectHeader } from './KeyEffectHeader'
import { MoveMessengerHeader } from './MoveMessengerHeader'
import { SpendKeyHeader } from './SpendKeyHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SpendKey]: SpendKeyHeader,
  [RuleId.KeyEffect]: KeyEffectHeader,
  [RuleId.BuyCard]: BuyCardHeader,
  [RuleId.DiscardFromRiver]: DiscardFromRiverHeader,
  [RuleId.ChooseBetween]: ChooseBetweenHeader,
  [RuleId.MoveMessenger]: MoveMessengerHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.EndGame]: EndGameHeader,
  [RuleId.DiscardEntireRiver]: DiscardEntireRiverHeader,
  [RuleId.ActivateAdjacentAbility]: ActivateAdjacentAbilityHeader,
  [RuleId.ActivateLockAfterBuy]: ActivateLockAfterBuyHeader
}