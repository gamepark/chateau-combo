import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { KeyEffectRule } from '@gamepark/chateau-combo/rules/KeyEffectRule'
import { useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { WaxSealButton } from '../theme/WaxSealButton'

export const KeyEffectHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const itsMe = rules.getActivePlayer() === player
  const legalMoves = useLegalMoves<MaterialMove>()
  const moveMessenger = legalMoves.find((move) => isMoveItemType(MaterialType.MessengerPawn)(move))
  const discardRiver = legalMoves.find((move) => isCustomMoveType(CustomMoveType.ChooseRiver)(move))
  const name = usePlayerName(rules.getActivePlayer())
  return (
    <Trans i18nKey={itsMe ? 'key-effect.you' : 'key-effect.player'} values={{
      player: name,
      place: new KeyEffectRule(rules.game).messengerPlace
    }}>
      <WaxSealButton move={moveMessenger}/>
      <WaxSealButton move={discardRiver}/>
    </Trans>
  )
}