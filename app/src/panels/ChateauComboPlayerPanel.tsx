/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { TableauHelper } from '@gamepark/chateau-combo/rules/helpers/TableauHelper'
import { Player } from '@gamepark/react-client'
import { CounterProps, StyledPlayerPanel, useFocusContext, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes, useCallback, useMemo } from 'react'
import pointImage from '../images/icons/point.png'
import Panel1 from '../images/panels/panel.1.jpg'
import Panel2 from '../images/panels/panel.2.jpg'
import Panel3 from '../images/panels/panel.3.jpg'
import Panel4 from '../images/panels/panel.4.jpg'
import Panel5 from '../images/panels/panel.5.jpg'
import coinImage from '../images/tokens/Gold1.png'
import keyImage from '../images/tokens/Key1.png'

type ChateauComboPlayerPanelProps = {
  player: Player,
  index: number
} & HTMLAttributes<HTMLDivElement>

export const ChateauComboPlayerPanel: FC<ChateauComboPlayerPanelProps> = (props) => {
  const { player, index, ...rest } = props
  const rules = useRules<ChateauComboRules>()!
  const state = useMemo(() => new TableauHelper(rules.game, player.id), [rules.game, player.id])

  const { setFocus } = useFocusContext()
  const isBottomPlayers = rules.players.length === 5? (index === 0 || index === 4): (rules.players.length === 4? (index === 0 || index === 3): index === 0)
  const focusPlayer = useCallback(() => {
    setFocus({
      materials: [
        rules.material(MaterialType.Card).player(player.id)
      ],
      staticItems: [],
      locations: [],
      margin: {
        left: (!isBottomPlayers && rules.players.length === 5)? 17: 0,
        top: isBottomPlayers? 6: 2
      }
    })
  }, [rules, player, setFocus])

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
      onClick={focusPlayer}
      player={player}
      counters={counters}
      backgroundImage={panelBackgrounds[player.id]}
      countersPerLine={2}
      css={canClick}
      {...rest}
    />
  )
}

const canClick = css`
  cursor: pointer;
`

const panelBackgrounds = {
  [1]: Panel1,
  [2]: Panel2,
  [3]: Panel3,
  [4]: Panel4,
  [5]: Panel5,
}
