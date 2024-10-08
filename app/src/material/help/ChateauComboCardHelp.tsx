/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { cardCharacteristics, CardPattern } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { Condition, ConditionType } from '@gamepark/chateau-combo/material/Condition'
import { ChooseBetween, Effect, EffectType } from '@gamepark/chateau-combo/material/Effect'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { Tableau } from '@gamepark/chateau-combo/material/Tableau'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import {
  MaterialHelpProps,
  Picture,
  PlayMoveButton,
  useGame,
  useLegalMove,
  useLegalMoves,
  usePlayerId,
  usePlayerName,
  useRules,
  useUndo
} from '@gamepark/react-game'
import { isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import { FC, ReactElement, useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { moveMessengerImages, shieldImages } from './Images'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const ChateauComboCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const game = rules.game
  const { item, itemIndex, closeDialog } = props
  const discardOneFromRiver = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard && game.rule?.id === RuleId.DiscardFromRiver && move.itemIndex === itemIndex)
  const discardRiver = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard && game.rule?.id === RuleId.KeyEffect && move.itemIndex === itemIndex)
  const isFlipped = !!item.location?.rotation
  const buy = useLegalMoves(move => !isFlipped && isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Tableau && !move.location.rotation)
  const takeFaceDown = useLegalMoves(move => isFlipped && isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Tableau && move.location.rotation)
  const [undo] = useUndo()
  const undoSelect = useCallback(() => {
    const selectedCard = rules.material(MaterialType.Card).selected(true)
    if (selectedCard.length) undo(move => isEqual(move, selectedCard.selectItem()))
    closeDialog()
  }, [undo])
  return (
    <>
      <h2 css={titleCss}>{isFlipped ? t('card.face-down') : t(`card.${item.id.front}`)}</h2>
      {!!discardOneFromRiver && (
        <p>
          <PlayMoveButton move={discardOneFromRiver} onPlay={closeDialog}>{t('move.discard')}</PlayMoveButton>
        </p>
      )}
      {!!discardRiver && (
        <p>
          <PlayMoveButton move={discardRiver} onPlay={closeDialog}>{t('move.discard.river', { place: discardRiver.location.id })}</PlayMoveButton>
        </p>
      )}
      {buy.length === 1 &&
        <p><PlayMoveButton move={buy[0]} onPlay={closeDialog}>{t('move.buy')}</PlayMoveButton></p>
      }
      {takeFaceDown.length === 1 &&
        <p><PlayMoveButton move={takeFaceDown[0]} onPlay={closeDialog}>{t('move.place-down')}</PlayMoveButton></p>
      }
      {(buy.length > 1 || takeFaceDown.length > 1) &&
        <p><PlayMoveButton move={rules.material(MaterialType.Card).index(itemIndex).selectItem()}
                           onPlay={undoSelect} local>{t('move.select')}</PlayMoveButton></p>
      }
      {!isFlipped && <VisibleCard {...props} />}
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
  const scoring = characteristic.scoring
  const tableau = playerId ? new Tableau(game, playerId) : undefined
  const costDiscount = item.location?.type === LocationType.River ? tableau?.getDiscount(item.id.back) : undefined
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
            {!!costDiscount && <span>
            <Trans defaults="card.cost.discount" values={{ discount: itemDiscounted }}>
              <strong/>
            </Trans>
            </span>}
          </p>
          <p css={flexRowCss}>
            <span>{t('card.shield', { shields: characteristic.shields.length })}</span>
            {characteristic.shields.map((shield, i) => (
              <Picture key={i} css={mini} src={shieldImages[shield]}/>
            ))}
            <PlayMoveButton move={displayLocationHelp({ type: LocationType.Shields })} local>{t('help.shield-distribution')}</PlayMoveButton>
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
        <EffectList i18nKey="card.effect" effects={effects} getDescription={getEffectDescription}/>
      )}
      {!!chooseBetween && (
        <EffectList i18nKey="card.effect.choice" effects={[chooseBetween.effect1, chooseBetween.effect2]} getDescription={getEffectDescription}/>
      )}
      {!!discounts.length && (
        <EffectList i18nKey="card.discount" effects={discounts} getDescription={getEffectDescription}/>
      )}
      {!!scoring && (
        <>
          <p css={underlineCss}>
            <Trans defaults="card.scoring">
              <strong/>
            </Trans>
          </p>
          <p css={listCss}>
            <Trans defaults="card.scoring.condition"
                   values={{ score: scoring.score }}
                   components={{ condition: <ConditionDetail condition={scoring.condition}/> }}/>
          </p>
        </>
      )}
    </>

  )
}

