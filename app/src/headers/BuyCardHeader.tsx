/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from "@gamepark/chateau-combo/ChateauComboRules"
import { LocationType } from "@gamepark/chateau-combo/material/LocationType"
import { MaterialType } from "@gamepark/chateau-combo/material/MaterialType"
import { PlayerColor } from "@gamepark/chateau-combo/PlayerColor"
import { PlayMoveButton, usePlayerId, useRules } from "@gamepark/react-game"
import { useTranslation } from "react-i18next"

export const BuyCardHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!

  if (player === activePlayer){
    return <MyBuyCardHeader />
  } else {
    return <PlayerBuyCardHeader activePlayer={activePlayer} />
  }

}

const MyBuyCardHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const messengerPosition = rules.material(MaterialType.MessengerToken).getItem()!.location.type

  return <span>{t('header.you.choose.card', {river:messengerPosition})}</span>

}

const PlayerBuyCardHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  return <span>{t('header.player.choose.card', {activePlayer})}</span>
}