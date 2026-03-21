import { cards, getCardPlace } from '@gamepark/chateau-combo/material/Card'
import { cardCharacteristics, Shield } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { ConditionType } from '@gamepark/chateau-combo/material/Condition'
import { EffectType } from '@gamepark/chateau-combo/material/Effect'

const effectNames: Partial<Record<EffectType, string>> = {
  [EffectType.Discount]: 'Discount',
  [EffectType.GainGold]: 'Gain Gold',
  [EffectType.GainKeys]: 'Gain Keys',
  [EffectType.DiscardFromRiver]: 'Discard River',
  [EffectType.ChooseBetween]: 'Choose Between',
  [EffectType.PutGoldOnCard]: 'Put Gold',
  [EffectType.DiscardEntireRiver]: 'Discard Entire River',
  [EffectType.ActivateAdjacentAbility]: 'Activate Adjacent'
}
import { Place } from '@gamepark/chateau-combo/material/Place'
import { css } from '@emotion/react'
import { FC, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { getEffectDescription, getLockEffects } from '../material/help/ChateauComboCardHelp'

const shieldNames: Record<Shield, string> = {
  [Shield.Nobility]: 'Nobility',
  [Shield.Faith]: 'Faith',
  [Shield.Scholarship]: 'Scholarship',
  [Shield.Military]: 'Military',
  [Shield.Craftsmanship]: 'Craftsmanship',
  [Shield.Peasantry]: 'Peasantry'
}

const conditionNames: Record<ConditionType, string> = {
  [ConditionType.PerShield]: 'Per Shield',
  [ConditionType.PerDifferentShieldType]: 'Per Diff Shield',
  [ConditionType.PerMissingShieldType]: 'Per Missing Shield',
  [ConditionType.IfShieldMissing]: 'If Shield Missing',
  [ConditionType.PerShieldsSet]: 'Per Shields Set',
  [ConditionType.PerIdenticalShieldsSet]: 'Per Identical Set',
  [ConditionType.PerKey]: 'Per Key',
  [ConditionType.PerBanner]: 'Per Banner',
  [ConditionType.PerBannersSet]: 'Per Banners Set',
  [ConditionType.PerCardWithShieldCount]: 'Per Card Shield Count',
  [ConditionType.PerCardWithCost]: 'Per Card Cost',
  [ConditionType.PerCardWithDiscount]: 'Per Card Discount',
  [ConditionType.IfCardFlippedDown]: 'If Flipped Down',
  [ConditionType.PerCardWithPurse]: 'Per Card Purse',
  [ConditionType.PerGoldInPurse]: 'Per Gold In Purse',
  [ConditionType.PerGoldInAllPurses]: 'Per Gold All Purses',
  [ConditionType.PerFullPosition]: 'Per Full Position',
  [ConditionType.PerEmptyPosition]: 'Per Empty Position',
  [ConditionType.IfPosition]: 'If Position',
  [ConditionType.BestNeighbor]: 'Best Neighbor',
  [ConditionType.PerDifferentCost]: 'Per Different Cost',
  [ConditionType.SumOfCostsInRow]: 'Sum Costs Row',
  [ConditionType.SumOfCostsInColumn]: 'Sum Costs Column',
  [ConditionType.IfNoDiscount]: 'If No Discount',
  [ConditionType.IfNoPurse]: 'If No Purse',
  [ConditionType.IfNoFaceDown]: 'If No Face Down',
  [ConditionType.IfShieldInRow]: 'If Shield In Row',
  [ConditionType.IfShieldInColumn]: 'If Shield In Column',
  [ConditionType.PerLockCard]: 'Per Lock Card'
}

export const CardDebugViewer: FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(!!onClose)
  const [placeFilter, setPlaceFilter] = useState<Place | 0>(0)
  const [shieldFilter, setShieldFilter] = useState<Shield | 0>(0)
  const [effectFilter, setEffectFilter] = useState<EffectType | -1>(-1)
  const [conditionFilter, setConditionFilter] = useState<ConditionType | -1>(-1)
  const [costFilter, setCostFilter] = useState<number | -1>(-1)
  const [extensionFilter, setExtensionFilter] = useState<boolean | null>(null)
  const [search, setSearch] = useState('')

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const chars = cardCharacteristics[card]
      const place = getCardPlace(card)
      if (placeFilter && place !== placeFilter) return false
      if (shieldFilter && !chars.shields.includes(shieldFilter)) return false
      if (effectFilter !== -1 && !chars.effects.some(e => e.type === effectFilter)) return false
      if (conditionFilter !== -1 && chars.scoring.condition.type !== conditionFilter) return false
      if (costFilter !== -1 && chars.cost !== costFilter) return false
      if (extensionFilter === true && !chars.outOfTheOubliette) return false
      if (extensionFilter === false && chars.outOfTheOubliette) return false
      if (search) {
        const name = t(`card.${card}`).toLowerCase()
        if (!name.includes(search.toLowerCase())) return false
      }
      return true
    })
  }, [placeFilter, shieldFilter, effectFilter, conditionFilter, costFilter, extensionFilter, search, t])

  const allCosts = useMemo(() => [...new Set(cards.map(c => cardCharacteristics[c].cost))].sort((a, b) => a - b), [])

  const handleClose = () => {
    if (onClose) onClose()
    else setOpen(false)
  }

  if (!open) {
    return createPortal(
      <button onClick={() => setOpen(true)} css={floatingButtonCss}>
        Cards ({cards.length})
      </button>,
      document.body
    )
  }

  return createPortal(
    <div css={overlayCss} onClick={handleClose}>
      <div css={panelCss} onClick={e => e.stopPropagation()}>
        <div css={stickyTopCss}>
        <div css={headerCss}>
          <h2 css={titleCss}>All Cards ({filteredCards.length}/{cards.length})</h2>
          <button onClick={handleClose} css={closeBtnCss}>&times;</button>
        </div>

        <div css={filtersCss}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            css={inputCss}
          />

          <select value={placeFilter} onChange={e => setPlaceFilter(Number(e.target.value) as Place | 0)} css={selectCss}>
            <option value={0}>All places</option>
            <option value={Place.Castle}>Castle</option>
            <option value={Place.Village}>Village</option>
          </select>

          <select value={shieldFilter} onChange={e => setShieldFilter(Number(e.target.value) as Shield | 0)} css={selectCss}>
            <option value={0}>All shields</option>
            {Object.entries(shieldNames).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <select value={effectFilter} onChange={e => setEffectFilter(Number(e.target.value))} css={selectCss}>
            <option value={-1}>All effects</option>
            {Object.entries(effectNames).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <select value={conditionFilter} onChange={e => setConditionFilter(Number(e.target.value))} css={selectCss}>
            <option value={-1}>All scoring</option>
            {Object.entries(conditionNames).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>

          <select value={costFilter} onChange={e => setCostFilter(Number(e.target.value))} css={selectCss}>
            <option value={-1}>All costs</option>
            {allCosts.map(c => <option key={c} value={c}>Cost {c}</option>)}
          </select>

          <select value={extensionFilter === null ? '' : extensionFilter ? '1' : '0'} onChange={e => setExtensionFilter(e.target.value === '' ? null : e.target.value === '1')} css={selectCss}>
            <option value="">Base + Extension</option>
            <option value="0">Base only</option>
            <option value="1">Extension only</option>
          </select>

          <button onClick={() => { setPlaceFilter(0); setShieldFilter(0); setEffectFilter(-1); setConditionFilter(-1); setCostFilter(-1); setExtensionFilter(null); setSearch('') }} css={resetBtnCss}>
            Reset
          </button>
        </div>
        </div>

        <div css={gridCss}>
          {filteredCards.map(card => {
            const chars = cardCharacteristics[card]
            const place = getCardPlace(card)
            const image = cardDescription.images[card]
            return (
              <div key={card} css={cardContainerCss}>
                {image && <img src={image} alt={t(`card.${card}`)} css={cardImgCss}/>}
                <div css={cardInfoCss}>
                  <div css={cardNameCss}>{t(`card.${card}`)}</div>
                  <div css={tagsCss}>
                    <span css={[tagCss, place === Place.Castle ? castleTagCss : villageTagCss]}>
                      {place === Place.Castle ? 'Castle' : 'Village'}
                    </span>
                    <span css={[tagCss, costTagCss]}>Cost {chars.cost}</span>
                    {chars.outOfTheOubliette && <span css={[tagCss, extTagCss]}>Ext</span>}
                    {chars.moveMessenger && <span css={[tagCss, messengerTagCss]}>Messenger</span>}
                  </div>
                  <div css={detailCss}>
                    Shields: {chars.shields.map(s => shieldNames[s]).join(', ') || 'none'}
                  </div>
                  <div css={detailCss}>
                    <span>Effects: </span>
                    {chars.effects.length === 0 && <span>none</span>}
                    {(chars.outOfTheOubliette ? getLockEffects(chars.effects) : chars.effects).map((e, i) => (
                      <div key={i} css={effectLineCss}>{getEffectDescription(e)}</div>
                    ))}
                  </div>
                  <div css={detailCss}>
                    Scoring: {chars.scoring.score}pt × {conditionNames[chars.scoring.condition.type]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

const floatingButtonCss = css`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 99999;
  background: #333;
  color: #fff;
  border: 1px solid #666;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  &:hover { background: #555; }
`

const overlayCss = css`
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.85);
  overflow: auto;
`

const panelCss = css`
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
`

const stickyTopCss = css`
  position: sticky;
  top: 0;
  background: #111;
  z-index: 1;
  padding: 16px 0;
`

const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const titleCss = css`
  color: #fff;
  margin: 0;
  font-size: 20px;
`

const closeBtnCss = css`
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  &:hover { color: #f66; }
`

const filtersCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`

const inputCss = css`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #222;
  color: #fff;
  font-size: 13px;
  width: 180px;
`

const selectCss = css`
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #222;
  color: #fff;
  font-size: 13px;
`

const resetBtnCss = css`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #666;
  background: #444;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  &:hover { background: #555; }
`

const gridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
`

const cardContainerCss = css`
  display: flex;
  gap: 10px;
  background: #1a1a2e;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #333;
`

const cardImgCss = css`
  width: 130px;
  height: auto;
  border-radius: 6px;
  object-fit: contain;
`

const cardInfoCss = css`
  flex: 1;
  min-width: 0;
`

const cardNameCss = css`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`

const tagsCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 4px;
`

const tagCss = css`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
`

const castleTagCss = css`
  background: #4a3728;
  color: #e8c070;
`

const villageTagCss = css`
  background: #283a28;
  color: #70e870;
`

const costTagCss = css`
  background: #3a3a28;
  color: #e8e870;
`

const extTagCss = css`
  background: #3a2840;
  color: #d070e8;
`

const messengerTagCss = css`
  background: #283040;
  color: #70a0e8;
`

const detailCss = css`
  color: #aaa;
  font-size: 13px;
  line-height: 1.5;
`

const effectLineCss = css`
  padding-left: 0.5em;
  &::before { content: '• '; }
`
