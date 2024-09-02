/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TokenDescription } from '@gamepark/react-game'
import messengerToken from '../images/messengerToken.png'

class MessengerTokenDescription extends TokenDescription {
  width = 4
  height = 5
  image = messengerToken

  getFrontExtraCss() {
    return borderRadiusCss
  }
}

const borderRadiusCss = css`
  border-radius: 2em 3em 1em 2em;
`

export const messengerTokenDescription = new MessengerTokenDescription()