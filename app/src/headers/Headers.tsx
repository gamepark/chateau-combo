/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { ComponentType } from 'react'
import { BuyCardHeader } from './BuyCardHeader'
import { SpendKeyHeader } from './SpendKeyHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.BuyCard]: BuyCardHeader,
  [RuleId.SpendKey]: SpendKeyHeader
}