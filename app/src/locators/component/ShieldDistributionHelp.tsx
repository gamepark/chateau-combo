/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Shield } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import ShieldDistribution from '../../images/ShieldDistribution.jpg'
import { shieldImages } from '../../material/help/Images'

export const ShieldDistributionHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('help.shield-distribution')}</h2>
    <p>
      <Trans defaults="card.shield.help">
        <Picture css={mini} src={shieldImages[Shield.Nobility]}/>
        <Picture css={mini} src={shieldImages[Shield.Faith]}/>
        <Picture css={mini} src={shieldImages[Shield.Scholarship]}/>
        <Picture css={mini} src={shieldImages[Shield.Military]}/>
        <Picture css={mini} src={shieldImages[Shield.Craftsmanship]}/>
        <Picture css={mini} src={shieldImages[Shield.Peasantry]}/>
      </Trans>
    </p>
    <Picture css={imageCss} src={ShieldDistribution}/>
  </>
}

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

const imageCss = css`
  height: 20em;
`