/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { keysMoney } from '@gamepark/chateau-combo/material/Key'
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
  const spendKey = useLegalMove((move) => isDeleteItemType(MaterialType.Key)(move) && move.itemIndex === itemIndex)
  return (
    <>
      <h2 css={titleCss}>{t('keys')}</h2>
      {!!spendKey && (
        <p>
          <PlayMoveButton move={spendKey} onPlay={closeDialog}>{t('move.spend-key')}</PlayMoveButton>
        </p>
      )}
      <p>
        <Trans defaults="keys.help" values={{ place: item.location!.id }}>
          <strong/>
        </Trans>
      </p>
      {location?.type === LocationType.PlayerKeyStock && (
        <p>
          <Trans defaults={itsMe ? 'keys.you' : 'keys.player'} values={{ player: name, keys: keysMoney.count(rules.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(item.location?.player)) }}/>
        </p>
      )}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`