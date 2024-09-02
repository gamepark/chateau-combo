import {
  CompetitiveScore,
  FillGapStrategy,
  hideFront,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  XYCoordinates
} from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { cardCharacteristics, isDiscount } from './material/CardCharacteristics'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import {
  ScoringByBanner,
  ScoringByDiscount,
  ScoringByGoldOnAllCards,
  ScoringByGoldOnCard,
  ScoringByKeys,
  ScoringByPosition,
  ScoringIfHiddenCard,
  ScoringType
} from './material/Scoring'
import { Tableau } from './material/Tableau'
import { PlayerId } from './PlayerId'
import { BuyCardRule } from './rules/BuyCardRule'
import { ChooseBetweenRule } from './rules/ChooseBetweenRule'
import { DiscardFromRiverRule } from './rules/DiscardFromRiverRule'
import { EndGameRule } from './rules/EndGameRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { ImmediateEffectRule } from './rules/ImmediateEffectRule'
import { KeyEffectRule } from './rules/KeyEffectRule'
import { MoveMessengerRule } from './rules/MoveMessengerRule'
import { RuleId } from './rules/RuleId'
import { SpendKeyRule } from './rules/SpendKeyRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ChateauComboRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.SpendKey]: SpendKeyRule,
    [RuleId.KeyEffect]: KeyEffectRule,
    [RuleId.BuyCard]: BuyCardRule,
    [RuleId.MoveMessenger]: MoveMessengerRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.ImmediateEffect]: ImmediateEffectRule,
    [RuleId.DiscardFromRiver]: DiscardFromRiverRule,
    [RuleId.ChooseBetween]: ChooseBetweenRule,
    [RuleId.EndGame]: EndGameRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.River]: new FillGapStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideFront
    }
  }

  getScore(player: PlayerId): number {
    const tableau = this.getTableauWithoutHiddenCards(player)
    return sumBy(tableau, card => this.getScoreOfTheCard(card, tableau)) + new Tableau(this.game, player).score
  }

  getTableau(player: PlayerId) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(player)
      .getItems()
  }

  getTableauWithoutHiddenCards(player: PlayerId) {
    return this.getTableau(player).filter(item => item.location.rotation === undefined)
  }

  getPlayerKeyStock(player: PlayerId) {
    return this
      .material(MaterialType.Key)
      .location(LocationType.PlayerKeyStock)
      .player(player)
  }

  countPlayerGoldOnCards(player: PlayerId) {
    return this.getPlayerGoldOnCards(player).getQuantity()
  }

  getPlayerGoldOnCards(player: PlayerId) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerBoard)
      .player(player)
  }

  getScoreOfTheCard(card: MaterialItem, panorama: MaterialItem[]): number {
    if (card.location.rotation) return 0
    const playerId = card.location.player!
    const cardCaracs = cardCharacteristics[card.id.front]
    const playerKeys = this.getPlayerKeyStock(playerId).getQuantity()
    if (cardCaracs.scoringEffect !== undefined) {
      switch ((cardCaracs.scoringEffect as any).type) {
        case ScoringType.ByPosition:
          return this.getScoreByPosition(card, panorama)
        case ScoringType.ByKeys:
          return this.getScoreByKeys(card, playerKeys)
        case ScoringType.ByBanner:
          return this.getScoreByBanner(card, panorama)
        case ScoringType.ByDiscount:
          return this.getScoreByDiscountCards(card, panorama)
        case ScoringType.IfHiddenCard:
          return this.getScoreIfHiddenCard(card, this.getTableau(playerId))
        case ScoringType.ByGoldOnCard:
          return this.getScoreByGoldOnCard(card, playerId)
        case ScoringType.ByGoldOnAllCards:
          return this.getScoreByGoldOnAllCards(card, playerId)
      }
    }

    return 0
  }

  getScoreByBanner(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = (cardCaracs.scoringEffect as ScoringByBanner).value
    const banner = (cardCaracs.scoringEffect as ScoringByBanner).bannerType
    console.log('score : ', value * panorama.filter(item => banner === item.id.back).length)
    return value * panorama.filter(item => banner === item.id.back).length
  }

  getScoreByPosition(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const scoringEffect = cardCaracs.scoringEffect as ScoringByPosition
    const value = scoringEffect.value
    const validPositions: XYCoordinates[] = scoringEffect.validPositions
    const rationnalizedPanorama = this.getRationnalizedPanorama(panorama)
    const cardCoordinates = {
      x: rationnalizedPanorama.find(item => item.id.front === card.id.front)!.location.x!,
      y: rationnalizedPanorama.find(item => item.id.front === card.id.front)!.location.y!
    }

    console.log('score : ', validPositions.filter(position => position.x === cardCoordinates.x && position.y === cardCoordinates.y).length * value)
    return validPositions.filter(position => position.x === cardCoordinates.x && position.y === cardCoordinates.y).length * value
  }

  getScoreByKeys(card: MaterialItem, keys: number): number {
    console.log('score carte n° ', card.id.front)
    const scoringEffect = cardCharacteristics[card.id.front].scoringEffect as ScoringByKeys
    console.log('score : ', keys * scoringEffect.value)
    return keys * scoringEffect.value
  }

  getScoreByDiscountCards(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = (cardCaracs.scoringEffect as ScoringByDiscount).value
    const discountCardsCount = this.countDiscountCards(panorama)
    console.log('score : ', value * discountCardsCount)
    return value * discountCardsCount
  }

  countDiscountCards(panorama: MaterialItem[]) {
    return panorama
      .filter((i) => isDiscount(i.id.front))
      .length
  }

  getScoreIfHiddenCard(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = (cardCaracs.scoringEffect as ScoringIfHiddenCard).value
    console.log('score : ', value * panorama.filter(item => item.location.rotation !== undefined).length > 0 ? 1 : 0)
    return value * panorama.filter(item => item.location.rotation !== undefined).length > 0 ? 1 : 0
  }

  getScoreByGoldOnCard(card: MaterialItem, playerId: number): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = (cardCaracs.scoringEffect as ScoringByGoldOnCard).value
    const goldOnCard = this.countPlayerGoldOnCard(playerId, card)
    console.log('score : ', goldOnCard * value)
    return goldOnCard * value
  }

  countPlayerGoldOnCard(player: PlayerId, card: MaterialItem) {
    return this.getPlayerGoldOnCards(player)
      .filter(item => item.location.x === card.location.x && item.location.y === card.location.y)
      .getQuantity()
  }

  getScoreByGoldOnAllCards(card: MaterialItem, playerId: number): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = (cardCaracs.scoringEffect as ScoringByGoldOnAllCards).value
    const goldOnAllCards = this.countPlayerGoldOnCards(playerId)
    console.log('score : ', value * goldOnAllCards)
    return value * goldOnAllCards
  }

  getRationnalizedPanorama(panorama: MaterialItem[]): MaterialItem[] {
    const maxX = Math.max(...panorama.map(item => item.location.x!))
    const maxY = Math.max(...panorama.map(item => item.location.y!))
    const rationnalizedPanorama = panorama.map(item => {
      const result = item
      if (maxX === 2) {
        result.location.x = result.location.x! - 1
      } else if (maxX === 0) {
        result.location.x = result.location.x! + 1
      }
      if (maxY === 2) {
        result.location.y = result.location.y! - 1
      } else if (maxY === 0) {
        result.location.y = result.location.y! + 1
      }
      return result

    })
    return rationnalizedPanorama
  }

}