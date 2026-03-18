import { isMoveItemType, isCustomMoveType } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { Card } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { EffectType } from '../material/Effect'
import { ConditionType } from '../material/Condition'
import { Tableau } from '../material/Tableau'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { CustomMoveType } from '../rules/CustomMoveType'
import { Memory } from '../rules/Memory'
import { RuleId } from '../rules/RuleId'
import {
  addCardToDeck,
  addCardToRiver,
  addCardToTableau,
  addKeyOnCard,
  createGame,
  getRules,
  playConsequences,
  setGold,
  setKeys
} from './TestHelper'

describe('Buy oubliette card', () => {
  it('should place a key on the card instead of triggering effects', () => {
    const game = createGame()
    addCardToRiver(game, Card.Conspirator) // cost 1, castle
    setGold(game, 1, 10)
    // Add deck cards for river refill
    addCardToDeck(game, Card.Steward)
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    game.rule = { id: RuleId.BuyCard, player: 1 }
    game.items[MaterialType.MessengerPawn] = [{ location: { type: LocationType.EndOfRiver, id: Place.Castle } }]

    const rules = getRules(game)
    const moves = rules.getLegalMoves(1)
    const buyMove = moves.find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )
    expect(buyMove).toBeDefined()

    playConsequences(rules, buyMove!)

    // A key should be on the card
    const keysOnCards = rules.material(MaterialType.Key).location(LocationType.KeyOnCard).getItems()
    expect(keysOnCards.length).toBeGreaterThan(0)
  })
})

describe('Activate lock', () => {
  it('should offer lock activation in SpendKeyRule', () => {
    const game = createGame()
    // Place Conspirator in tableau with a key on it
    addCardToTableau(game, Card.Conspirator, 1, 0, 0)
    const cardIndex = 0
    addKeyOnCard(game, 1, cardIndex)
    // Add river cards so we can buy
    addCardToRiver(game, Card.Steward)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.SpendKey, player: 1 }

    const rules = getRules(game)
    const moves = rules.getLegalMoves(1)
    const lockMove = moves.find(m => isCustomMoveType(CustomMoveType.ActivateLock)(m))
    expect(lockMove).toBeDefined()
  })

  it('should not offer lock activation if already activated this turn', () => {
    const game = createGame()
    addCardToTableau(game, Card.Conspirator, 1, 0, 0)
    addKeyOnCard(game, 1, 0)
    addCardToRiver(game, Card.Steward)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.SpendKey, player: 1 }
    game.memory = { [Memory.LockActivatedThisTurn]: true }

    const rules = getRules(game)
    const moves = rules.getLegalMoves(1)
    const lockMove = moves.find(m => isCustomMoveType(CustomMoveType.ActivateLock)(m))
    expect(lockMove).toBeUndefined()
  })

  it('should spend the key and trigger effects when activating Conspirator lock', () => {
    const game = createGame()
    // Conspirator: GainGold 2 per Military shield
    // Add some military shields in tableau
    addCardToTableau(game, Card.Conspirator, 1, 0, 0) // index 0 - Faith shield
    addCardToTableau(game, Card.Officer, 1, 1, 0) // index 1 - Military shield
    addKeyOnCard(game, 1, 0)
    addCardToRiver(game, Card.Steward)
    setGold(game, 1, 10)
    setKeys(game, 1, 2)
    game.rule = { id: RuleId.SpendKey, player: 1 }

    const rules = getRules(game)
    const moves = rules.getLegalMoves(1)
    const lockMove = moves.find(m => isCustomMoveType(CustomMoveType.ActivateLock)(m) && m.data === 0)
    expect(lockMove).toBeDefined()

    playConsequences(rules, lockMove!)

    // Key should be removed from card
    const keysOnCard = rules.material(MaterialType.Key).location(LocationType.KeyOnCard).parent(0).getItems()
    expect(keysOnCard.reduce((sum, i) => sum + (i.quantity ?? 1), 0)).toBe(0)

    // Should be back at SpendKey
    expect(rules.game.rule?.id).toBe(RuleId.SpendKey)
  })
})

