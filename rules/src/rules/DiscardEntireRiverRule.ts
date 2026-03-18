import { CustomMove, isCustomMoveType, isMoveItemType, isShuffle, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { Condition, ConditionType } from '../material/Condition'
import { DiscardEntireRiver, Effect, EffectType } from '../material/Effect'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place, places } from '../material/Place'
import { hasPurse } from '../material/Scoring'
import { CustomMoveType } from './CustomMoveType'
import { DealCardsHelper } from './helpers/DealCardsHelper'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DiscardEntireRiverRule extends PlayerTurnRule {

  onRuleStart() {
    // If we re-enter to process remaining effects (bonus), skip discard
    const pendingEffects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
    if (pendingEffects.length > 0) {
      return this.continueEffectChain()
    }

    // If river already chosen, proceed with discard
    const chosenRiver = this.remind<Place>(Memory.ChosenRiver)
    if (chosenRiver) {
      return this.discardRiver(chosenRiver)
    }

    // Check which rivers have cards
    const availableRivers = places.filter(place =>
      this.material(MaterialType.Card).location(LocationType.River).locationId(place).length > 0
    )

    if (availableRivers.length === 0) {
      return this.continueEffectChain()
    }

    if (availableRivers.length === 1) {
      this.memorize(Memory.ChosenRiver, availableRivers[0])
      return this.discardRiver(availableRivers[0])
    }

    // Player must choose
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return places
      .filter(place => this.material(MaterialType.Card).location(LocationType.River).locationId(place).length > 0)
      .map(place => this.customMove(CustomMoveType.ChooseRiver, place))
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ChooseRiver)(move)) return []
    const place = move.data as Place
    this.memorize(Memory.ChosenRiver, place)
    return this.discardRiver(place)
  }

  discardRiver(place: Place): MaterialMove[] {
    const riverCards = this.material(MaterialType.Card).location(LocationType.River).locationId(place)
    if (riverCards.length === 0) {
      return this.continueEffectChain()
    }

    const effect = this.effect
    const discardedCards = riverCards.getItems<CardId>().map(c => c.id.front!)
    const moves: MaterialMove[] = []

    moves.push(
      ...riverCards.moveItems({
        type: LocationType.Discard,
        id: place
      })
    )

    if (effect?.bonus) {
      const multiplier = this.countConditionOnCards(discardedCards, effect.bonus.condition!)
      const totalGain = effect.bonus.gain * multiplier
      if (totalGain > 0) {
        this.memorize(Memory.PendingEffects, (effects: Effect[]) => [
          { ...effect.bonus!, gain: totalGain, condition: undefined },
          ...effects
        ])
      }
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isShuffle(move)) {
      return this.completeRiver()
    }
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard) {
      const place = this.remind<Place>(Memory.ChosenRiver)
      if (place && this.material(MaterialType.Card).location(LocationType.River).locationId(place).length === 0) {
        return this.completeRiver()
      }
    }
    return []
  }

  completeRiver(): MaterialMove[] {
    const helper = new DealCardsHelper(this.game)
    const place = this.remind<Place>(Memory.ChosenRiver)!
    const river = helper.getRiver(place)
    const deck = helper.getDeck(place)
    const cardsToDraw = 3 - river.length
    if (cardsToDraw <= 0) return [this.continueEffectChainMove]
    const moves: MaterialMove[] = []
    if (cardsToDraw <= deck.length) {
      moves.push(...deck.deal({ type: LocationType.River, id: place }, cardsToDraw))
      moves.push(this.continueEffectChainMove)
    } else {
      const discard = helper.getDiscard(place)
      if (discard.length) {
        moves.push(...deck.deal({ type: LocationType.River, id: place }, deck.length))
        moves.push(discard.moveItemsAtOnce({ type: LocationType.Deck, id: place }))
        moves.push(discard.shuffle())
      } else {
        moves.push(this.continueEffectChainMove)
      }
    }
    return moves
  }

  get continueEffectChainMove(): MaterialMove {
    this.forget(Memory.ChosenRiver)
    const pendingEffects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
    if (pendingEffects.length) {
      return this.startRule(RuleId.DiscardEntireRiver)
    }
    const returnRule = this.remind<RuleId>(Memory.ReturnRule)
    return this.startRule(returnRule ?? RuleId.MoveMessenger)
  }

  continueEffectChain(): MaterialMove[] {
    this.forget(Memory.ChosenRiver)
    const pendingEffects = this.remind<Effect[]>(Memory.PendingEffects) ?? []
    if (pendingEffects.length) {
      return new ImmediateEffectRule(this.game).getPendingEffectsMoves()
    }
    const returnRule = this.remind<RuleId>(Memory.ReturnRule)
    return [this.startRule(returnRule ?? RuleId.MoveMessenger)]
  }

  countConditionOnCards(cards: Card[], condition: Condition): number {
    switch (condition.type) {
      case ConditionType.PerShield:
        return cards.reduce((sum, card) =>
          sum + cardCharacteristics[card].shields.filter(s => s === condition.shield).length, 0
        )
      case ConditionType.PerCardWithDiscount:
        return cards.filter(card =>
          cardCharacteristics[card].effects.some(e => e.type === EffectType.Discount)
        ).length
      case ConditionType.PerCardWithPurse:
        return cards.filter(card => hasPurse(card)).length
      default:
        return 0
    }
  }

  get effect(): DiscardEntireRiver | undefined {
    const card = this.placedCard
    if (!card?.id?.front) return undefined
    return cardCharacteristics[card.id.front as Card].effects.find((e: Effect) => e.type === EffectType.DiscardEntireRiver) as DiscardEntireRiver | undefined
  }

  get placedCard() {
    return this.material(MaterialType.Card).getItem(this.remind(Memory.PlacedCard))!
  }
}
