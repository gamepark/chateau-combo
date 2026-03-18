import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { keys } from '@gamepark/chateau-combo/material/Key'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialHelpProps, PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const KeyHelp: FC<MaterialHelpProps> = (props) => {
  const rules = useRules<ChateauComboRules>()!
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const { location } = item
  const playerId = usePlayerId()
  const itsMe = playerId === item.location?.player
  const name = usePlayerName(item.location?.player)
  const isPlayerStock = location?.type === LocationType.PlayerKeyStock
  const spendKey = useLegalMove((move) => isDeleteItemType(MaterialType.Key)(move) && move.itemIndex === itemIndex)
  return (
    <>
      <h2 css={titleCss}>{t('keys')}</h2>
      {isPlayerStock && !!spendKey && (
        <div css={actionsRowCss}>
          <PlayMoveButton move={spendKey} onPlay={closeDialog}>{t('move.spend-key', 'Spend this key')}</PlayMoveButton>
        </div>
      )}
      <div css={infoBlockCss}>
        <Trans i18nKey="keys.help" values={{ place: item.location!.id }}>
          <strong/>
        </Trans>
      </div>
      {location?.type === LocationType.PlayerKeyStock && (
        <p css={locationLineCss}>
          <Trans i18nKey={itsMe ? 'keys.you' : 'keys.player'}
                 values={{
                   player: name,
                   keys: rules.material(MaterialType.Key).money(keys).location(LocationType.PlayerKeyStock).player(item.location?.player).count
                 }}/>
        </p>
      )}
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

const locationLineCss = css`
  font-size: 0.82em;
  color: #8B6B4A;
  font-style: italic;
  margin-top: auto;
  padding-top: 0.5em;
  border-top: 0.06em dashed rgba(140, 110, 50, 0.25);
`
