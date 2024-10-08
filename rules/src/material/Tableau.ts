import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { range, uniq } from 'lodash'
import sumBy from 'lodash/sumBy'
import { PlayerId } from '../PlayerId'
import { Card, CardId, getCardPlace } from './Card'
import { cardCharacteristics, Shield, shields } from './CardCharacteristics'
import { coinsMoney } from './Coin'
import { Condition, ConditionType } from './Condition'
import { EffectType } from './Effect'
import { keysMoney } from './Key'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'
import { Place } from './Place'
import { hasPurse } from './Scoring'

export class Tableau extends MaterialRulesPart {
  xMin: number
  yMin: number
  tableau: (Card | null)[][] = [[], [], []]

  constructor(game: MaterialGame, private player: PlayerId) {
    super(game)
    const cards = this.material(MaterialType.Card).location(LocationType.Tableau).player(player)
    this.xMin = cards.minBy(item => item.location.x!).getItem()?.location.x ?? 0
    this.yMin = cards.minBy(item => item.location.y!).getItem()?.location.y ?? 0
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const card = cards.location(l => l.x === x + this.xMin && l.y === y + this.yMin).getItem<CardId>()
        this.tableau[y][x] = card?.id?.front && !card?.location.rotation ? card.id.front : null
      }
    }
  }

  get score() {
    return sumBy(range(3), x => sumBy(range(3), y => this.getCardScore(x, y)))
  }

  getCardScore(x: number, y: number) {
    const card = this.tableau[y][x]
    if (card === null) return 0
    const scoring = cardCharacteristics[card].scoring
    return scoring.score * this.countCondition(scoring.condition, x, y)
  }

  countCondition(condition: Condition, x?: number, y?: number): number {
    switch (condition.type) {
      case ConditionType.PerShield:
        return this.countShields(condition.shield, this.getConsideredCards(condition, x, y))
      case ConditionType.PerDifferentShieldType:
        return uniq(this.getConsideredCards(condition, x, y).flatMap(card => card ? cardCharacteristics[card].shields : [])).length
      case ConditionType.PerMissingShieldType:
        return shields.filter(shield =>
          !this.cards.some(card =>
            card && cardCharacteristics[card].shields.some(cardShield => cardShield === shield)
          )
        ).length
      case ConditionType.IfShieldMissing:
        return this.cards.some(card => card && cardCharacteristics[card].shields.some(shield => shield === condition.shield)) ? 0 : 1
      case ConditionType.PerShieldsSet:
        return this.countSets(condition.shields, this.cards.flatMap(card => card ? cardCharacteristics[card].shields : []))
      case ConditionType.PerIdenticalShieldsSet:
        return sumBy(shields, shield => Math.floor(this.countShields(shield) / condition.count))
      case ConditionType.PerKey:
        return keysMoney.count(this.material(MaterialType.Key).player(this.player))
      case ConditionType.PerBanner:
        return this.countCards(card => getCardPlace(card) === condition.banner)
      case ConditionType.PerBannersSet:
        return this.countSets(condition.banners, this.cards.filter(isNotNull).map(getCardPlace))
      case ConditionType.PerCardWithShieldCount:
        return this.countCards(card => cardCharacteristics[card].shields.length === condition.count)
      case ConditionType.PerCardWithCost:
        if (condition.orGreater) {
          return this.countCards(card => cardCharacteristics[card].cost >= condition.cost)
        } else {
          return this.countCards(card => cardCharacteristics[card].cost === condition.cost)
        }
      case ConditionType.PerCardWithDiscount:
        return this.countCards(card => cardCharacteristics[card].effects.some(effect => effect.type === EffectType.Discount))
      case ConditionType.IfCardFlippedDown:
        return this.cards.every(isNotNull) ? 0 : 1
      case ConditionType.PerCardWithPurse:
        return this.countCards(hasPurse)
      case ConditionType.PerGoldInPurse:
        return coinsMoney.count(this.material(MaterialType.GoldCoin).location(LocationType.OnCard).parent(this.getCardIndex(x!, y!)))
      case ConditionType.PerGoldInAllPurses:
        return coinsMoney.count(this.material(MaterialType.GoldCoin).location(LocationType.OnCard).player(this.player))
      case ConditionType.PerFullPosition:
        return this.material(MaterialType.Card).location(LocationType.Tableau).player(this.player).length
      case ConditionType.PerEmptyPosition:
        return 9 - this.material(MaterialType.Card).location(LocationType.Tableau).player(this.player).length
      case ConditionType.IfPosition:
        return condition.position[y!][x!] ? 1 : 0
      case ConditionType.BestNeighbor:
        return Math.max(...this.neighbors.map(neighbor => new Tableau(this.game, neighbor).countCondition(condition.condition)))
      default:
        return 0
    }
  }

  getConsideredCards({ line, column }: { line?: boolean, column?: boolean }, x?: number, y?: number) {
    if (line && column) return this.tableau.flatMap((l, y2) => l.filter((_, x2) => y === y2 || x === x2))
    if (line && !column) return this.tableau[y!]
    if (!line && column) return this.tableau.map(l => l[x!])
    return this.cards
  }

  get cards() {
    return this.tableau.flatMap(l => l)
  }

  countShields(shield: Shield, cards = this.cards) {
    return sumBy(cards, card => card ? cardCharacteristics[card].shields.filter(s => s === shield).length : 0)
  }

  countSets(set: number[], values: number[]) {
    let sets = 0
    search: while (values.length >= set.length) {
      for (const item of set) {
        const itemIndex = values.indexOf(item)
        if (itemIndex === -1) break search
        values.splice(itemIndex, 1)
      }
      sets++
    }
    return sets
  }

  countCards(predicate: (card: Card) => boolean) {
    return this.cards.reduce((sum, card) => card && predicate(card) ? sum + 1 : sum, 0)
  }

  get neighbors() {
    const index = this.game.players.indexOf(this.player)
    return this.game.players.filter((_, i, players) => Math.abs(index - i) === 1 || Math.abs(index - i) === players.length - 1)
  }

  getCardIndex(x: number, y: number) {
    return this.material(MaterialType.Card).location(LocationType.Tableau).player(this.player)
      .location(l => l.x === x! + this.xMin && l.y === y! + this.yMin).getIndex()
  }

  getDiscount(place: Place) {
    let tableau = this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(this.player)
      .getItems<CardId>()
    return sumBy(tableau, card => card.id?.front ? this.getCardDiscount(card.id.front, place) : 0)
  }

  getCardDiscount(card: Card, place: Place) {
    return sumBy(cardCharacteristics[card].effects, effect => {
      if (effect.type !== EffectType.Discount) return 0
      return (place === Place.Castle ? effect.castle : effect.village) ?? 0
    })
  }
}

const isNotNull = <T>(value: T | null): value is T => value !== null