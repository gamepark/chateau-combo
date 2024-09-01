/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { pointerCursorCss, useAnimation, usePlay, useRules } from '@gamepark/react-game'
import { isMoveItemType, Location } from '@gamepark/rules-api'
import { FC, useCallback } from 'react'

export const CardRotateButton: FC<{ location: Location }> = ({ location }) => {
  const play = usePlay()
  const rules = useRules<ChateauComboRules>()!
  const card = rules.material(MaterialType.Card).index(location.parent!)
  const rotation = card.getItem()!.location.rotation
  const flip = useCallback(() => play(card.rotateItem(!rotation)), [rotation])
  const animation = useAnimation((animation) =>
    isMoveItemType(MaterialType.Card)(animation.move) && animation.move.itemIndex === location.parent)
  if (animation) return null
  return (
    <>
      <div css={[button]} onClick={flip}>
        <FontAwesomeIcon icon={faRotateRight} css={[pointerCursorCss, css`font-size: 1.2em`]}/>
      </div>
    </>


  )
}

const button = css`
  transition: transform 0.2s;
  height: 100%;
  width: 100%;
  //border: 0.1em solid white;
  cursor: pointer !important;
  &:active {
    filter: unset;
  }
  background-color: white;
  display: flex;
  color: black;
  align-items: center;
  justify-content: center;
  border-radius: 5em;
  filter: drop-shadow(0.05em 0.05em 0.05em black);
`