/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import MessengerPawn from '../images/MessengerPawn.png'
import { MessengerPawnHelp } from './help/MessengerPawnHelp'

class MessengerPawnDescription extends TokenDescription {
  width = 4
  height = 5
  borderRadius = 1 // for the drop area
  image = MessengerPawn

  getFrontExtraCss() {
    return borderRadiusCss
  }

  help = MessengerPawnHelp

  canShortClick(move: MaterialMove) {
    return isMoveItemType(MaterialType.MessengerPawn)(move)
  }
}

const borderRadiusCss = css`
  border-bottom-right-radius: 0.5em !important;
`

export const messengerPawnDescription = new MessengerPawnDescription()