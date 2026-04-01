import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { Card, isOutOfTheOubliette } from '@gamepark/chateau-combo/material/Card.ts'
import { cardCharacteristics, CardPattern } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { Condition, ConditionType } from '@gamepark/chateau-combo/material/Condition'
import { ChooseBetween, Effect, EffectType } from '@gamepark/chateau-combo/material/Effect'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { Tableau } from '@gamepark/chateau-combo/material/Tableau'
import { CustomMoveType } from '@gamepark/chateau-combo/rules/CustomMoveType'
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
import { isCustomMoveType, isMoveItemType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { isEqual, uniq } from 'es-toolkit'
import { FC, ReactElement, useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useOpenExtensionDialog } from '../../ExtensionContext'
import LockIcon from '../../images/icons/lock.png'
import VictoryPoints from '../../images/icons/VictoryPoints.png'
import Gold from '../../images/tokens/Gold1.png'
import { moveMessengerImages, shieldImages } from './Images'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const ChateauComboCardHelp = (props: MaterialHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const game = rules.game
  const { item, itemIndex, closeDialog } = props
  const discardOneFromRiver = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard && game.rule?.id === RuleId.DiscardFromRiver && move.itemIndex === itemIndex)
  const discardRiver = useLegalMove((move) => isCustomMoveType(CustomMoveType.ChooseRiver)(move) && move.data === item.location?.id)
  const activateLock = useLegalMove((move) => isCustomMoveType(CustomMoveType.ActivateLock)(move) && move.data === itemIndex)
  const activateAdjacent = useLegalMove((move) => isCustomMoveType(CustomMoveType.ActivateAdjacent)(move) && move.data === itemIndex)
  const isFlipped = item.id.front === undefined || !!item.location?.rotation
  const canRotate = useLegalMove((move) => isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.rotation)
  const buy = useLegalMoves(move => !isFlipped && isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Tableau && !move.location.rotation)
  const takeFaceDown = useLegalMoves(move => isFlipped && isMoveItemType(MaterialType.Card)(move) && move.itemIndex === itemIndex && move.location.type === LocationType.Tableau && move.location.rotation)
  const [undo] = useUndo()
  const rotateMove = canRotate ? rules.material(MaterialType.Card).index(itemIndex).rotateItem(!item.location?.rotation) : undefined
  const undoSelect = useCallback(() => {
    const selectedCard = rules.material(MaterialType.Card).selected(true)
    if (selectedCard.length) undo(move => isEqual(move, selectedCard.selectItem()))
    closeDialog()
  }, [closeDialog, rules, undo])
  const cardScore = (() => {
    if (!rules.isOver() || item.location?.type !== LocationType.Tableau || item.location.rotation) return undefined
    const tableau = new Tableau(rules.game, item.location.player!)
    return tableau.getCardScore(item.location.x! - tableau.xMin, item.location.y! - tableau.yMin)
  })()

  return (
    <>
      <h2 css={titleCss}>
        {isFlipped ? t('card.face-down') : t(`card.${item.id.front}`)}
      </h2>
      {!isFlipped && <VisibleCard {...props} cardScore={cardScore} actions={
        <div css={actionsRowCss}>
          {!!discardOneFromRiver &&
            <PlayMoveButton move={discardOneFromRiver} onPlay={closeDialog}>{t('move.discard')}</PlayMoveButton>
          }
          {!!discardRiver &&
            <PlayMoveButton move={discardRiver} onPlay={closeDialog}>{t('move.discard.river', { place: discardRiver.data })}</PlayMoveButton>
          }
          {!!activateLock &&
            <PlayMoveButton move={activateLock} onPlay={closeDialog}>{t('move.activate-lock')}</PlayMoveButton>
          }
          {!!activateAdjacent &&
            <PlayMoveButton move={activateAdjacent} onPlay={closeDialog}>{t('move.activate-adjacent')}</PlayMoveButton>
          }
          {buy.length === 1 &&
            <PlayMoveButton move={buy[0]} onPlay={closeDialog}>{t('move.buy')}</PlayMoveButton>
          }
          {takeFaceDown.length === 1 &&
            <PlayMoveButton move={takeFaceDown[0]} onPlay={closeDialog}>{t('move.place-down')}</PlayMoveButton>
          }
          {(buy.length > 1 || takeFaceDown.length > 1) &&
            <PlayMoveButton move={rules.material(MaterialType.Card).index(itemIndex).selectItem()}
                            onPlay={undoSelect} local>{t('move.select')}</PlayMoveButton>
          }
          {!!canRotate && rotateMove &&
            <PlayMoveButton move={rotateMove} onPlay={closeDialog} local>{t('move.rotate')}</PlayMoveButton>
          }
        </div>
      }/>}
      {isFlipped && <p>
        <PlayMoveButton move={displayLocationHelp({ type: LocationType.Shields })} local>{t('help.shield-distribution')}</PlayMoveButton>
      </p>}
      <CardLocation {...props} />
    </>
  )
}

