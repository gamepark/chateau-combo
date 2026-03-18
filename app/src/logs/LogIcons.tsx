/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { FC } from 'react'
import GoldImg from '../images/tokens/Gold1.png'
import KeyImg from '../images/tokens/Key1.png'
import LockImg from '../images/icons/lock.png'

const iconCss = css`
  height: 1.4em;
  width: auto;
  vertical-align: -0.2em;
  margin: 0 0.1em;
`

export const GoldIcon: FC = () => <Picture src={GoldImg} css={iconCss}/>
export const KeyIcon: FC = () => <Picture src={KeyImg} css={iconCss}/>
export const LockIcon: FC = () => <Picture src={LockImg} css={iconCss}/>
