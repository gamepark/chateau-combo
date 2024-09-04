/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { cardCharacteristics, CardPattern, Shield } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { Condition, ConditionType } from '@gamepark/chateau-combo/material/Condition'
import { ChooseBetween, Effect, EffectType } from '@gamepark/chateau-combo/material/Effect'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { Tableau } from '@gamepark/chateau-combo/material/Tableau'
import { MaterialHelpProps, Picture, useGame, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import { FC, Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import CraftManIcon from '../../images/icons/craftman.png'
import Faith from '../../images/icons/faith.png'
import MessengerCastle from '../../images/icons/messenger-castle.png'
import MessengerVillage from '../../images/icons/messenger-village.png'
import Military from '../../images/icons/military.png'


import NobilityIcon from '../../images/icons/nobility.png'
import PeasantryIcon from '../../images/icons/peasantry.png'
import Scholarship from '../../images/icons/scholarship.png'

export const ChateauComboCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  console.log(item)
  return (
    <>
      <h2 css={titleCss}>{t(item.id.front !== undefined ? `card.${item.id.front}` : `place.${item.id.back}`)}</h2>
      <VisibleCard {...props} />
      <CardLocation {...props} />
    </>
  )
}

const VisibleCard: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const playerId = usePlayerId()
  const game = useGame<MaterialGame>()!
  if (!item.id.front) return null
  const characteristic: CardPattern = cardCharacteristics[item.id.front]
  const effects = characteristic.effects.filter((e) => e.type !== EffectType.ChooseBetween && e.type !== EffectType.Discount)
  const chooseBetween: ChooseBetween | undefined = characteristic.effects.find((e) => e.type === EffectType.ChooseBetween) as ChooseBetween | undefined
  const discounts = characteristic.effects.filter((e) => e.type === EffectType.Discount)
  const tableau = playerId? new Tableau(game, playerId): undefined
  const costDiscount = item.location?.type === LocationType.River? tableau?.getDiscount(item.id.back): undefined
  console.log(costDiscount, tableau)
  const itemDiscounted = Math.max(0, characteristic.cost - (costDiscount ?? 0))
  return (
    <>
      {!!characteristic.shields?.length && (
        <>
          <p>
            <span>
            <Trans defaults="card.cost" values={{ cost: characteristic.cost }}>
              <strong/>
            </Trans>
            </span>&nbsp;
            {costDiscount !== undefined && <span>
            <Trans defaults="card.cost.discount" values={{ discount: itemDiscounted }}>
              <strong/>
            </Trans>
            </span>}
          </p>
          <p css={flexRowCss}>
            <span>{t('card.shield')}</span>
            {characteristic.shields.map((shield, i) => (
              <Picture key={i} css={mini} src={shieldImages[shield]}/>
            ))}
          </p>
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
        </>
      )}
      {characteristic.moveMessenger && (
        <p>
          <Trans defaults="card.messenger" values={{ place: item.id.back === Place.Village ? Place.Castle : Place.Village }}>
            <Picture css={mini} src={moveMessengerImages[item.id.back === Place.Village ? Place.Castle : Place.Village]}/>
          </Trans>
        </p>
      )}
      {!!effects.length && (
        <>
          <p css={underlineCss}>
            <Trans defaults="card.effect" values={{ effects: effects.length }}>
              <strong/>
            </Trans>
          </p>
          <ul css={listCss}>
          {effects.map((effect, i) => (
            <li key={i}>
              {getEffectDescription(effect)}
            </li>
          ))}
          </ul>
        </>
      )}
      {!!chooseBetween && (
        <>
          <p css={underlineCss}>
            <Trans defaults="card.effect.choice" values={{ effects: effects.length }}>
              <strong/>
            </Trans>
          </p>
          <ul css={listCss}>
            <li>{getEffectDescription(chooseBetween.effect1)}</li>
            <li>{getEffectDescription(chooseBetween.effect2)}</li>
          </ul>
        </>
      )}
      {!!discounts.length && (
        <>
          <p css={underlineCss}>
            <Trans defaults="card.discount">
              <strong/>
            </Trans>
          </p>
          <ul css={listCss}>
            {discounts.map((effect, i) => (
              <li key={i}>
                {getEffectDescription(effect)}
              </li>
            ))}
          </ul>
        </>
      )}
    </>

  )
}