const VisibleCard: FC<MaterialHelpProps & { actions?: ReactElement, cardScore?: number }> = (props) => {
  const { t } = useTranslation()
  const { item, actions, cardScore } = props
  const openExtensionDialog = useOpenExtensionDialog()
  const playerId = usePlayerId()
  const game = useGame<MaterialGame>()!
  if (!item.id.front) return null
  const characteristic: CardPattern = cardCharacteristics[item.id.front as Card]
  const effects = characteristic.effects.filter((e) => e.type !== EffectType.ChooseBetween && e.type !== EffectType.Discount)
  const chooseBetween: ChooseBetween | undefined = characteristic.effects.find((e) => e.type === EffectType.ChooseBetween) as ChooseBetween | undefined
  const discounts = characteristic.effects.filter((e) => e.type === EffectType.Discount)
  const scoring = characteristic.scoring
  const tableau = playerId ? new Tableau(game, playerId) : undefined
  const costDiscount = item.location?.type === LocationType.River ? tableau?.getDiscount(item.id.back) : undefined
  const itemDiscounted = Math.max(0, characteristic.cost - (costDiscount ?? 0))
  return (
    <>
      <div css={shieldsCostRowCss}>
        {!!characteristic.shields?.length && (
          <div css={shieldsGroupCss}>
            {characteristic.shields.map((shield, i) => (
              <Picture key={i} css={shieldIconCss} src={shieldImages[shield]}/>
            ))}
            <PlayMoveButton move={displayLocationHelp({ type: LocationType.Shields })} local>{t('help.shield-distribution')}</PlayMoveButton>
          </div>
        )}
        {cardScore !== undefined &&
          <div css={scoreDisplayCss}>
            <Picture src={VictoryPoints} css={scoreSealImgCss}/>
            <span css={scoreSealValueCss}>{cardScore}</span>
          </div>
        }
        <div css={costDisplayCss}>
          <strong>{characteristic.cost}</strong> <Picture css={coinIconCss} src={Gold}/>
          {!!costDiscount && <span css={discountCss}> → <strong>{itemDiscounted}</strong> <Picture css={coinIconCss} src={Gold}/></span>}
        </div>
      </div>

      {actions}

      {characteristic.moveMessenger && (
        <div css={messengerLineCss}>
          <span css={messengerArrowCss}>&#10140;</span>
          <Trans i18nKey="card.messenger" values={{ place: item.id.back === Place.Village ? Place.Castle : Place.Village }}>
            <Picture css={messengerIconCss} src={moveMessengerImages[item.id.back === Place.Village ? Place.Castle : Place.Village]}/>
          </Trans>
        </div>
      )}

      {!!effects.length && !isOutOfTheOubliette(item.id.front!) && (
        <EffectList i18nKey="card.effect" effects={effects} getDescription={getEffectDescription}/>
      )}
      {!!effects.length && isOutOfTheOubliette(item.id.front!) && (
        <>
          <div css={lockInfoCss}>
            <Picture src={LockIcon} css={lockIconCss}/>
            <span>
              <Trans i18nKey="card.lock.info"><strong/></Trans>
              {openExtensionDialog && (
                <button css={extensionLinkCss} onClick={openExtensionDialog}>
                  {t('extension.info')}
                </button>
              )}
            </span>
          </div>
          <EffectList i18nKey="card.lock" effects={getLockEffects(effects)} getDescription={getEffectDescription}/>
        </>
      )}
      {!!chooseBetween && (
        <EffectList i18nKey="card.effect.choice" effects={[chooseBetween.effect1, chooseBetween.effect2]} getDescription={getEffectDescription}/>
      )}
      {!!discounts.length && (
        <EffectList i18nKey="card.discount" effects={discounts} getDescription={getEffectDescription}/>
      )}

      {!!scoring && (
        <>
          <div css={sectionHeaderScoringCss}>
            <Trans i18nKey="card.scoring"><strong/></Trans>
            <span css={sectionLineScoringCss}/>
          </div>
          <div css={scoringBlockCss}>
            <Trans i18nKey="card.scoring.condition"
                   values={{ score: scoring.score }}
                   components={{ condition: <ConditionDetail condition={scoring.condition}/> }}/>
          </div>
        </>
      )}

    </>
  )
}

