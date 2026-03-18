/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { PlayMoveButton, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder, MaterialRules } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const LogCardName: FC<{ card?: number }> = ({ card }) => {
  const { t } = useTranslation()
  const rules = useRules<MaterialRules>()
  if (card === undefined) return <span>???</span>

  const cardItem = rules?.material(MaterialType.Card)
    .id((id: any) => id?.front === card)

  if (cardItem?.length) {
    const item = cardItem.getItem()
    const index = cardItem.getIndex()
    return (
      <PlayMoveButton
        css={cardNameCss}
        move={MaterialMoveBuilder.displayMaterialHelp(MaterialType.Card, item, index)}
        local
      >
        {t(`card.${card}`)}
      </PlayMoveButton>
    )
  }

  return <span css={cardNameCss}>{t(`card.${card}`)}</span>
}

const cardNameCss = css`
  color: #7A5A10;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 0.06em dotted rgba(122, 90, 16, 0.4);

  &:hover {
    color: #3A2410;
    border-color: #3A2410;
  }
`
