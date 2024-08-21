/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from "@gamepark/chateau-combo/ChateauComboRules"
import { usePlayerId, useRules } from "@gamepark/react-game"
import { useTranslation } from "react-i18next"

export const DiscardFromRiverHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!

  if (player === activePlayer){
    return <MyDiscardFromRiver />
  } else {
    return <PlayerDiscardFromRiverHeader activePlayer={activePlayer} />
  }

}

const MyDiscardFromRiver = () => {
  const { t } = useTranslation()
  return <>
    <span>{t('header.you.discard.from.river')}</span>
  </>

}

const PlayerDiscardFromRiverHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  return <>
    <span>{t('header.player.discard.from.river', {activePlayer})}</span>
  </>
}

