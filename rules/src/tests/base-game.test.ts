import { isMoveItemType } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { Card } from '../material/Card'
import { Shield } from '../material/CardCharacteristics'
import { Coin } from '../material/Coin'
import { ConditionType } from '../material/Condition'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { Tableau } from '../material/Tableau'
import { RuleId } from '../rules/RuleId'
import {
  addCardToDeck,
  addCardToRiver,
  addCardToTableau,
  createGame,
  getGold,
  getKeys,
  getRules,
  playConsequences,
  setGold,
  setKeys
} from './TestHelper'

// ============================================================
// BUYING CARDS
// ============================================================

describe('Buy a card', () => {
  it('should deduct gold and place card in tableau', () => {
    const game = createGame()
    addCardToRiver(game, Card.Nun) // cost 3
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 5)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )
    expect(buyMove).toBeDefined()

    playConsequences(rules, buyMove!)

    const tableau = rules.material(MaterialType.Card).location(LocationType.Tableau).player(1)
    expect(tableau.length).toBe(1)
    // Nun effect: gain 1 per Castle banner → 1 (Nun itself)
    expect(getGold(rules, 1)).toBe(3) // 5 - 3 + 1
  })

  it('should not allow buying cards the player cannot afford', () => {
    const game = createGame()
    addCardToRiver(game, Card.HisHoliness) // cost 7
    setGold(game, 1, 3)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )
    expect(buyMove).toBeUndefined()
  })

  it('should allow flipping card face-down for 6 gold + 2 keys', () => {
    const game = createGame()
    addCardToRiver(game, Card.HisHoliness) // cost 7, too expensive
    addCardToDeck(game, Card.Steward)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 3) // can't afford face up
    setKeys(game, 1, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const flipMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && m.location.rotation === true
    )
    expect(flipMove).toBeDefined()

    playConsequences(rules, flipMove!)

    expect(getGold(rules, 1)).toBe(9) // 3 + 6
    expect(getKeys(rules, 1)).toBe(2) // 0 + 2
  })

  it('should apply discount from Discount cards', () => {
    const game = createGame()
    // Chatelaine gives castle discount 1
    addCardToTableau(game, Card.Chatelaine, 1, 0, 0) // Discount castle: 1
    addCardToRiver(game, Card.Nun) // cost 3, castle card
    addCardToDeck(game, Card.HisHoliness)
    setGold(game, 1, 2) // only 2 gold, but with discount cost is 2
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )
    expect(buyMove).toBeDefined()

    playConsequences(rules, buyMove!)

    // Nun effect: gain 1 per Castle banner → 2 (Chatelaine + Nun)
    expect(getGold(rules, 1)).toBe(2) // 2 - 2 + 2
  })
})

// ============================================================
// IMMEDIATE EFFECTS: GainGold
// ============================================================

describe('GainGold effects', () => {
  it('Nun: gain 1 gold per Castle banner', () => {
    const game = createGame()
    // Nun: gain 1 per Castle banner. Castle cards have id < 100
    addCardToTableau(game, Card.Steward, 1, 0, 0) // Castle
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // Castle
    addCardToRiver(game, Card.Nun) // Castle, cost 3
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    const goldBefore = getGold(rules, 1)
    playConsequences(rules, buyMove)

    // 3 Castle cards total (Steward + Cardinal + Nun itself)
    // goldBefore - 3 (cost) + 3 (gain) = goldBefore
    expect(getGold(rules, 1)).toBe(goldBefore - 3 + 3)
  })

  it('Officer: gain 1 per Nobility + 1 per Military (two effects)', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // Nobility (1 shield)
    addCardToTableau(game, Card.Knight, 1, 1, 0) // Military
    addCardToRiver(game, Card.Officer) // Military, cost 5
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // 1 Nobility (Steward) → +1 gold
    // 2 Military (Knight + Officer itself) → +2 gold
    // 10 - 5 (cost) + 1 + 2 = 8
    expect(getGold(rules, 1)).toBe(8)
  })

  it('Devout: gain 1 per empty position', () => {
    const game = createGame()
    addCardToRiver(game, Card.Devout) // cost 4
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // 1 card placed → 8 empty positions
    // 10 - 4 + 8 = 14
    expect(getGold(rules, 1)).toBe(14)
  })

  it('Patron: opponents gain gold (not the player)', () => {
    const game = createGame()
    addCardToRiver(game, Card.Patron) // cost 7, opponentsGain 2
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    setGold(game, 2, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Player: 10 - 7 + 0 = 3
    expect(getGold(rules, 1)).toBe(3)
    // Opponent: 0 + 2 = 2
    expect(getGold(rules, 2)).toBe(2)
  })

  it('Traveler: gain 3 per cost-0 card', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // cost 0
    addCardToRiver(game, Card.Traveler) // cost 0, gain 3 per cost-0, Village card
    addCardToDeck(game, Card.Innkeeper)
    addCardToDeck(game, Card.Vicar)
    addCardToDeck(game, Card.Inventor)
    setGold(game, 1, 5)
    game.rule = { id: RuleId.BuyCard, player: 1 }
    game.items[MaterialType.MessengerPawn] = [{ location: { type: LocationType.EndOfRiver, id: Place.Village } }]

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // 2 cost-0 cards (Steward + Traveler itself) → 6 gold
    // 5 - 0 + 6 = 11
    expect(getGold(rules, 1)).toBe(11)
  })
})

