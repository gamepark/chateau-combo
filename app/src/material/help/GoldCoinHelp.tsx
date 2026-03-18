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
      <div css={infoBlockCss}>
        <Trans i18nKey="gold.help" values={{ place: item.location!.id }}>
          <strong/>
        </Trans>
      </div>
      {location?.type === LocationType.PlayerGoldStock && (
        <p css={locationLineCss}>
          <Trans i18nKey={itsMe ? 'gold.you' : 'gold.player'}
                 values={{
                   player: name,
                   gold: rules.material(MaterialType.GoldCoin).money(coins).location(LocationType.PlayerGoldStock).player(item.location?.player).count
                 }}/>
        </p>
      )}
      {location?.type === LocationType.OnCard && (
        <p css={locationLineCss}>
          <Trans i18nKey={'gold.card'}
                 values={{
                   gold: rules.material(MaterialType.GoldCoin).money(coins).location(LocationType.OnCard).parent(item.location?.parent).count
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
