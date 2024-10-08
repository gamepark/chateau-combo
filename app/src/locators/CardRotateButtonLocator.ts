/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { LocationContext, LocationDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { CardRotateButton } from './component/CardRotateButton'
import { riverLocator } from './RiverLocator'

class CardRotateButtonLocator extends Locator {
  locationDescription = new CardRotateButtonDescription()

  coordinates = { x: 2.5, z: 5 }

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    const rule = rules.game.rule
    const canBuyCard = rule?.player === player && (rule?.id === RuleId.SpendKey || rule?.id === RuleId.BuyCard)
    if (!canBuyCard) return []
    const messenger = rules.material(MaterialType.MessengerPawn).getItem()!.location.id
    const riverCards = rules.material(MaterialType.Card).location(LocationType.River).locationId(messenger)
    return riverCards.getIndexes()
      .map((index) => ({
        type: LocationType.CardRotate,
        parent: index
      }))
  }

  placeLocation(location: Location, context: LocationContext): string[] {
    const { rules } = context
    const card = rules.material(MaterialType.Card).getItem(location.parent!)!
    return [
      ...riverLocator.placeItem(card, { ...context, type: MaterialType.Card, index: location.parent!, displayIndex: location.parent! }),
      ...super.placeLocation(location, context)
    ]
  }
}

class CardRotateButtonDescription extends LocationDescription {
  height = 2
  width = 2
  borderRadius = 1
  extraCss = css`pointer-events: auto !important;`

  content = CardRotateButton

}

export const cardRotateButtonLocator = new CardRotateButtonLocator()