/** @jsxImportSource @emotion/react */
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayerBoardHelper } from '@gamepark/chateau-combo/rules/helpers/PlayerBoardHelper'
import { Player } from '@gamepark/react-client'
import { CounterProps, StyledPlayerPanel, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes, useMemo } from 'react'
import coinImage from '../images/tokens/Gold1.png'
import keyImage from '../images/tokens/Key1.png'

type ChateauComboPlayerPanelProps = {
    player: Player
  } & HTMLAttributes<HTMLDivElement>

export const ChateauComboPlayerPanel: FC<ChateauComboPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const rules = useRules<ChateauComboRules>()!
  const state = useMemo(() => new PlayerBoardHelper(rules.game, player.id), [rules.game, player.id])

  const counters: CounterProps[] = [{
    image: tokenImage(MaterialType.Key),
    value: state.keyQuantity
  }, {
    image: tokenImage(MaterialType.GoldCoin),
    value: state.coinsQuantity
  }]

  return (
    <StyledPlayerPanel
      activeRing
      player={player}
      counters={counters}
      countersPerLine={2}
      {...rest}
    />
  )
}

const tokenImage = (token:MaterialType):string => token === MaterialType.GoldCoin ? coinImage : keyImage