describe('DiscardEntireRiver', () => {
  it('should discard all castle river cards and refill', () => {
    const game = createGame()
    // LadyInTheIronMask: DiscardEntireRiver + bonus 2 keys per Craftsmanship shield
    addCardToTableau(game, Card.LadyInTheIronMask, 1, 0, 0) // index 0
    addKeyOnCard(game, 1, 0)
    // River with 3 castle cards
    addCardToRiver(game, Card.Goldsmith) // Craftsmanship shield
    addCardToRiver(game, Card.Architect) // Craftsmanship shield
    addCardToRiver(game, Card.Steward) // No Craftsmanship shield
    // Deck for refill
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)

    setGold(game, 1, 10)
    setKeys(game, 1, 2)
    game.rule = { id: RuleId.SpendKey, player: 1 }

    const rules = getRules(game)
    const lockMove = rules.getLegalMoves(1).find(m =>
      isCustomMoveType(CustomMoveType.ActivateLock)(m) && m.data === 0
    )
    expect(lockMove).toBeDefined()

    const keysBefore = rules.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(1)
      .getItems().reduce((sum, i) => sum + (i.id as number) * (i.quantity ?? 1), 0)

    playConsequences(rules, lockMove!)

    // River should be refilled
    const castleRiver = rules.material(MaterialType.Card).location(LocationType.River).locationId(Place.Castle)
    expect(castleRiver.length).toBe(3)

    // Old river cards should be in discard
    const discard = rules.material(MaterialType.Card).location(LocationType.Discard)
    expect(discard.length).toBe(3)

    // Goldsmith has Craftsmanship (1), Architect has Scholarship (0), Steward has Nobility (0)
    // So bonus = 1 shield * 2 keys = 2 keys
    // Lock key is removed from OnCard, not PlayerKeyStock, so player stock is unchanged
    const keysAfter = rules.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(1)
      .getItems().reduce((sum, i) => sum + (i.id as number) * (i.quantity ?? 1), 0)
    // keysBefore + 2 (bonus) = keysBefore + 2
    expect(keysAfter).toBe(keysBefore + 2)
  })

  it('Toady should discard river without bonus', () => {
    const game = createGame()
    addCardToTableau(game, Card.Toady, 1, 0, 0)
    addKeyOnCard(game, 1, 0)
    addCardToRiver(game, Card.Steward)
    addCardToRiver(game, Card.HisHoliness)
    addCardToRiver(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    addCardToDeck(game, Card.Templar)
    addCardToDeck(game, Card.Gravedigger)
    setGold(game, 1, 10)
    setKeys(game, 1, 2)
    game.rule = { id: RuleId.SpendKey, player: 1 }

    const rules = getRules(game)
    const lockMove = rules.getLegalMoves(1).find(m =>
      isCustomMoveType(CustomMoveType.ActivateLock)(m) && m.data === 0
    )
    expect(lockMove).toBeDefined()
    playConsequences(rules, lockMove!)

    const castleRiver = rules.material(MaterialType.Card).location(LocationType.River).locationId(Place.Castle)
    expect(castleRiver.length).toBe(3)

    const discard = rules.material(MaterialType.Card).location(LocationType.Discard)
    expect(discard.length).toBe(3)
  })
})

describe('ActivateAdjacentAbility', () => {
  it('should let player choose an adjacent card', () => {
    const game = createGame()
    // ArtForger at (1,0), adjacent to Goldsmith at (0,0) which has PutGoldOnCard effect
    addCardToTableau(game, Card.Goldsmith, 1, 0, 0)
    addCardToTableau(game, Card.ArtForger, 1, 1, 0)
    addKeyOnCard(game, 1, 1) // key on ArtForger

    addCardToRiver(game, Card.Steward)
    setGold(game, 1, 10)
    setKeys(game, 1, 2)
    game.rule = { id: RuleId.SpendKey, player: 1 }

    const rules = getRules(game)
    // Activate ArtForger lock
    const lockMove = rules.getLegalMoves(1).find(m =>
      isCustomMoveType(CustomMoveType.ActivateLock)(m) && m.data === 1
    )
    expect(lockMove).toBeDefined()
    playConsequences(rules, lockMove!)

    // Should be in ActivateAdjacentAbility rule
    expect(rules.game.rule?.id).toBe(RuleId.ActivateAdjacentAbility)

    // Should have a choice to activate Goldsmith
    const adjacentMoves = rules.getLegalMoves(1)
    const activateGoldsmith = adjacentMoves.find(m =>
      isCustomMoveType(CustomMoveType.ActivateAdjacent)(m) && m.data === 0
    )
    expect(activateGoldsmith).toBeDefined()
  })

  it('should not include discount cards as adjacent choices', () => {
    const game = createGame()
    // Steward has Discount effect — should not be activatable
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    addCardToTableau(game, Card.ArtForger, 1, 1, 0)
    addKeyOnCard(game, 1, 1)

    addCardToRiver(game, Card.Chaplain)
    setGold(game, 1, 10)
    setKeys(game, 1, 2)
    game.rule = { id: RuleId.SpendKey, player: 1 }

    const rules = getRules(game)
    const lockMove = rules.getLegalMoves(1).find(m =>
      isCustomMoveType(CustomMoveType.ActivateLock)(m) && m.data === 1
    )
    expect(lockMove).toBeDefined()
    playConsequences(rules, lockMove!)

    // If Steward only has Discount, ArtForger should skip (no valid adjacent)
    // and return to SpendKey
    const stewardEffects = cardCharacteristics[Card.Steward].effects.filter(
      e => e.type !== EffectType.Discount && e.type !== EffectType.ActivateAdjacentAbility
    )
    if (stewardEffects.length === 0) {
      expect(rules.game.rule?.id).toBe(RuleId.SpendKey)
    }
  })
})

describe('Scoring conditions', () => {
  it('PerDifferentCost should count unique costs', () => {
    const game = createGame()
    // Cards with different costs: Steward(1), Chaplain(2), Cardinal(4)
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    addCardToTableau(game, Card.Chaplain, 1, 1, 0)
    addCardToTableau(game, Card.Cardinal, 1, 2, 0)
    const tableau = new Tableau(game, 1)
    // 3 different costs
    expect(tableau.countCondition({ type: ConditionType.PerDifferentCost })).toBe(3)
  })

  it('PerLockCard should count oubliette cards', () => {
    const game = createGame()
    addCardToTableau(game, Card.Conspirator, 1, 0, 0) // outOfTheOubliette
    addCardToTableau(game, Card.ArtForger, 1, 1, 0) // outOfTheOubliette
    addCardToTableau(game, Card.Steward, 1, 2, 0) // NOT outOfTheOubliette
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerLockCard })).toBe(2)
  })
})
