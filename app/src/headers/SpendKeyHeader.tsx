/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from "@gamepark/chateau-combo/ChateauComboRules"
import { MaterialType } from "@gamepark/chateau-combo/material/MaterialType"
import { PlayMoveButton, usePlayerId, useRules } from "@gamepark/react-game"
import { ItemMoveType, MaterialMove, MoveKind } from "@gamepark/rules-api"
import { useTranslation } from "react-i18next"

export const SpendKeyHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  

  if (player === activePlayer){
    return <MySpendKeyHeader />
  } else {
    return <PlayerSpendKeyHeader activePlayer={activePlayer} />
  }

}

const MySpendKeyHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const legalMoves = rules.getLegalMoves(player)
  console.log(legalMoves)



  return <>
    <span>{t('header.you.spend.key')}</span>
    {legalMoves.map(move => 
      <PlayMoveButton move={move}> {t(getSpendKeyHeaderMoveTrans(move))} </PlayMoveButton>
    )}
  </>

}

const PlayerSpendKeyHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  return <p>{t('header.player.spend.key', {activePlayer})}</p>
}

function getSpendKeyHeaderMoveTrans(move:MaterialMove):string{
  if (move.kind === MoveKind.RulesMove){
    return 'header.you.spend.key.dont'
  } else {
    return move.type === ItemMoveType.MoveAtOnce
      ? 'header.you.spend.key.discard'
      : 'header.you.spend.key.messenger'
  }
}