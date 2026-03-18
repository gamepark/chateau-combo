/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogNavigationProps } from '@gamepark/react-game'
import { FC } from 'react'
import { brown, brownDark, brownLight, gold } from './colors'

export const ParchmentNavigation: FC<DialogNavigationProps> = ({ onPrevious, onNext, currentIndex, total }) => {
  return (
    <div css={navBarCss}>
      <button css={navBtnCss} onClick={onPrevious} disabled={!onPrevious}>
        <FontAwesomeIcon icon={faChevronLeft}/>
      </button>
      <div css={navCounterCss}>
        <div css={navDotsCss}>
          {Array.from({ length: Math.min(total, 8) }, (_, i) => (
            <div key={i} css={[navDotCss, i === Math.min(currentIndex, 7) && navDotActiveCss]}/>
          ))}
        </div>
        <span>{currentIndex + 1} / {total}</span>
      </div>
      <button css={navBtnCss} onClick={onNext} disabled={!onNext}>
        <FontAwesomeIcon icon={faChevronRight}/>
      </button>
    </div>
  )
}

const navBarCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.4em;
  padding: 0.3em 0.8em;
  border-top: 0.05em solid rgba(140, 110, 50, 0.2);
  background: linear-gradient(to top, rgba(140, 110, 50, 0.06), transparent);
`

const navBtnCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  font-size: 0.7em;
  font-family: inherit;
  color: ${brown};
  background: rgba(140, 110, 50, 0.1);
  border: 0.07em solid rgba(140, 110, 50, 0.25);
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: rgba(140, 110, 50, 0.2);
    border-color: ${gold};
    color: ${brownDark};
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }
`

const navCounterCss = css`
  font-size: 0.65em;
  color: ${brownLight};
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: 600;
  font-family: 'Lilita One', cursive;
`

const navDotsCss = css`
  display: flex;
  gap: 0.3em;
`

const navDotCss = css`
  width: 0.35em;
  height: 0.35em;
  border-radius: 50%;
  background: rgba(140, 110, 50, 0.25);
  transition: all 0.2s;
`

const navDotActiveCss = css`
  background: ${gold};
  width: 1em;
  border-radius: 0.2em;
`