const CardLocation: FC<MaterialHelpProps> = (props) => {
  const { item: { location } } = props
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const itsMine = player && player === location?.player
  const name = usePlayerName(location?.player)

  return (
    <>
      {location?.type === LocationType.Deck && (
        <Trans defaults="card.deck" values={{
          number: rules.material(MaterialType.Card).location(LocationType.Deck).locationId(location.id).length,
          place: location.id
        }}>
          <strong/>
        </Trans>
      )}
      {location?.type === LocationType.Discard && (
        <Trans defaults="card.discard" values={{
          number: rules.material(MaterialType.Card).location(LocationType.Discard).locationId(location.id).length,
          place: location.id
        }}>
          <strong/>
        </Trans>
      )}
      {location?.type === LocationType.River && (
        <Trans defaults="card.river">
          <strong/>
        </Trans>
      )}
      {location?.type === LocationType.PlayerBoard && (
        <Trans defaults={itsMine ? 'card.tableau.you' : 'card.tableau.player'} values={{ player: name }}>
          <strong/>
        </Trans>
      )}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`

const flexRowCss = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 0.3em;
  margin-bottom: 0.5em;
`

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

const shieldImages: Record<Shield, string> = {
  [Shield.Nobility]: NobilityIcon,
  [Shield.Craftsmanship]: CraftManIcon,
  [Shield.Peasantry]: PeasantryIcon,
  [Shield.Faith]: Faith,
  [Shield.Military]: Military,
  [Shield.Scholarship]: Scholarship
}

const moveMessengerImages: Record<Place, string> = {
  [Place.Village]: MessengerVillage,
  [Place.Castle]: MessengerCastle
}

const getEffectDescription = (effect: Effect) => {
  switch (effect.type) {
    case EffectType.Discount: {
      if (effect.castle && effect.village) return <Trans defaults="card.discount.both"/>
      return <Trans defaults="card.discount.place" values={{ place: effect.village ? Place.Village : Place.Castle }}/>
    }
    case EffectType.GainKeys: {
      if (effect.opponentsGain && effect.gain) return <Trans defaults="card.effect.keys.all" />
      if (effect.opponentsGain) return <Trans defaults="card.effect.keys.opponents" />
      if (!effect.condition) return <Trans defaults="card.effect.keys" values={{ keys: effect.gain }}/>
      return <Trans defaults="card.effect.keys.per" values={{ keys: effect.gain, condition: getConditionText(effect.condition) }}/>
    }
    case EffectType.GainGold : {
      if (effect.condition) return <Trans defaults="card.effect.gold.per" values={{ gold: effect.gain, condition: getConditionText(effect.condition) }}/>
      return <Trans defaults="card.effect.gold.opponents" values={{ gold: effect.opponentsGain }}/>
    }
    case EffectType.DiscardFromRiver: {
      if (effect.token === MaterialType.GoldCoin) return <Trans defaults="card.effect.discard.gold" values={{ place: effect.river }}/>
      return <Trans defaults="card.effect.discard.keys" values={{ place: effect.river }}/>
    }
    case EffectType.PutGoldOnCard: {
      if (effect.cardsLimit) return <Trans defaults="card.effect.purse.fill"/>
      return (
        <Trans defaults="card.effect.purse">
          <strong/>
          <em />
        </Trans>
      )
    }
    default:
      return ''
  }
}

const getConditionText = (condition: Condition) => {
  switch (condition.type) {
    case ConditionType.PerMissingShieldType:
      return <Trans defaults="per.shield.diff.missing"><strong/></Trans>
    case ConditionType.PerShield: {
      let i18nKey = 'per.shield'
      if (condition.line && condition.column) i18nKey = 'per.shield.both'
      if (condition.column) i18nKey = 'per.shield.column'
      if (condition.line) i18nKey = 'per.shield.line'
      return (
        <Trans defaults={i18nKey}>
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    }
    case ConditionType.PerDifferentShieldType: {
      let i18nKey = 'per.shield.diff.line'
      if (condition.line && condition.column) i18nKey = 'per.shield.diff'
      if (condition.column) i18nKey = 'per.shield.diff.column'
      return (
        <Trans defaults={i18nKey}/>
      )
    }
    case ConditionType.IfShieldMissing: {
      return (
        <Trans defaults="if.shield.missing">
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    }
    case ConditionType.PerShieldsSet: {
      return (
        <Trans defaults={`per.shield.set.${condition.shields.length}`}>
          <p css={flexRowCss}>
            {condition.shields.map((shield) => (
              <Picture css={mini} src={shieldImages[shield]}/>
            ))}
          </p>
        </Trans>
      )
    }
    case ConditionType.PerIdenticalShieldsSet: {
      return (
        <Trans defaults="per.shield.set.same"/>
      )
    }
    case ConditionType.PerKey: {
      return (
        <Trans defaults="per.key"/>
      )
    }
    case ConditionType.PerBanner: {
      return (
        <Trans defaults={condition.banner === Place.Castle ? 'per.place.castle' : 'per.place.village'}/>
      )
    }
    case ConditionType.PerBannersSet: {
      return (
        <Trans defaults="per.place.set.both"/>
      )
    }
    case ConditionType.PerCardWithShieldCount: {
      return (
        <Trans defaults={`per.card.shield.${condition.count}`}/>
      )
    }
    case ConditionType.PerCardWithCost: {
      return (
        <Trans defaults={condition.orGreater ? 'per.cost.up' : 'per.cost'} values={{ cost: condition.cost }}/>
      )
    }
    case ConditionType.PerCardWithDiscount: {
      return (
        <Trans defaults="per.discount"/>
      )
    }
    case ConditionType.IfCardFlippedDown: {
      return (
        <Trans defaults="if.flipped"/>
      )
    }
    case ConditionType.PerCardWithPurse: {
      return (
        <Trans defaults="per.card-with-purse"/>
      )
    }
    case ConditionType.PerGoldInPurse: {
      return (
        <Trans defaults="per.purse" values={{ gold: condition.limit }}/>
      )
    }
    case ConditionType.PerGoldInAllPurses: {
      return (
        <Trans defaults="per.gold-on-purse"/>
      )
    }
    case ConditionType.PerFullPosition: {
      return (
        <Trans defaults="per.slot.full"/>
      )
    }
    case ConditionType.PerEmptyPosition: {
      return (
        <Trans defaults="per.slot.empty"/>
      )
    }
    case ConditionType.IfPosition: {
      if (isBorder(condition.position)) return <Trans defaults="if.position.border"/>
      if (isCorner(condition.position)) return <Trans defaults="if.position.corner"/>
      if (isColumn(condition.position)) return <Trans defaults="if.position.column"/>
      return <Trans defaults="if.position.line"/>
    }
    case ConditionType.BestNeighbor: {
      if (condition.condition.type === ConditionType.PerShield) {
        return (
          <Trans defaults="per.shield.neighbor">
            <Picture css={mini} src={shieldImages[condition.condition.shield]}/>
          </Trans>
        )
      }

      return (
        <Trans defaults="per.place.castle.neighbor"/>
      )
    }
  }
}

const underlineCss = css`
  text-decoration: underline;
  margin-bottom: 0.7em !important;
`

const listCss = css`
  margin-top: 0em !important;
  > li {
    margin-bottom: 0.5em;
  }
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