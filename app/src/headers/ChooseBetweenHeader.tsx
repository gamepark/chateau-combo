/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { Effect, EffectType } from '@gamepark/chateau-combo/material/Effect'
import { ChooseBetweenRule } from '@gamepark/chateau-combo/rules/ChooseBetweenRule'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
import { ImmediateGainCoinEffect } from '@gamepark/chateau-combo/rules/effects/ImmediateGainCoinEffect'
import { ImmediateGainKeyEffect } from '@gamepark/chateau-combo/rules/effects/ImmediateGainKeyEffect'
import { ImmediateEffects } from '@gamepark/chateau-combo/rules/ImmediateEffectRule'
import { Picture, PlayMoveButton, useGame, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Bag from '../images/icons/bag.png'
import { goldCoinDescription } from '../material/GoldCoinDescription'
import { keyDescription } from '../material/KeyDescription'

export const ChooseBetweenHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const chooseBetweenRule = new ChooseBetweenRule(rules.game)
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!
  const name = usePlayerName(activePlayer)
  const itsMe = activePlayer === player
  const effect1 = chooseBetweenRule.effect1ToPlay
  const effect2 = chooseBetweenRule.effect2ToPlay
  const chooseEffect1 = useLegalMove((move) => isCustomMoveType(CustomMoveType.Choice)(move) && move.data === 1 && new ImmediateEffects[effect1.type]!(rules.game).getEffectMoves(effect1).length > 0)
  const chooseEffect2 = useLegalMove((move) => isCustomMoveType(CustomMoveType.Choice)(move) && move.data === 2 && new ImmediateEffects[effect2.type]!(rules.game).getEffectMoves(effect2).length > 0)
  if (itsMe) {
    return (
      <Trans
        defaults="choose-effect.you"
        values={{
          card: t(`card.${chooseBetweenRule.placedCard.id.front}`)
        }}
      >
        <EffectButton effect={effect1} move={chooseEffect1}/>
        <EffectButton effect={effect2} move={chooseEffect2}/>
      </Trans>
    )
  }

  return (
    <Trans defaults="choose-effect.player" values={{
      card: t(`card.${chooseBetweenRule.placedCard.id.front}`),
      player: name
    }}/>
  )
}

const EffectButton: FC<{ effect: Effect, move: CustomMove }> = ({ effect, move }) => {
  const game = useGame<MaterialGame>()!
  switch (effect.type) {
    case EffectType.GainKeys: {
      const gainKeyRule = new ImmediateGainKeyEffect(game)
      return (
        <PlayMoveButton move={move}>
          <div css={flexRowCss}><Picture css={mini} src={keyDescription.images[1]}/> x {gainKeyRule.getMyGain(effect)}</div>
        </PlayMoveButton>
      )
    }
    case EffectType.GainGold: {
      const gainCoinRule = new ImmediateGainCoinEffect(game)
      return (
        <PlayMoveButton move={move}>
          <div css={flexRowCss}><Picture css={mini} src={goldCoinDescription.images[1]}/> x {gainCoinRule.getMyGain(effect)}</div>
        </PlayMoveButton>
      )
    }
    case EffectType.PutGoldOnCard: {
      return (
        <PlayMoveButton move={move}>
          <div css={flexRowCss}>
            <Trans defaults="effect.banker" values={{ count: effect.gold }}
                   components={{
                     gold: <Picture css={mini} src={goldCoinDescription.images[1]}/>,
                     bag: <Picture css={mini} src={Bag}/>
                   }}
            />
          </div>
        </PlayMoveButton>
      )
    }
    default:
      return <></>
  }
}

const flexRowCss = css`
`

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`
