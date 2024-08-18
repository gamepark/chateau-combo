/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { PlayerColor } from '@gamepark/chateau-combo/PlayerColor'
import { PlayerBoardHelper } from '@gamepark/chateau-combo/rules/helpers/PlayerBoardHelper'
import { Player } from '@gamepark/react-client'
import { PlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes, useMemo } from 'react'
import { playerColorCode } from './PlayerPanels'
import { MaterialItem } from '@gamepark/rules-api'
import { Material } from 'src/material/Material'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import coinImage from '../images/Coin1.png'
import keyImage from '../images/Key1.png'


type ChateauComboPlayerPanelProps = {
    player: Player
  } & HTMLAttributes<HTMLDivElement>

export const ChateauComboPlayerPanel: FC<ChateauComboPlayerPanelProps> = (props) => {


  const { player, ...rest } = props
  const players = usePlayers({ sortFromMe: true })
  const rules = useRules<ChateauComboRules>()!
  const state = useMemo(() => new PlayerBoardHelper(rules.game, player.id), [rules.game, player.id])  
  
  return (
    <>
    <PlayerPanel activeRing key={player.id} playerId={player.id} color={playerColorCode[player.id]} {...rest}>
        <div css={tokenQuantity}>
            <div css={keyQuantity}>
                <div>{state.keyQuantity} </div>
                <div css={tokenDiv(tokenImage(MaterialType.Key))}></div>
            </div>
            <div css={keyQuantity}>
                <div>{state.coinsQuantity} </div>
                <div css={tokenDiv(tokenImage(MaterialType.GoldCoin))}></div>
            </div>
        </div>
    </PlayerPanel>
 
    </>
  )
}

const tokenQuantity = css`
    color:black;
    position: relative;
    top:3.5em;
    left:1em;
    font-size:2em;
    display:flex;
    align-items:center;
    height:40%;
    width:100%;
`

const keyQuantity = css`
    font-size:2em;
    display:flex;
    align-items:center;
    height:100%;
    width:3em;

`

const tokenDiv = (image:string) => css`
    background-image: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
`

const tokenImage = (token:MaterialType):string => token === MaterialType.GoldCoin ? coinImage : keyImage