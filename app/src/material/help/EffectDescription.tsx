import { css } from '@emotion/react'
import { Condition, ConditionType } from '@gamepark/chateau-combo/material/Condition'
import { Effect, EffectType } from '@gamepark/chateau-combo/material/Effect'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { Picture } from '@gamepark/react-game'
import { isEqual, uniq } from 'es-toolkit'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { shieldImages } from './Images'

type EffectDescriptionProps = {
  effect: Effect
  discarded?: boolean
}

export const EffectDescription: FC<EffectDescriptionProps> = ({ effect, discarded }) => {
  switch (effect.type) {
    case EffectType.Discount: {
      if (effect.castle && effect.village) return <Trans i18nKey="card.discount.both"/>
      return <Trans i18nKey="card.discount.place" values={{ place: effect.village ? Place.Village : Place.Castle }}/>
    }
    case EffectType.GainKeys: {
      if (effect.opponentsGain && effect.gain) return <Trans i18nKey="card.effect.keys.all"/>
      if (effect.opponentsGain) return <Trans i18nKey="card.effect.keys.opponents"/>
      if (!effect.condition) return <Trans i18nKey="card.effect.keys" values={{ keys: effect.gain }}/>
      return (
        <Trans i18nKey="card.effect.keys.per"
               values={{ keys: effect.gain }}
               components={{ condition: <ConditionDetail condition={effect.condition} discarded={discarded}/> }}
        />
      )
    }
    case EffectType.GainGold : {
      if (effect.condition) return (
        <Trans i18nKey="card.effect.gold.per"
               values={{ gold: effect.gain }}
               components={{ condition: <ConditionDetail condition={effect.condition} discarded={discarded}/> }}
        />
      )
      return <Trans i18nKey="card.effect.gold.opponents" values={{ gold: effect.opponentsGain }}/>
    }
    case EffectType.DiscardFromRiver: {
      if (effect.token === MaterialType.GoldCoin) return <Trans i18nKey="card.effect.discard.gold" values={{ place: effect.river }}/>
      return <Trans i18nKey="card.effect.discard.keys" values={{ place: effect.river }}/>
    }
    case EffectType.PutGoldOnCard: {
      if (effect.cardsLimit) return <Trans i18nKey="card.effect.purse.fill"/>
      return (
        <Trans i18nKey="card.effect.purse">
          <strong/>
          <em/>
        </Trans>
      )
    }
    case EffectType.DiscardEntireRiver:
      return <Trans i18nKey="card.effect.discard-entire-river"/>
    case EffectType.ActivateAdjacentAbility:
      return <Trans i18nKey="card.effect.activate-adjacent"/>
    default:
      return <></>
  }
}

