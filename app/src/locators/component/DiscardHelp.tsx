import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'

const displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const DiscardHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const cards = useRules<ChateauComboRules>()?.material(MaterialType.Card).location(location.type).locationId(location.id)
    .sort(item => -item.location.x!)
  const play = usePlay()
  return <>
    <h2 css={titleCss}>{t('help.discard', { place: location.id })}</h2>
    <div css={infoBlockCss}>
      {t('help.discard.count', { number: cards?.length })}
    </div>
    <ol css={grid}>
      {cards?.entries.map(([index, card]) =>
        <li key={index}>
          <MaterialComponent
            type={MaterialType.Card}
            itemId={card.id}
            css={pointerCursorCss}
            onClick={() => play(displayMaterialHelp(MaterialType.Card, card, index), { local: true })}
          />
        </li>
      )}
    </ol>
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

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.5em;
`