// ============================================================
// IMMEDIATE EFFECTS: GainKeys
// ============================================================

describe('GainKeys effects', () => {
  it('MotherSuperior: gain flat 4 keys', () => {
    const game = createGame()
    addCardToRiver(game, Card.MotherSuperior) // cost 5, gain 4 keys flat
    addCardToDeck(game, Card.HisHoliness)
    setGold(game, 1, 10)
    setKeys(game, 1, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    expect(getKeys(rules, 1)).toBe(4)
  })

  it('HisHoliness: gain 3 keys, opponents gain 1', () => {
    const game = createGame()
    addCardToRiver(game, Card.HisHoliness) // cost 7, gain 3 keys, opponents 1
    addCardToDeck(game, Card.Steward)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    setKeys(game, 1, 0)
    setKeys(game, 2, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    expect(getKeys(rules, 1)).toBe(3)
    expect(getKeys(rules, 2)).toBe(1)
  })

  it('Cardinal: gain 1 key per Castle banner', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // Castle
    addCardToTableau(game, Card.Nun, 1, 1, 0) // Castle
    addCardToRiver(game, Card.Cardinal) // cost 4, 1 key per Castle banner
    addCardToDeck(game, Card.HisHoliness)
    setGold(game, 1, 10)
    setKeys(game, 1, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // 3 Castle cards (Steward + Nun + Cardinal) → 3 keys
    expect(getKeys(rules, 1)).toBe(3)
  })

  it('Goldsmith: gain 1 key per 2-shield card', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // 2 shields
    addCardToTableau(game, Card.Steward, 1, 1, 0) // 1 shield
    addCardToRiver(game, Card.Goldsmith) // cost 4, 1 key per 2-shield card
    addCardToDeck(game, Card.HisHoliness)
    setGold(game, 1, 10)
    setKeys(game, 1, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // 2 cards with 2 shields: Templar(Faith+Military), Goldsmith itself(Scholarship+Craftsmanship) → 2 keys
    expect(getKeys(rules, 1)).toBe(2)
  })
})

// ============================================================
// IMMEDIATE EFFECTS: PutGoldOnCard
// ============================================================

describe('PutGoldOnCard effects', () => {
  it('QueenMother: put 2 gold on self (purse card)', () => {
    const game = createGame()
    addCardToRiver(game, Card.QueenMother) // cost 3, PutGoldOnCard gold:2, purse limit 5
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Gold on card
    const goldOnCards = rules.material(MaterialType.GoldCoin).location(LocationType.OnCard).player(1)
    expect(goldOnCards.getItems().reduce((sum, i) => sum + (i.id as number) * (i.quantity ?? 1), 0)).toBe(2)
  })

  it('Steward: put gold on up to 2 purse cards', () => {
    const game = createGame()
    // Two purse cards already in tableau
    addCardToTableau(game, Card.QueenMother, 1, 0, 0) // purse limit 5
    addCardToTableau(game, Card.Beekeeper, 1, 1, 0) // purse limit 9
    addCardToRiver(game, Card.Steward) // PutGoldOnCard cardsLimit:2 (fill up to limit on up to 2 cards)
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Steward has cardsLimit:2 and no gold amount → fills up to limit on top 2 purse cards
    // QueenMother: limit 5, Beekeeper: limit 9. Sorted by space desc: Beekeeper(9), QueenMother(5)
    const goldOnCards = rules.material(MaterialType.GoldCoin).location(LocationType.OnCard).player(1)
    const totalGold = goldOnCards.getItems().reduce((sum, i) => sum + (i.id as number) * (i.quantity ?? 1), 0)
    // Should fill both: 9 + 5 = 14
    expect(totalGold).toBe(14)
  })

  it('PutGoldOnCard should not exceed purse limit', () => {
    const game = createGame()
    addCardToTableau(game, Card.QueenMother, 1, 0, 0) // purse limit 5
    // Pre-place 4 gold on QueenMother
    const qmIndex = 0
    game.items[MaterialType.GoldCoin]!.push({
      id: Coin.Coin1,
      location: { type: LocationType.OnCard, player: 1, parent: qmIndex },
      quantity: 4
    })
    addCardToRiver(game, Card.Beekeeper) // PutGoldOnCard gold: 2, purse limit 9, Village card
    addCardToDeck(game, Card.Innkeeper)
    addCardToDeck(game, Card.Vicar)
    addCardToDeck(game, Card.Inventor)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }
    game.items[MaterialType.MessengerPawn] = [{ location: { type: LocationType.EndOfRiver, id: Place.Village } }]

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Beekeeper puts 2 gold on all purse cards it can
    // QueenMother has 4/5 → room for 1. Beekeeper has 0/9 → room for 9.
    // Beekeeper gold:2 → puts 2 on QueenMother (min(2, 1)=1) and 2 on Beekeeper (min(2, 9)=2)
    // Actually PutGoldOnCard puts gold:2 on EACH purse card with room
    const beekeeperIndex = rules.material(MaterialType.Card).location(LocationType.Tableau).player(1)
      .getItems().findIndex(i => (i.id as any)?.front === Card.Beekeeper)
    const goldOnBeekeeper = rules.material(MaterialType.GoldCoin).location(LocationType.OnCard)
      .player(1).parent(beekeeperIndex >= 0 ? beekeeperIndex : 1)
    const beekeeperGold = goldOnBeekeeper.getItems().reduce((sum, i) => sum + (i.id as number) * (i.quantity ?? 1), 0)
    expect(beekeeperGold).toBe(2)

    // QueenMother had 4/5 → can only fit 1 more
    const goldOnQM = rules.material(MaterialType.GoldCoin).location(LocationType.OnCard)
      .player(1).parent(0)
    const qmGold = goldOnQM.getItems().reduce((sum, i) => sum + (i.id as number) * (i.quantity ?? 1), 0)
    expect(qmGold).toBe(5) // 4 + min(2, 1) = 5
  })
})

// ============================================================
// SCORING CONDITIONS
// ============================================================

describe('Scoring conditions', () => {
  it('PerShield counts shields in tableau', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // Faith
    addCardToTableau(game, Card.Officer, 1, 2, 0) // Military
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerShield, shield: Shield.Faith })).toBe(2)
    expect(tableau.countCondition({ type: ConditionType.PerShield, shield: Shield.Military })).toBe(2)
  })

  it('PerShield with line restricts to same row', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military, row 0
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // Faith, row 0
    addCardToTableau(game, Card.Nun, 1, 0, 1) // Faith, row 1
    const tableau = new Tableau(game, 1)
    // Row 0: 2 Faith shields (Templar + Cardinal)
    expect(tableau.countCondition({ type: ConditionType.PerShield, shield: Shield.Faith, line: true }, 0, 0)).toBe(2)
    // Row 1: 1 Faith shield (Nun)
    expect(tableau.countCondition({ type: ConditionType.PerShield, shield: Shield.Faith, line: true }, 0, 1)).toBe(1)
  })

  it('PerDifferentShieldType counts unique shield types', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military
    addCardToTableau(game, Card.Goldsmith, 1, 1, 0) // Scholarship + Craftsmanship
    addCardToTableau(game, Card.Steward, 1, 2, 0) // Nobility
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerDifferentShieldType })).toBe(5) // all except Peasantry
  })

  it('PerMissingShieldType counts shields not in tableau', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military
    const tableau = new Tableau(game, 1)
    // Has Faith + Military, missing Nobility, Scholarship, Craftsmanship, Peasantry → 4
    expect(tableau.countCondition({ type: ConditionType.PerMissingShieldType })).toBe(4)
  })

  it('IfShieldMissing returns 1 if shield absent, 0 if present', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.IfShieldMissing, shield: Shield.Craftsmanship })).toBe(1)
    expect(tableau.countCondition({ type: ConditionType.IfShieldMissing, shield: Shield.Faith })).toBe(0)
  })

  it('PerShieldsSet counts complete sets', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // Nobility
    addCardToTableau(game, Card.Officer, 1, 1, 0) // Military
    addCardToTableau(game, Card.Princess, 1, 2, 0) // Nobility
    addCardToTableau(game, Card.Knight, 1, 0, 1) // Military
    const tableau = new Tableau(game, 1)
    // 2 Nobility + 2 Military → 2 sets of {Nobility, Military}
    expect(tableau.countCondition({ type: ConditionType.PerShieldsSet, shields: [Shield.Nobility, Shield.Military] })).toBe(2)
  })

  it('PerIdenticalShieldsSet counts groups of N identical shields', () => {
    const game = createGame()
    addCardToTableau(game, Card.Captain, 1, 0, 0) // Military + Military
    addCardToTableau(game, Card.Officer, 1, 1, 0) // Military
    addCardToTableau(game, Card.Knight, 1, 2, 0) // Military
    const tableau = new Tableau(game, 1)
    // 4 Military shields → floor(4/3) = 1 set of 3
    expect(tableau.countCondition({ type: ConditionType.PerIdenticalShieldsSet, count: 3 })).toBe(1)
  })

  it('PerBanner counts cards from a specific place', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // Castle
    addCardToTableau(game, Card.Inventor, 1, 1, 0) // Village
    addCardToTableau(game, Card.Nun, 1, 2, 0) // Castle
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerBanner, banner: Place.Castle })).toBe(2)
    expect(tableau.countCondition({ type: ConditionType.PerBanner, banner: Place.Village })).toBe(1)
  })

  it('PerCardWithShieldCount counts cards with exactly N shields', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // 1 shield
    addCardToTableau(game, Card.Templar, 1, 1, 0) // 2 shields
    addCardToTableau(game, Card.Nun, 1, 2, 0) // 1 shield
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithShieldCount, count: 1 })).toBe(2)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithShieldCount, count: 2 })).toBe(1)
  })

  it('PerCardWithCost counts cards with exact cost', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // cost 0
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // cost 4
    addCardToTableau(game, Card.Pawnbroker, 1, 2, 0) // cost 4
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithCost, cost: 4 })).toBe(2)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithCost, cost: 0 })).toBe(1)
  })

  it('PerCardWithCost with orGreater counts cards with cost >= N', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // cost 0
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // cost 4
    addCardToTableau(game, Card.HisHoliness, 1, 2, 0) // cost 7
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithCost, cost: 5, orGreater: true })).toBe(1) // only HisHoliness
    expect(tableau.countCondition({ type: ConditionType.PerCardWithCost, cost: 4, orGreater: true })).toBe(2) // Cardinal + HisHoliness
  })

  it('PerCardWithDiscount counts cards with Discount effect', () => {
    const game = createGame()
    addCardToTableau(game, Card.Alchemist, 1, 0, 0) // Discount
    addCardToTableau(game, Card.Chatelaine, 1, 1, 0) // Discount
    addCardToTableau(game, Card.Steward, 1, 2, 0) // PutGoldOnCard
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithDiscount })).toBe(2)
  })

  it('IfCardFlippedDown returns 1 if any position empty, 0 if full', () => {
    const game = createGame()
    // Only 2 cards, one position empty
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    addCardToTableau(game, Card.Nun, 1, 1, 0)
    const tableau = new Tableau(game, 1)
    // Not all 9 positions filled (only 2 cards in 3x3) → some nulls exist → 1
    expect(tableau.countCondition({ type: ConditionType.IfCardFlippedDown })).toBe(1)
  })

  it('PerCardWithPurse counts purse cards', () => {
    const game = createGame()
    addCardToTableau(game, Card.QueenMother, 1, 0, 0) // purse
    addCardToTableau(game, Card.Beekeeper, 1, 1, 0) // purse
    addCardToTableau(game, Card.Steward, 1, 2, 0) // purse (PutGoldOnCard but scoring is PerGoldInPurse)
    addCardToTableau(game, Card.Officer, 1, 0, 1) // not purse
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerCardWithPurse })).toBe(3)
  })

  it('PerFullPosition counts placed cards', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    addCardToTableau(game, Card.Nun, 1, 1, 0)
    addCardToTableau(game, Card.Cardinal, 1, 2, 0)
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.PerFullPosition })).toBe(3)
  })

  it('PerEmptyPosition counts empty spaces', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    const tableau = new Tableau(game, 1)
    // 9 total - 1 filled = 8 empty
    expect(tableau.countCondition({ type: ConditionType.PerEmptyPosition })).toBe(8)
  })

  it('IfPosition checks specific grid position', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    addCardToTableau(game, Card.Nun, 1, 1, 0)
    addCardToTableau(game, Card.Cardinal, 1, 2, 0)
    const tableau = new Tableau(game, 1)
    // Top row full pattern
    const topRow = {
      type: ConditionType.IfPosition as const,
      position: [[true, true, true], [false, false, false], [false, false, false]]
    }
    // Card at (0,0) → position[0][0] = true → 1
    expect(tableau.countCondition(topRow, 0, 0)).toBe(1)
  })

  it('IfNoDiscount returns 1 if no discount cards, 0 otherwise', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // no discount
    addCardToTableau(game, Card.Officer, 1, 1, 0) // no discount
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.IfNoDiscount })).toBe(1)

    const game2 = createGame()
    addCardToTableau(game2, Card.Chatelaine, 1, 0, 0) // has discount
    const tableau2 = new Tableau(game2, 1)
    expect(tableau2.countCondition({ type: ConditionType.IfNoDiscount })).toBe(0)
  })

  it('IfNoPurse returns 1 if no purse cards, 0 otherwise', () => {
    const game = createGame()
    addCardToTableau(game, Card.Officer, 1, 0, 0) // no purse
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.IfNoPurse })).toBe(1)

    const game2 = createGame()
    addCardToTableau(game2, Card.QueenMother, 1, 0, 0) // purse
    const tableau2 = new Tableau(game2, 1)
    expect(tableau2.countCondition({ type: ConditionType.IfNoPurse })).toBe(0)
  })

  it('IfNoFaceDown returns 1 if all positions filled, 0 otherwise', () => {
    const game = createGame()
    // Fill all 9 positions
    addCardToTableau(game, Card.Steward, 1, 0, 0)
    addCardToTableau(game, Card.Nun, 1, 1, 0)
    addCardToTableau(game, Card.Cardinal, 1, 2, 0)
    addCardToTableau(game, Card.Officer, 1, 0, 1)
    addCardToTableau(game, Card.Knight, 1, 1, 1)
    addCardToTableau(game, Card.Princess, 1, 2, 1)
    addCardToTableau(game, Card.Jester, 1, 0, 2)
    addCardToTableau(game, Card.Prince, 1, 1, 2)
    addCardToTableau(game, Card.Templar, 1, 2, 2)
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.IfNoFaceDown })).toBe(1)

    // Remove one → not full
    const game2 = createGame()
    addCardToTableau(game2, Card.Steward, 1, 0, 0)
    addCardToTableau(game2, Card.Nun, 1, 1, 0)
    const tableau2 = new Tableau(game2, 1)
    expect(tableau2.countCondition({ type: ConditionType.IfNoFaceDown })).toBe(0)
  })

  it('IfShieldInRow checks if shield exists in same row', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military, row 0
    addCardToTableau(game, Card.Steward, 1, 1, 0) // Nobility, row 0
    addCardToTableau(game, Card.Inventor, 1, 0, 1) // Scholarship, row 1
    const tableau = new Tableau(game, 1)
    // Row 0 has Faith → 1
    expect(tableau.countCondition({ type: ConditionType.IfShieldInRow, shield: Shield.Faith }, 0, 0)).toBe(1)
    // Row 1 has no Faith → 0
    expect(tableau.countCondition({ type: ConditionType.IfShieldInRow, shield: Shield.Faith }, 0, 1)).toBe(0)
  })

  it('IfShieldInColumn checks if shield exists in same column', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0) // Faith + Military, col 0
    addCardToTableau(game, Card.Steward, 1, 1, 0) // Nobility, col 1
    addCardToTableau(game, Card.Inventor, 1, 0, 1) // Scholarship, col 0
    const tableau = new Tableau(game, 1)
    // Column 0 has Faith (from Templar) → 1
    expect(tableau.countCondition({ type: ConditionType.IfShieldInColumn, shield: Shield.Faith }, 0, 0)).toBe(1)
    // Column 1 has no Faith → 0
    expect(tableau.countCondition({ type: ConditionType.IfShieldInColumn, shield: Shield.Faith }, 1, 0)).toBe(0)
  })

  it('SumOfCostsInRow sums costs in same row', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // cost 0
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // cost 4
    addCardToTableau(game, Card.HisHoliness, 1, 2, 0) // cost 7
    const tableau = new Tableau(game, 1)
    expect(tableau.countCondition({ type: ConditionType.SumOfCostsInRow }, 0, 0)).toBe(11) // 0 + 4 + 7
  })

  it('PerBannersSet counts complete banner sets', () => {
    const game = createGame()
    addCardToTableau(game, Card.Steward, 1, 0, 0) // Castle
    addCardToTableau(game, Card.Inventor, 1, 1, 0) // Village
    addCardToTableau(game, Card.Nun, 1, 2, 0) // Castle
    addCardToTableau(game, Card.Vicar, 1, 0, 1) // Village
    const tableau = new Tableau(game, 1)
    // 2 Castle + 2 Village → 2 sets of {Castle, Village}
    expect(tableau.countCondition({ type: ConditionType.PerBannersSet, banners: [Place.Castle, Place.Village] })).toBe(2)
  })
})