type ConditionDetailProps = {
  condition: Condition
  discarded?: boolean
}
export const ConditionDetail: FC<ConditionDetailProps> = ({ condition, discarded }) => {
  switch (condition.type) {
    case ConditionType.PerMissingShieldType:
      return <Trans i18nKey="per.shield.diff.missing"><strong/></Trans>
    case ConditionType.PerShield: {
      let i18nKey = 'per.shield'
      if (condition.column) i18nKey = 'per.shield.column'
      if (condition.line) i18nKey = 'per.shield.line'
      if (condition.line && condition.column) i18nKey = 'per.shield.both'
      if (discarded && !condition.column && !condition.line) i18nKey = 'per.shield.discarded'
      return (
        <Trans i18nKey={i18nKey}>
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    }
    case ConditionType.PerDifferentShieldType: {
      let i18nKey = 'per.shield.diff'
      if (condition.column) i18nKey = 'per.shield.diff.column'
      if (condition.line) i18nKey = 'per.shield.diff.line'
      return (
        <Trans i18nKey={i18nKey}/>
      )
    }
    case ConditionType.IfShieldMissing: {
      return (
        <Trans i18nKey="if.shield.missing">
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    }
    case ConditionType.PerShieldsSet: {
      return (
        <Trans i18nKey={`per.shield.set.${condition.shields.length}`}>
          {condition.shields.map((shield) => (
            <Picture key={shield} css={mini} src={shieldImages[shield]}/>
          ))}
        </Trans>
      )
    }
    case ConditionType.PerIdenticalShieldsSet: {
      return (
        <Trans i18nKey="per.shield.set.same"/>
      )
    }
    case ConditionType.PerKey: {
      return (
        <Trans i18nKey="per.key"/>
      )
    }
    case ConditionType.PerBanner: {
      return (
        <Trans i18nKey={condition.banner === Place.Castle ? 'per.place.castle' : 'per.place.village'}/>
      )
    }
    case ConditionType.PerBannersSet: {
      if (condition.banners.length === 3) return <Trans i18nKey="per.place.village.3"/>
      return (
        <Trans i18nKey="per.place.set.both"/>
      )
    }
    case ConditionType.PerCardWithShieldCount: {
      return (
        <Trans i18nKey={`per.card.shield.${condition.count}`}/>
      )
    }
    case ConditionType.PerCardWithCost: {
      return (
        <Trans i18nKey={condition.orGreater ? 'per.cost.up' : 'per.cost'} values={{ cost: condition.cost }}/>
      )
    }
    case ConditionType.PerCardWithDiscount: {
      return (
        <Trans i18nKey={discarded ? 'per.discount.discarded' : 'per.discount'}/>
      )
    }
    case ConditionType.IfCardFlippedDown: {
      return (
        <Trans i18nKey="if.flipped"/>
      )
    }
    case ConditionType.PerCardWithPurse: {
      return (
        <Trans i18nKey={discarded ? 'per.card-with-purse.discarded' : 'per.card-with-purse'}/>
      )
    }
    case ConditionType.PerGoldInPurse: {
      return (
        <Trans i18nKey="per.purse" values={{ gold: condition.limit }}/>
      )
    }
    case ConditionType.PerGoldInAllPurses: {
      return (
        <Trans i18nKey="per.gold-on-purse"/>
      )
    }
    case ConditionType.PerFullPosition: {
      return (
        <Trans i18nKey="per.slot.full"/>
      )
    }
    case ConditionType.PerEmptyPosition: {
      return (
        <Trans i18nKey="per.slot.empty"/>
      )
    }
    case ConditionType.IfPosition: {
      if (isBorder(condition.position)) return <Trans i18nKey="if.position.border"/>
      if (isCorner(condition.position)) return <Trans i18nKey="if.position.corner"/>
      if (isColumn(condition.position)) return <Trans i18nKey="if.position.column" values={{ column: condition.position[0].indexOf(X) + 1 }}/>
      return <Trans i18nKey="if.position.line" values={{ line: condition.position.findIndex(v => v[0]) + 1 }}/>
    }
    case ConditionType.SumOfCostsInRow:
      return <Trans i18nKey="per.sum-costs.row"/>
    case ConditionType.SumOfCostsInColumn:
      return <Trans i18nKey="per.sum-costs.column"/>
    case ConditionType.BestNeighbor: {
      if (condition.condition.type === ConditionType.PerShield) {
        return (
          <Trans i18nKey="per.shield.neighbor">
            <Picture css={mini} src={shieldImages[condition.condition.shield]}/>
          </Trans>
        )
      }

      return (
        <Trans i18nKey="per.place.castle.neighbor"/>
      )
    }
    case ConditionType.PerDifferentCost:
      return <Trans i18nKey="per.different-cost"/>
    case ConditionType.IfNoDiscount:
      return <Trans i18nKey="if.no-discount"/>
    case ConditionType.IfNoPurse:
      return <Trans i18nKey="if.no-purse"/>
    case ConditionType.IfNoFaceDown:
      return <Trans i18nKey="if.no-face-down"/>
    case ConditionType.IfShieldInRow:
      return (
        <Trans i18nKey="if.shield.row">
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    case ConditionType.IfShieldInColumn:
      return (
        <Trans i18nKey="if.shield.column">
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    case ConditionType.PerLockCard:
      return <Trans i18nKey="per.lock-card"/>
  }
}

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

const X = true
const _ = false
const isBorder = (position: boolean[][]) => isEqual([
  [_, X, _],
  [X, _, X],
  [_, X, _]
], position)
const isCorner = (position: boolean[][]) => isEqual([
  [X, _, X],
  [_, _, _],
  [X, _, X]
], position)

const isColumn = (position: boolean[][]) => {
  const columns = position
    .flatMap((line) => line.map((v, columnIndex) => v === X ? columnIndex : -1))
    .filter((index) => index !== -1)

  return uniq(columns).length === 1
}
