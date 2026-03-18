import { css } from '@emotion/react'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import {
  isCreateItemType,
  isCustomMoveType,
  isDeleteItemType,
  isMoveItemType,
  isStartPlayerTurn,
  MaterialMove,
  MoveItem
} from '@gamepark/rules-api'
import { BuyCardLog } from './BuyCardLog'
import { PlaceFaceDownLog } from './PlaceFaceDownLog'
import { SpendKeyLog } from './SpendKeyLog'
import { ActivateLockLog } from './ActivateLockLog'
import { PassLog } from './PassLog'
import { ChooseEffectLog } from './ChooseEffectLog'
import { DiscardCardLog } from './DiscardCardLog'
import { DiscardRiverLog } from './DiscardRiverLog'
import { ActivateAdjacentLog } from './ActivateAdjacentLog'
import { MoveMessengerLog } from './MoveMessengerLog'
import { GainGoldLog } from './GainGoldLog'
import { GainKeysLog } from './GainKeysLog'
import { PlaceGoldOnCardLog } from './PlaceGoldOnCardLog'
import { KeyPlacedOnCardLog } from './KeyPlacedOnCardLog'
import { PlaceRemainingGoldLog } from './PlaceRemainingGoldLog'
import { TurnSeparatorLog } from './TurnSeparatorLog'

const separatorCss = css`
  background: transparent !important;
  background-color: transparent !important;
  border-left: none !important;
  border-radius: 0 !important;
  padding: 0.3em 0.3em 0.1em !important;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  min-height: 0 !important;
  box-shadow: none !important;

  > div {
    width: 100%;
  }
`

const consequenceCss = css`
  background: transparent;
  background-color: transparent;
  border-left-color: rgba(212, 168, 40, 0.25);
  padding-left: 0.8em;
`

const systemCss = css`
  background: transparent;
  background-color: transparent;
  border-left-color: transparent;
  padding-left: 0.8em;
  font-style: italic;
  color: #8B6B4A;
`

export class ChateauComboLogs implements LogDescription<MaterialMove> {
  getMovePlayedLogDescription(
    move: MaterialMove,
    context: MoveComponentContext<MaterialMove, number>
  ): MovePlayedLogDescription | undefined {
    const playerId = context.action.playerId

    // Turn separator — only on SpendKey (real start of turn)
    if (isStartPlayerTurn(move) && (move as any).id === RuleId.SpendKey) {
      return { Component: TurnSeparatorLog, css: separatorCss }
    }

    // Card moved to Tableau = buy or place face-down
    if (isMoveItemType(MaterialType.Card)(move) && (move as MoveItem).location.type === LocationType.Tableau) {
      const m = move as MoveItem
      if (m.location.rotation) {
        return { Component: PlaceFaceDownLog, player: playerId }
      }
      return { Component: BuyCardLog, player: playerId }
    }

    // Card moved to Discard = discard from river
    if (isMoveItemType(MaterialType.Card)(move) && (move as MoveItem).location.type === LocationType.Discard) {
      return { Component: DiscardCardLog, player: playerId }
    }

    // Messenger pawn moved
    if (isMoveItemType(MaterialType.MessengerPawn)(move)) {
      if (context.consequenceIndex !== undefined) {
        return { Component: MoveMessengerLog, depth: 1, css: systemCss }
      }
      return { Component: MoveMessengerLog, player: playerId }
    }

    // Key deleted = spend key
    if (isDeleteItemType(MaterialType.Key)(move)) {
      const items = context.game.items[MaterialType.Key]
      const item = items?.[move.itemIndex]
      if (item?.location?.type === LocationType.PlayerKeyStock) {
        return { Component: SpendKeyLog, player: playerId }
      }
      return undefined
    }

    // Gain gold (custom move for logs)
    if (isCustomMoveType(CustomMoveType.GainGold)(move)) {
      return { Component: GainGoldLog, depth: 1, css: consequenceCss }
    }

    // Gain keys (custom move for logs)
    if (isCustomMoveType(CustomMoveType.GainKeys)(move)) {
      return { Component: GainKeysLog, depth: 1, css: consequenceCss }
    }

    // Gold placed on card
    if (isCreateItemType(MaterialType.GoldCoin)(move)) {
      const loc = move.item.location
      if (loc.type === LocationType.OnCard) {
        return { Component: PlaceGoldOnCardLog, depth: 1, css: consequenceCss }
      }
      return undefined
    }

    // Key placed on lock card
    if (isCreateItemType(MaterialType.Key)(move)) {
      const loc = move.item.location
      if (loc.type === LocationType.KeyOnCard) {
        return { Component: KeyPlacedOnCardLog, depth: 1, css: systemCss }
      }
      return undefined
    }

    // Gold moved to OnCard (end game)
    if (isMoveItemType(MaterialType.GoldCoin)(move) && (move as MoveItem).location.type === LocationType.OnCard) {
      return { Component: PlaceRemainingGoldLog, depth: 1, css: consequenceCss }
    }

    // Custom moves
    if (isCustomMoveType(CustomMoveType.ActivateLock)(move)) {
      return { Component: ActivateLockLog, player: playerId }
    }

    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return { Component: PassLog, player: playerId }
    }

    if (isCustomMoveType(CustomMoveType.Choice)(move)) {
      return { Component: ChooseEffectLog, depth: 1, css: consequenceCss }
    }

    if (isCustomMoveType(CustomMoveType.ChooseRiver)(move)) {
      return { Component: DiscardRiverLog, player: playerId }
    }

    if (isCustomMoveType(CustomMoveType.ActivateAdjacent)(move)) {
      return { Component: ActivateAdjacentLog, player: playerId }
    }

    return undefined
  }
}
