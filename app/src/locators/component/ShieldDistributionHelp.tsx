import { css } from '@emotion/react'
import { Shield } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import ShieldDistribution from '../../images/ShieldDistribution.jpg'
import { shieldImages } from '../../material/help/Images'

export const ShieldDistributionHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2 css={titleCss}>{t('help.shield-distribution')}</h2>
    <div css={infoBlockCss}>
      <Trans i18nKey="card.shield.help">
        <Picture css={mini} src={shieldImages[Shield.Nobility]}/>
        <Picture css={mini} src={shieldImages[Shield.Faith]}/>
        <Picture css={mini} src={shieldImages[Shield.Scholarship]}/>
        <Picture css={mini} src={shieldImages[Shield.Military]}/>
        <Picture css={mini} src={shieldImages[Shield.Craftsmanship]}/>
        <Picture css={mini} src={shieldImages[Shield.Peasantry]}/>
      </Trans>
    </div>
    <Picture css={imageCss} src={ShieldDistribution}/>
  </>
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

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

const imageCss = css`
  height: 20em;
  border-radius: 0.3em;
  box-shadow: 0 0.12em 0.5em rgba(0, 0, 0, 0.15);
`
