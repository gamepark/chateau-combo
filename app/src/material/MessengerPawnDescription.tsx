import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemContext, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import MessengerPawn from '../images/MessengerPawn.png'
import { SealMenuButton } from '../theme/SealMenuButton'
import { MessengerPawnHelp } from './help/MessengerPawnHelp'

class MessengerPawnDescription extends TokenDescription {
  width = 4
  height = 5
  borderRadius = 1 // for the drop area
  image = MessengerPawn
  transparency = true
  menuAlwaysVisible = true

  getFrontExtraCss() {
    return borderRadiusCss
  }

  help = MessengerPawnHelp

  canShortClick(move: MaterialMove) {
    return isMoveItemType(MaterialType.MessengerPawn)(move)
  }

  getItemMenu(item: MaterialItem, _context: ItemContext, legalMoves: MaterialMove[]) {
    const moveMessenger = legalMoves.find(m => isMoveItemType(MaterialType.MessengerPawn)(m))
    if (!moveMessenger) return
    const goesToCastle = item.location.id === Place.Village
    return <SealMenuButton move={moveMessenger} label={<Trans i18nKey={goesToCastle ? 'move.messenger.castle' : 'move.messenger.village'}/>} x={-1.5} y={4} labelPosition="right">
      <FontAwesomeIcon icon={goesToCastle ? faArrowUp : faArrowDown}/>
    </SealMenuButton>
  }
}

const borderRadiusCss = css`
  border-bottom-right-radius: 0.5em !important;
`

export const messengerPawnDescription = new MessengerPawnDescription()