const EffectList: FC<{ i18nKey: string, effects: Effect[], getDescription: (effect: Effect) => any }> = (props) => {
  const { i18nKey, effects, getDescription } = props
  return (
    <>
      <p css={underlineCss}>
        <Trans defaults={i18nKey} values={{ effects: effects.length }}>
          <strong/>
        </Trans>
      </p>
      {effects.length === 1 && (
        <p css={listCss}>
          {getDescription(effects[0])}
        </p>
      )}
      {effects.length > 1 && (
        <ul css={listCss}>
          {effects.map((effect, i) => (
            <li key={i}>
              {getDescription(effect)}
            </li>
          ))}
        </ul>
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
    <p>
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
        location.rotation ?
          <Trans defaults="card.river.face-down"><strong/></Trans>
          : <Trans defaults="card.river"><strong/></Trans>
      )}
      {location?.type === LocationType.Tableau && <>
        <Trans defaults={itsMine ? 'card.tableau.you' : 'card.tableau.player'} values={{ player: name }}>
          <strong/>
        </Trans>
        {location.rotation && (
          <>
            <br/>
            <Trans defaults="card.tableau.face-down"/>
          </>
        )}
      </>}
    </p>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`

const flexRowCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0.3em;
  margin-bottom: 0.5em;
`

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

const getEffectDescription = (effect: Effect): ReactElement => {
  switch (effect.type) {
    case EffectType.Discount: {
      if (effect.castle && effect.village) return <Trans defaults="card.discount.both"/>
      return <Trans defaults="card.discount.place" values={{ place: effect.village ? Place.Village : Place.Castle }}/>
    }
    case EffectType.GainKeys: {
      if (effect.opponentsGain && effect.gain) return <Trans defaults="card.effect.keys.all"/>
      if (effect.opponentsGain) return <Trans defaults="card.effect.keys.opponents"/>
      if (!effect.condition) return <Trans defaults="card.effect.keys" values={{ keys: effect.gain }}/>
      return (
        <Trans defaults="card.effect.keys.per"
               values={{ keys: effect.gain }}
               components={{ condition: <ConditionDetail condition={effect.condition}/> }}
        />
      )
    }
    case EffectType.GainGold : {
      if (effect.condition) return (
        <Trans defaults="card.effect.gold.per"
               values={{ gold: effect.gain }}
               components={{ condition: <ConditionDetail condition={effect.condition}/> }}
        />
      )
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
          <em/>
        </Trans>
      )
    }
    default:
      return <></>
  }
}

type ConditionDetailProps = {
  condition: Condition
}
const ConditionDetail: FC<ConditionDetailProps> = ({ condition }) => {
  switch (condition.type) {
    case ConditionType.PerMissingShieldType:
      return <Trans defaults="per.shield.diff.missing"><strong/></Trans>
    case ConditionType.PerShield: {
      let i18nKey = 'per.shield'
      if (condition.column) i18nKey = 'per.shield.column'
      if (condition.line) i18nKey = 'per.shield.line'
      if (condition.line && condition.column) i18nKey = 'per.shield.both'
      return (
        <Trans defaults={i18nKey}>
          <Picture css={mini} src={shieldImages[condition.shield]}/>
        </Trans>
      )
    }
    case ConditionType.PerDifferentShieldType: {
      let i18nKey = 'per.shield.diff'
      if (condition.column) i18nKey = 'per.shield.diff.column'
      if (condition.line) i18nKey = 'per.shield.diff.line'
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
          {condition.shields.map((shield) => (
            <Picture key={shield} css={mini} src={shieldImages[shield]}/>
          ))}
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
      if (condition.banners.length === 3) return <Trans defaults="per.place.village.3"/>
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
      if (isColumn(condition.position)) return <Trans defaults="if.position.column" values={{ column: condition.position[0].indexOf(X) + 1 }}/>
      return <Trans defaults="if.position.line" values={{ line: condition.position.findIndex(v => v[0]) + 1 }}/>
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
  margin-top: 0 !important;

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