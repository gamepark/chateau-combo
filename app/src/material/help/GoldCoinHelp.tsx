/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { coins } from '@gamepark/chateau-combo/material/Coin'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { MaterialHelpProps, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const GoldCoinHelp: FC<MaterialHelpProps> = (props) => {
  const rules = useRules<ChateauComboRules>()!
  const { item } = props
  const { t } = useTranslation()
  const { location } = item
  const playerId = usePlayerId()
  const itsMe = playerId === item.location?.player
  const name = usePlayerName(item.location?.player)
  return (
    <>
      <h2 css={titleCss}>{t('gold')}</h2>
      <p>
        <Trans defaults="gold.help" values={{ place: item.location!.id }}>
          <strong/>
        </Trans>
      </p>
      {location?.type === LocationType.PlayerGoldStock && (
        <p>
          <Trans defaults={itsMe ? 'gold.you' : 'gold.player'}
                 values={{
                   player: name,
                   gold: rules.material(MaterialType.GoldCoin).money(coins).location(LocationType.PlayerGoldStock).player(item.location?.player).count
                 }}/>
        </p>
      )}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`