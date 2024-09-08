/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const MessengerPawnHelp: FC<MaterialHelpProps> = (props) => {
  const { item, closeDialog } = props
  const { t } = useTranslation()
  const moveMessenger = useLegalMove((move) => isMoveItemType(MaterialType.MessengerPawn)(move) && move.location.id !== item.location?.id)
  return (
    <>
      <h2 css={titleCss}>{t('messenger')}</h2>
      {!!moveMessenger && (
        <p>
          <PlayMoveButton move={moveMessenger} onPlay={closeDialog}>{t('move.move-messenger', { place: moveMessenger.location.id })}</PlayMoveButton>
        </p>
      )}
      <p>
        <Trans defaults="messenger.help" values={{ place: item.location!.id }}>
          <strong />
        </Trans>
      </p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`