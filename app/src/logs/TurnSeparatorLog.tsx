/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'

export const TurnSeparatorLog: FC<MaterialLogProps> = ({ move }) => {
  const player = usePlayerName((move as any).player)
  return (
    <div css={separatorCss}>
      <span css={lineCss}/>
      <span css={labelCss}>{player}</span>
      <span css={lineCss}/>
    </div>
  )
}

const separatorCss = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: 100%;
`

const lineCss = css`
  flex: 1;
  height: 0.12em;
  background: linear-gradient(90deg, transparent, rgba(212, 168, 40, 0.5), transparent);
`

const labelCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.7em;
  color: #8B6B4A;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
`
