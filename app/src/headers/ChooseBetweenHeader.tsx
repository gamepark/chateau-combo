/** @jsxImportSource @emotion/react */
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { PlayMoveButton, usePlayerId, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const ChooseBetweenHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  

  if (player === activePlayer){
    return <MyChooseBetweenHeader />
  } else {
    return <PlayerChooseBetweenHeader activePlayer={activePlayer} />
  }

}

const MyChooseBetweenHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const legalMoves = rules.getLegalMoves(player)
  

  return <>
    <span>{t('header.you.choose.between')}</span>
    {legalMoves.map((move, index) => 
      move.type === CustomMoveType.Choice && <PlayMoveButton key={index} move={move}> {t('coucou')} </PlayMoveButton>
    )}
  </>

}

const PlayerChooseBetweenHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  return <>
    <span>{t('header.player.choose.between', {activePlayer})}</span>
  </>
}
