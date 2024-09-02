/** @jsxImportSource @emotion/react */
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { KeyEffectRule } from '@gamepark/chateau-combo/rules/KeyEffectRule'
import { PlayMoveButton, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const KeyEffectHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const itsMe = rules.getActivePlayer() === player
  const legalMoves = useLegalMoves<MaterialMove>()
  const moveMessenger = legalMoves.find((move) => isMoveItemType(MaterialType.MessengerToken)(move))
  const discardCards = legalMoves.find((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard)

  return (
    <Trans defaults={itsMe ? 'key-effect.you' : 'key-effect.player'} values={{ place: new KeyEffectRule(rules.game).messengerPlace }}>
      <PlayMoveButton move={moveMessenger}/>
      <PlayMoveButton move={discardCards}/>
    </Trans>
  )
}