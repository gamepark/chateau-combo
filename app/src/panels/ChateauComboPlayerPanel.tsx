/** @jsxImportSource @emotion/react */
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { TableauHelper } from '@gamepark/chateau-combo/rules/helpers/TableauHelper'
import { Player } from '@gamepark/react-client'
import { CounterProps, StyledPlayerPanel, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes, useMemo } from 'react'
import pointImage from '../images/icons/point.png'
import coinImage from '../images/tokens/Gold1.png'
import keyImage from '../images/tokens/Key1.png'

type ChateauComboPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>

export const ChateauComboPlayerPanel: FC<ChateauComboPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const rules = useRules<ChateauComboRules>()!
  const state = useMemo(() => new TableauHelper(rules.game, player.id), [rules.game, player.id])

  const counters: CounterProps[] = [{
    image: rules.isOver() ? pointImage : keyImage,
    value: rules.isOver() ? rules.getScore(player.id) : state.keyQuantity
  }, {
    image: coinImage,
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
