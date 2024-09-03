import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { range, uniq } from 'lodash'
import sumBy from 'lodash/sumBy'
import { PlayerId } from '../PlayerId'
import { Card, CardId, getCardPlace } from './Card'
import { BlazonType, cardCharacteristics, isDiscount, shields } from './CardCharacteristics'
import { Condition, ConditionType } from './Condition'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'
import { hasPurse } from './Scoring'

export class Tableau extends MaterialRulesPart {
  xMin: number
  yMin: number
  tableau: (Card | null)[][] = [[], [], []]

  constructor(game: MaterialGame, private player: PlayerId) {
    super(game)
    const cards = this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(player)
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
    const scoring = cardCharacteristics[card].scoringEffect as { score: number, condition: Condition } // TODO remove cast once refactoring is complete
    if (!scoring.score) return 0 // TODO: remove once refactoring is complete
    return scoring.score * this.countCondition(scoring.condition, x, y)
  }

  countCondition(condition: Condition, x?: number, y?: number): number {
    switch (condition.type) {
      case ConditionType.PerShield:
        return this.countShields(condition.shield, this.getConsideredCards(condition, x, y))
      case ConditionType.PerDifferentShieldType:
        return uniq(this.getConsideredCards(condition, x, y).flatMap(card => card ? cardCharacteristics[card].blazon : [])).length
      case ConditionType.PerMissingShieldType:
        return shields.filter(shield =>
          !this.cards.some(card =>
            card && cardCharacteristics[card].blazon.some(cardShield => cardShield === shield)
          )
        ).length
      case ConditionType.IfShieldMissing:
        return this.cards.some(card => card && cardCharacteristics[card].blazon.some(shield => shield === condition.shield)) ? 0 : 1
      case ConditionType.PerShieldsSet:
        return this.countSets(condition.shields, this.cards.flatMap(card => card ? cardCharacteristics[card].blazon : []))
      case ConditionType.PerIdenticalShieldsSet:
        return sumBy(shields, shield => Math.floor(this.countShields(shield) / condition.count))
      case ConditionType.PerKey:
        return this.material(MaterialType.Key).player(this.player).getQuantity()
      case ConditionType.PerBanner:
        return this.countCards(card => getCardPlace(card) === condition.banner)
      case ConditionType.PerBannersSet:
        return this.countSets(condition.banners, this.cards.filter(isNotNull).map(getCardPlace))
      case ConditionType.PerCardWithShieldCount:
        return this.countCards(card => cardCharacteristics[card].blazon.length === condition.count)
      case ConditionType.PerCardWithCost:
        if (condition.orGreater) {
          return this.countCards(card => cardCharacteristics[card].cost >= condition.cost)
        } else {
          return this.countCards(card => cardCharacteristics[card].cost === condition.cost)
        }
      case ConditionType.PerCardWithDiscount:
        return this.countCards(isDiscount)
      case ConditionType.IfCardFlippedDown:
        return this.cards.every(isNotNull) ? 0 : 1
      case ConditionType.PerCardWithPurse:
        return this.countCards(hasPurse)
      case ConditionType.PerGoldInPurse: {
        return this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(this.player)
          .location(l => l.x === x! + this.xMin && l.y === y! + this.yMin).getQuantity()
      }
      case ConditionType.PerGoldInAllPurses:
        return this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(this.player).getQuantity()
      case ConditionType.PerFullPosition:
        return this.countCards()
      case ConditionType.PerEmptyPosition:
        return 9 - this.countCards()
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

  countShields(shield: BlazonType, cards = this.cards) {
    return sumBy(cards, card => card ? cardCharacteristics[card].blazon.filter(s => s === shield).length : 0)
  }

  countSets(set: number[], values: number[]) {
    let sets = 0
    search: while (values.length > set.length) {
      for (const item of set) {
        const itemIndex = values.indexOf(item)
        if (itemIndex === -1) break search
        values.splice(itemIndex, 1)
      }
      sets++
    }
    return sets
  }

  countCards(predicate: (card: Card) => boolean = () => true) {
    return this.cards.reduce((sum, card) => card && predicate(card) ? sum + 1 : sum, 0)
  }

  get neighbors() {
    const index = this.game.players.indexOf(this.player)
    return this.game.players.filter((_, i, players) => Math.abs(index - i) === 1 || Math.abs(index - i) === players.length - 1)
  }
}

const isNotNull = <T>(value: T | null): value is T => value !== null