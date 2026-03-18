/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayMoveButton, PlayMoveButtonProps } from '@gamepark/react-game'
import { FC } from 'react'
import { gold } from './colors'

export const WaxSealButton: FC<PlayMoveButtonProps> = (props) => {
  return (
    <PlayMoveButton css={[wrapperCss, props.auto && autoWrapperCss]} {...props}>
      {props.children}
      <span css={sealCss}/>
    </PlayMoveButton>
  )
}

const wrapperCss = css`
  padding-right: 1.2em;
`

const autoWrapperCss = css`
  padding-right: 2.5em;

  &::after {
    right: 0.8em;
    top: 0.1em;
  }
`

const sealCss = css`
  position: absolute;
  right: -0.4em;
  top: 50%;
  transform: translateY(-50%);
  width: 1em;
  height: 1em;
  background: radial-gradient(circle at 40% 35%, #c43a3a 0%, #8B2A40 50%, #5C1A2A 100%);
  border-radius: 50%;
  border: 0.12em solid ${gold};
  box-shadow: 0 0.12em 0.25em rgba(0,0,0,0.5), inset 0 -0.06em 0.12em rgba(0,0,0,0.3);
  pointer-events: none;

  button:disabled > & {
    background: radial-gradient(circle at 40% 35%, #807070 0%, #605050 100%);
    border-color: #888070;
    box-shadow: none;
  }
`
