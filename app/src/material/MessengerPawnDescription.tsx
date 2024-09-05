/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TokenDescription } from '@gamepark/react-game'
import MessengerPawn from '../images/MessengerPawn.png'

class MessengerPawnDescription extends TokenDescription {
  width = 4
  height = 5
  borderRadius = 1 // for the drop area
  image = MessengerPawn

  getFrontExtraCss() {
    return borderRadiusCss
  }
}

const borderRadiusCss = css`
  border-bottom-right-radius: 0.5em !important;
`

export const messengerPawnDescription = new MessengerPawnDescription()