/** @jsxImportSource @emotion/react */
import { css, Interpolation } from '@emotion/react'
import { TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import messengerToken from '../images/messengerToken.png'

export class MessengerTokenDescription extends TokenDescription {
  height = 8.8
  ratio = 42 / 50
  image = messengerToken

  getFrontExtraCss() {
    return borderRadiusCss
  }
}

const borderRadiusCss = css`
  border-radius: 4em 3em 3em 1em;
`

export const messengerTokenDescription = new MessengerTokenDescription()