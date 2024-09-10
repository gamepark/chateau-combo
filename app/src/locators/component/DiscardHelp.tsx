/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
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
    <h2>{t('help.discard', { place: location.id })}</h2>
    <p>
      {t('help.discard.count', { number: cards?.length })}
    </p>
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

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.5em;
`