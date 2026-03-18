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
        <div css={actionsRowCss}>
          <PlayMoveButton move={moveMessenger} onPlay={closeDialog}>{t('move.move-messenger', { defaultValue: 'Move messenger', place: moveMessenger.location.id })}</PlayMoveButton>
        </div>
      )}
      <div css={infoBlockCss}>
        <Trans i18nKey="messenger.help" values={{ place: item.location!.id }}>
          <strong />
        </Trans>
      </div>
    </>
  )
}

const titleCss = css`
  font-family: 'MedievalSharp', cursive;
  color: #3A2410;
  text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.3);
  margin-bottom: 0.5em !important;
`

const actionsRowCss = css`
  display: flex;
  gap: 0.8em;
  flex-wrap: wrap;
  margin-bottom: 1em;
`

const infoBlockCss = css`
  color: #5C3A1E;
  font-size: 0.92em;
  line-height: 1.55;
  padding: 0.4em 0.7em;
  margin-bottom: 1em;
  background: linear-gradient(135deg, rgba(140, 110, 50, 0.07), rgba(140, 110, 50, 0.02));
  border-left: 0.25em solid #D4A828;
  border-radius: 0 0.3em 0.3em 0;
  box-shadow: 0 0.06em 0.18em rgba(0, 0, 0, 0.06);
`