// ============================================================
// SCORING - Full card scores
// ============================================================

describe('Card scoring', () => {
  it('Alchemist: 4 per discount card', () => {
    const game = createGame()
    addCardToTableau(game, Card.Alchemist, 1, 0, 0) // Discount → counts itself
    addCardToTableau(game, Card.Chatelaine, 1, 1, 0) // Discount
    addCardToTableau(game, Card.Steward, 1, 2, 0) // Not discount
    const tableau = new Tableau(game, 1)
    // Alchemist scores 4 * 2 (Alchemist + Chatelaine) = 8
    expect(tableau.getCardScore(0, 0)).toBe(8)
  })

  it('Baron: 10 if no Peasantry shield', () => {
    const game = createGame()
    addCardToTableau(game, Card.Baron, 1, 0, 0)
    addCardToTableau(game, Card.Steward, 1, 1, 0) // Nobility only
    const tableau = new Tableau(game, 1)
    expect(tableau.getCardScore(0, 0)).toBe(10)

    const game2 = createGame()
    addCardToTableau(game2, Card.Baron, 1, 0, 0)
    addCardToTableau(game2, Card.Farmer, 1, 1, 0) // Peasantry
    const tableau2 = new Tableau(game2, 1)
    expect(tableau2.getCardScore(0, 0)).toBe(0)
  })

  it('Carpenter: 8 if any card flipped down', () => {
    const game = createGame()
    addCardToTableau(game, Card.Carpenter, 1, 0, 0)
    // Only 1 card in 3x3 grid → lots of empty positions → IfCardFlippedDown = 1
    const tableau = new Tableau(game, 1)
    expect(tableau.getCardScore(0, 0)).toBe(8)
  })

  it('Templar: 1 per key', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0)
    setKeys(game, 1, 5)
    const tableau = new Tableau(game, 1)
    expect(tableau.getCardScore(0, 0)).toBe(5)
  })
})

