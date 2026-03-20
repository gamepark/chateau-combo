import { css } from '@emotion/react'
import { ItemButtonProps, ItemMenuButton } from '@gamepark/react-game'
import { HTMLAttributes, ReactNode } from 'react'

type SealMenuButtonProps = ItemButtonProps & HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export const SealMenuButton = (props: SealMenuButtonProps) =>
  <ItemMenuButton css={sealBannerCss} {...props}/>

const sealBannerCss = css`
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #c0392b, #8e2020 70%);
  border: 0.12em solid rgba(0, 0, 0, 0.3);
  color: #F0E4C8;
  box-shadow:
    0 0.15em 0.4em rgba(0, 0, 0, 1),
    0 0.05em 0.15em rgba(0, 0, 0, 1),
    inset 0 0.06em 0.12em rgba(255, 200, 200, 0.3),
    inset 0 -0.06em 0.12em rgba(0, 0, 0, 0.3);
  font-size: 1em;
  transition: margin-top 0.15s;

  &:hover {
    margin-top: -0.15em;
  }

  > span {
    font-family: 'MedievalSharp', cursive;
    font-size: 0.85em;
    font-weight: 700;
    color: #3A2410;
    background: linear-gradient(180deg, #F0E4C8, #dcc898);
    border: 0.12em solid #D4A828;
    border-left: none;
    border-radius: 0 0.3em 0.3em 0;
    padding: 0.2em 0.6em 0.2em 0.8em;
    box-shadow: 0 0.15em 0.4em rgba(0, 0, 0, 1), 0 0.05em 0.15em rgba(0, 0, 0, 1);
    text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.4);
    letter-spacing: 0.03em;
    white-space: nowrap;
  }
`
