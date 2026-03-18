/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { gold, goldDark } from './colors'

const curtainCloseCss = css`
  position: absolute;
  top: 0;
  right: 0.8em;
  z-index: 10;
  width: 2em;
  height: 2.75em;
  font-size: calc(3em * var(--gp-scale));
  background:
    radial-gradient(ellipse at 30% 0%, rgba(180, 50, 50, 0.15), transparent 60%),
    linear-gradient(180deg, #A83030 0%, #8B2020 40%, #7A1818 60%, #8B2020 80%, #6A1414 100%);
  clip-path: polygon(
    0% 0%, 100% 0%,
    100% 75%,
    85% 82%, 95% 90%, 75% 85%, 80% 95%, 60% 88%, 50% 100%,
    40% 88%, 20% 95%, 25% 85%, 5% 90%, 15% 82%, 0% 75%
  );
  border: none;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.6em;
  color: rgba(255, 200, 200, 0.6);
  text-shadow: 0 0.03em 0.06em rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.25em;
    background: linear-gradient(180deg, ${gold}, ${goldDark});
  }

  &:hover {
    color: rgba(255, 230, 230, 0.9);
    background:
      radial-gradient(ellipse at 30% 0%, rgba(200, 60, 60, 0.2), transparent 60%),
      linear-gradient(180deg, #B83838 0%, #9B2828 40%, #8A2020 60%, #9B2828 80%, #7A1A1A 100%);
  }
`

export const ParchmentCloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button css={curtainCloseCss} onClick={onClick}>
      &times;
    </button>
  )
}