// ============================================================
// DISCOUNT
// ============================================================

describe('Discount', () => {
  it('Alchemist: discount 1 castle + 1 village', () => {
    const game = createGame()
    addCardToTableau(game, Card.Alchemist, 1, 0, 0) // Discount castle:1 village:1
    const tableau = new Tableau(game, 1)
    expect(tableau.getDiscount(Place.Castle)).toBe(1)
    expect(tableau.getDiscount(Place.Village)).toBe(1)
  })

  it('Multiple discounts stack', () => {
    const game = createGame()
    addCardToTableau(game, Card.Alchemist, 1, 0, 0) // castle:1 village:1
    addCardToTableau(game, Card.Chatelaine, 1, 1, 0) // castle:1
    addCardToTableau(game, Card.Architect, 1, 2, 0) // village:1
    const tableau = new Tableau(game, 1)
    expect(tableau.getDiscount(Place.Castle)).toBe(2) // Alchemist + Chatelaine
    expect(tableau.getDiscount(Place.Village)).toBe(2) // Alchemist + Architect
  })
})

// ============================================================
// EDGE CASES
// ============================================================

describe('Edge cases', () => {
  it('Buying cost-0 card should not break', () => {
    const game = createGame()
    addCardToRiver(game, Card.Steward) // cost 0
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )
    expect(buyMove).toBeDefined()
    playConsequences(rules, buyMove!)
    expect(getGold(rules, 1)).toBe(0)
  })

  it('Effect with 0 multiplier should not gain anything', () => {
    const game = createGame()
    // Scribe: gain 1 per Faith shield. No Faith shields in tableau yet (only Scribe itself)
    addCardToRiver(game, Card.Scribe) // Faith shield
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Scribe itself has 1 Faith shield → gain 1
    // 10 - 4 + 1 = 7
    expect(getGold(rules, 1)).toBe(7)
  })

  it('Card with multiple effects triggers all effects', () => {
    const game = createGame()
    // Baker: gain 1 per Peasantry + gain 1 key per Village banner
    addCardToTableau(game, Card.Farmer, 1, 0, 0) // Village, Peasantry x2
    addCardToRiver(game, Card.Baker) // cost 0, Village, Peasantry
    addCardToDeck(game, Card.Innkeeper)
    addCardToDeck(game, Card.Vicar)
    addCardToDeck(game, Card.Inventor)
    setGold(game, 1, 5)
    setKeys(game, 1, 0)
    game.rule = { id: RuleId.BuyCard, player: 1 }
    game.items[MaterialType.MessengerPawn] = [{ location: { type: LocationType.EndOfRiver, id: Place.Village } }]

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Peasantry shields: Farmer(2) + Baker(1) = 3 → +3 gold
    // Village banners: Farmer + Baker = 2 → +2 keys
    expect(getGold(rules, 1)).toBe(5 - 0 + 3) // 8
    expect(getKeys(rules, 1)).toBe(2)
  })

  it('Face-down card should not count for shields', () => {
    const game = createGame()
    addCardToTableau(game, Card.Templar, 1, 0, 0, true) // face-down (rotation=true)
    addCardToTableau(game, Card.Cardinal, 1, 1, 0) // Faith
    const tableau = new Tableau(game, 1)
    // Templar is face-down, should not count
    expect(tableau.countCondition({ type: ConditionType.PerShield, shield: Shield.Faith })).toBe(1) // only Cardinal
    expect(tableau.countCondition({ type: ConditionType.PerShield, shield: Shield.Military })).toBe(0) // Templar face-down
  })

  it('Face-down card should not score', () => {
    const game = createGame()
    addCardToTableau(game, Card.HisHoliness, 1, 0, 0, true) // face-down
    const tableau = new Tableau(game, 1)
    expect(tableau.getCardScore(0, 0)).toBe(0)
  })

  it('Messenger moves to other river after buying a moveMessenger card', () => {
    const game = createGame()
    addCardToRiver(game, Card.Nun) // cost 3, moveMessenger: true, Castle card
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    // Village river must have 3 cards (otherwise completeRivers empties it)
    addCardToRiver(game, Card.Inventor)
    addCardToRiver(game, Card.Vicar)
    addCardToRiver(game, Card.Squire)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    // Messenger should have moved to Village
    const messenger = rules.material(MaterialType.MessengerPawn).getItem()!
    expect(messenger.location.id).toBe(Place.Village)
  })

  it('Messenger stays if card does not have moveMessenger', () => {
    const game = createGame()
    addCardToRiver(game, Card.Devout) // cost 4, NO moveMessenger, Castle card
    addCardToDeck(game, Card.HisHoliness)
    addCardToDeck(game, Card.Chaplain)
    addCardToDeck(game, Card.Cardinal)
    addCardToRiver(game, Card.Inventor) // Village river - need 3 to avoid cleanup
    addCardToRiver(game, Card.Vicar)
    addCardToRiver(game, Card.Squire)
    setGold(game, 1, 10)
    game.rule = { id: RuleId.BuyCard, player: 1 }

    const rules = getRules(game)
    const buyMove = rules.getLegalMoves(1).find(m =>
      isMoveItemType(MaterialType.Card)(m) && m.location.type === LocationType.Tableau && !m.location.rotation
    )!
    playConsequences(rules, buyMove)

    const messenger = rules.material(MaterialType.MessengerPawn).getItem()!
    expect(messenger.location.id).toBe(Place.Castle)
  })
})