const EffectList: FC<{ i18nKey: string, effects: Effect[], getDescription: (effect: Effect) => any }> = (props) => {
  const { i18nKey, effects, getDescription } = props
  return (
    <>
      <div css={sectionHeaderCss}>
        <Trans i18nKey={i18nKey} values={{ effects: effects.length }}>
          <strong/>
        </Trans>
        <span css={sectionLineCss}/>
      </div>
      {effects.length === 1 && (
        <div css={effectBlockCss}>
          {getDescription(effects[0])}
        </div>
      )}
      {effects.length > 1 && (
        <div css={effectBlockCss}>
          <ul css={effectListCss}>
            {effects.map((effect, i) => (
              <li key={i}>
                {getDescription(effect)}
              </li>
            ))}
          </ul>
        </div>
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
    <p css={locationLineCss}>
      {location?.type === LocationType.Deck && (
        <Trans i18nKey="card.deck" values={{
          number: rules.material(MaterialType.Card).location(LocationType.Deck).locationId(location.id).length,
          place: location.id
        }}>
          <strong/>
        </Trans>
      )}
      {location?.type === LocationType.Discard && (
        <Trans i18nKey="card.discard" values={{
          number: rules.material(MaterialType.Card).location(LocationType.Discard).locationId(location.id).length,
          place: location.id
        }}>
          <strong/>
        </Trans>
      )}
      {location?.type === LocationType.River && (
        location.rotation ?
          <Trans i18nKey="card.river.face-down"><strong/></Trans>
          : <Trans i18nKey="card.river"><strong/></Trans>
      )}
      {location?.type === LocationType.Tableau && <>
        <Trans i18nKey={itsMine ? 'card.tableau.you' : 'card.tableau.player'} values={{ player: name }}>
          <strong/>
        </Trans>
        {location.rotation && (
          <>
            <br/>
            <Trans i18nKey="card.tableau.face-down"/>
          </>
        )}
      </>}
    </p>
  )
}

const titleCss = css`
  font-family: 'MedievalSharp', cursive;
  color: #3A2410;
  text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.3);
  margin: 0 0 0.15em 0 !important;
  padding: 0;
  text-align: left !important;
`

const scoreDisplayCss = css`
  position: relative;
  width: 2.2em;
  height: 2.1em;
  flex-shrink: 0;
`

const scoreSealImgCss = css`
  width: 100%;
  height: 100%;
`

const scoreSealValueCss = css`
  position: absolute;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'MedievalSharp', cursive;
  font-size: 1em;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.5);
`

const mini = css`
  height: 1.05em;
  margin-bottom: -0.17em;
`

export const getLockEffects = (effects: Effect[]): Effect[] => {
  const result: Effect[] = []
  for (const effect of effects) {
    if (effect.type === EffectType.DiscardEntireRiver) {
      result.push({ type: EffectType.DiscardEntireRiver })
      if (effect.bonus) result.push(effect.bonus)
    } else {
      result.push(effect)
    }
  }
  return result
}

export const getEffectDescription = (effect: Effect): ReactElement => {
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
               components={{ condition: <ConditionDetail condition={effect.condition}/> }}
        />
      )
    }
    case EffectType.GainGold : {
      if (effect.condition) return (
        <Trans i18nKey="card.effect.gold.per"
               values={{ gold: effect.gain }}
               components={{ condition: <ConditionDetail condition={effect.condition}/> }}
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
}
const ConditionDetail: FC<ConditionDetailProps> = ({ condition }) => {
  switch (condition.type) {
    case ConditionType.PerMissingShieldType:
      return <Trans i18nKey="per.shield.diff.missing"><strong/></Trans>
    case ConditionType.PerShield: {
      let i18nKey = 'per.shield'
      if (condition.column) i18nKey = 'per.shield.column'
      if (condition.line) i18nKey = 'per.shield.line'
      if (condition.line && condition.column) i18nKey = 'per.shield.both'
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
        <Trans i18nKey="per.discount"/>
      )
    }
    case ConditionType.IfCardFlippedDown: {
      return (
        <Trans i18nKey="if.flipped"/>
      )
    }
    case ConditionType.PerCardWithPurse: {
      return (
        <Trans i18nKey="per.card-with-purse"/>
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

const locationLineCss = css`
  font-size: 0.82em;
  color: #8B6B4A;
  font-style: italic;
  margin-top: auto;
  padding-top: 1em;
  border-top: 0.06em dashed rgba(140, 110, 50, 0.25);
`

/* --- Weathered Tome styles --- */

const actionsRowCss = css`
  display: flex;
  gap: 0.8em;
  flex-wrap: wrap;
  margin-bottom: 0.8em;
`

const shieldsCostRowCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 0.12em solid rgba(140, 110, 50, 0.15);
`

const shieldsGroupCss = css`
  display: flex;
  align-items: center;
  gap: 0.3em;
  flex-wrap: wrap;
`

const shieldIconCss = css`
  height: 1.6em;
  filter: drop-shadow(0 0.06em 0.12em rgba(0, 0, 0, 0.3));
  vertical-align: middle;
  align-self: center;
  margin-top: -0.1em;
`

const costDisplayCss = css`
  display: flex;
  align-items: center;
  gap: 0.25em;
  font-size: 1.3em;
  font-weight: 700;
  color: #3A2410;
  text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.3);
`

const coinIconCss = css`
  height: 1em;
  vertical-align: text-bottom;
  filter: drop-shadow(0 0.06em 0.12em rgba(0, 0, 0, 0.3));
`

const discountCss = css`
  color: #2A7A30;
  font-weight: 600;
`

const messengerLineCss = css`
  display: flex;
  align-items: center;
  gap: 0.4em;
  font-size: 0.9em;
  color: #5C3A1E;
  margin-bottom: 1.2em;
  padding: 0.3em 0.6em;
  background: rgba(140, 110, 50, 0.06);
  border-radius: 0.25em;
  border: 0.06em solid rgba(140, 110, 50, 0.1);
`

const messengerArrowCss = css`
  color: #8B6914;
  font-weight: bold;
  font-size: 1.1em;
`

const messengerIconCss = css`
  height: 1.4em;
`

/* Section header with trailing gold line */
const sectionHeaderCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.72em;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #3A2410;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.4em !important;
  margin-top: 1em !important;
`

const sectionLineCss = css`
  flex: 1;
  height: 0.12em;
  background: linear-gradient(90deg, #D4A828 0%, rgba(140, 110, 50, 0.2) 50%, transparent 100%);
  border-radius: 0.06em;
`

const sectionHeaderScoringCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.72em;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #7A1818;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.4em !important;
  margin-top: 1em !important;
`

const sectionLineScoringCss = css`
  flex: 1;
  height: 0.12em;
  background: linear-gradient(90deg, #A83030 0%, rgba(160, 40, 40, 0.2) 50%, transparent 100%);
  border-radius: 0.06em;
`

/* Effect block with gold left bar */
const effectBlockCss = css`
  color: #5C3A1E;
  font-size: 0.92em;
  line-height: 1.55;
  padding: 0.4em 0.7em;
  margin-bottom: 1.2em !important;
  background: linear-gradient(135deg, rgba(140, 110, 50, 0.07), rgba(140, 110, 50, 0.02));
  border-left: 0.25em solid #D4A828;
  border-radius: 0 0.3em 0.3em 0;
  box-shadow: 0 0.06em 0.18em rgba(0, 0, 0, 0.06);
`

const effectListCss = css`
  margin: 0;
  padding-left: 1em;
  > li {
    margin-bottom: 0.4em;
  }
`

/* Scoring block with red left bar */
const scoringBlockCss = css`
  color: #5C3A1E;
  font-size: 0.92em;
  line-height: 1.55;
  padding: 0.4em 0.7em;
  margin-bottom: 1.2em !important;
  background: linear-gradient(135deg, rgba(160, 40, 40, 0.06), rgba(160, 40, 40, 0.02));
  border-left: 0.25em solid #A83030;
  border-radius: 0 0.3em 0.3em 0;
  box-shadow: 0 0.06em 0.18em rgba(0, 0, 0, 0.06);
`

const lockInfoCss = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.85em;
  color: #5C3A1E;
  padding: 0.4em 0.6em;
  margin-bottom: 0.5em;
  background: rgba(100, 80, 50, 0.06);
  border-radius: 0.3em;
  border: 0.06em solid rgba(140, 110, 50, 0.12);
  line-height: 1.4;
`

const lockIconCss = css`
  height: 2.2em;
  width: auto;
  flex-shrink: 0;
  filter: drop-shadow(0 0.06em 0.12em rgba(0, 0, 0, 0.25));
`

const extensionLinkCss = css`
  display: inline;
  margin-left: 0.3em;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: #8B6914;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #5C3A1E;
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