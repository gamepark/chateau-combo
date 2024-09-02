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
import { BlazonType, cardCharacteristics, countBlazonsOfType, getBlazons, isDiscount } from './material/CardCharacteristics'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Place } from './material/Place'
import {
  ScoringByBanner,
  ScoringByBannerGroup,
  ScoringByBlazon,
  ScoringByBlazonCount,
  ScoringByBlazonGroup, ScoringByCost, ScoringByDiscount, ScoringByKeys, ScoringByPosition,
  ScoringIfMissingBlazon,
  ScoringType
} from './material/Scoring'
import { PlayerId } from './PlayerId'
import { BuyCardRule } from './rules/BuyCardRule'
import { ChooseBetweenRule } from './rules/ChooseBetweenRule'
import { DiscardFromRiverRule } from './rules/DiscardFromRiverRule'
import { isRespectingCostCondition } from './rules/effects/AbstractImmediateEffect'
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
    return sumBy(tableau, card => this.getScoreOfTheCard(card, tableau))
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
      switch (cardCaracs.scoringEffect.type) {
        case ScoringType.ByBlazon:
          return this.getScoreByBlazon(card, panorama)
        case ScoringType.ByPosition:
          return this.getScoreByPosition(card, panorama)
        case ScoringType.ByKeys:
          return this.getScoreByKeys(card, playerKeys)
        case ScoringType.ByBanner:
          return this.getScoreByBanner(card, panorama)
        case ScoringType.ByBlazonGroup:
          return this.getScoreByBlazonGroup(card, panorama)
        case ScoringType.IfMissingBlazon:
          return this.getScoreByMissingBlazon(card, panorama)
        case ScoringType.ByDiscount:
          return this.getScoreByDiscountCards(card, panorama)
        case ScoringType.ByCost:
          return this.getScoreByCost(card, panorama)
        case ScoringType.IfHiddenCard:
          return this.getScoreIfHiddenCard(card, this.getTableau(playerId))
        case ScoringType.ByBlazonCount:
          return this.getScoreByBlazonQuantity(card, panorama)
        case ScoringType.ByBannerGroup:
          return this.getScoreByBannerGroup(card, panorama)
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

  getScoreByBannerGroup(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = (cardCaracs.scoringEffect as ScoringByBannerGroup).value
    const bannerConditions: { castleBanners: number, villageBanners: number } = (cardCaracs.scoringEffect as ScoringByBannerGroup).bannerConditions
    const playerBannerCount: Record<number, number> = {
      [Place.Castle]: 0,
      [Place.Village]: 0
    }

    panorama.forEach(item => playerBannerCount[item.id.back] += 1)

    if (bannerConditions.castleBanners !== 0) {
      playerBannerCount[Place.Castle] = playerBannerCount[Place.Castle] % bannerConditions.castleBanners
    }
    if (bannerConditions.villageBanners !== 0) {
      playerBannerCount[Place.Village] = playerBannerCount[Place.Village] % bannerConditions.villageBanners
    }

    console.log('score : ', value * Math.min(...Object.values(playerBannerCount)))
    return value * Math.min(...Object.values(playerBannerCount))
  }


  getScoreByBlazon(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const scoringEffect = cardCaracs.scoringEffect as ScoringByBlazon
    const blazon = scoringEffect.blazonCondition.blazonType
    const value = scoringEffect.value
    const cardCoordinates = { x: card.location.x!, y: card.location.y! }
    const cardsToCheck = !scoringEffect.blazonCondition.line && !scoringEffect.blazonCondition.column
      ? panorama
      : panorama.filter(item => (
        (!!scoringEffect.blazonCondition.line && item.location.y === cardCoordinates.y) ||
        (!!scoringEffect.blazonCondition.column && item.location.x === cardCoordinates.x)
      ))

    if (blazon === BlazonType.Different) {
      const howManyDifferentBlazons: BlazonType[] = []
      cardsToCheck.forEach(item => {
        getBlazons(item.id.front).forEach(blazon => !howManyDifferentBlazons.includes(blazon) && howManyDifferentBlazons.push(blazon))
      })
      console.log('score : ', value * howManyDifferentBlazons.length)
      return value * howManyDifferentBlazons.length
    } else {
      console.log('score : ', value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + countBlazonsOfType(currentCard.id.front, blazon), 0))
      return value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + countBlazonsOfType(currentCard.id.front, blazon), 0)
    }
  }

  getScoreByBlazonGroup(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const scoringEffect = cardCaracs.scoringEffect as ScoringByBlazonGroup
    const value = scoringEffect.value
    const blazonGroup: BlazonType[] = scoringEffect.blazonGroupType

    if (blazonGroup[0] === BlazonType.Identical) {

      const playerBlazonCounting: Record<number, number> = {
        [BlazonType.Noble]: 0,
        [BlazonType.Prayer]: 0,
        [BlazonType.Teacher]: 0,
        [BlazonType.Soldier]: 0,
        [BlazonType.Worker]: 0,
        [BlazonType.Farmer]: 0
      }

      panorama.forEach(item =>
        getBlazons(item.id.front).forEach(blazon => playerBlazonCounting[blazon] += 1)
      )
      console.log('score : ', value * Object.values(playerBlazonCounting).reduce((acc, cur) => acc + cur % 3, 0))
      return value * Object.values(playerBlazonCounting).reduce((acc, cur) => acc + cur % 3, 0)

    } else {
      console.log('score : ', value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + countBlazonsOfType(currentCard.id.front, blazonToCount), 0))))
      return value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + countBlazonsOfType(currentCard.id.front, blazonToCount), 0)))
    }
  }

  getScoreByMissingBlazon(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const scoringEffect = cardCaracs.scoringEffect as ScoringIfMissingBlazon
    const value = scoringEffect.value
    const missingBlazon = scoringEffect.missingBlazonType
    const howManyDifferentBlazons: BlazonType[] = []
    panorama.forEach(item => {
      getBlazons(item.id.front).forEach(blazon => !howManyDifferentBlazons.includes(blazon) && howManyDifferentBlazons.push(blazon))
    })
    console.log('score : ', panorama.reduce((cardAcc, currentCard) => cardAcc + countBlazonsOfType(currentCard.id.front, missingBlazon), 0) > 0 ? 0 : value)
    return missingBlazon === BlazonType.Different
      ? value * (6 - howManyDifferentBlazons.length)
      : panorama.reduce((cardAcc, currentCard) => cardAcc + countBlazonsOfType(currentCard.id.front, missingBlazon), 0) > 0 ? 0 : value
  }

  getScoreByBlazonQuantity(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const scoringEffect = cardCaracs.scoringEffect as ScoringByBlazonCount
    const value = scoringEffect.value
    const quantityToCheck = scoringEffect.blazonQuantity
    // TODO: fix that
    //console.log('score : ', value * panorama.filter(item => cardCharacteristics[item.id.front].blazon.lastIndexOf === quantityToCheck).length)
    return 0 //value * panorama.filter(item => cardCharacteristics[item.id.front].blazon.lastIndexOf === quantityToCheck).length
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

  getScoreByCost(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const scoringEffect = cardCaracs.scoringEffect as ScoringByCost
    const value = scoringEffect.value
    console.log('score : ', value * panorama.reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id.front, scoringEffect.cardCost) ? 1 : 0)), 0))
    return value * panorama.reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id.front, scoringEffect.cardCost) ? 1 : 0)), 0)
  }

  getScoreIfHiddenCard(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    console.log('score : ', value * panorama.filter(item => item.location.rotation !== undefined).length > 0 ? 1 : 0)
    return value * panorama.filter(item => item.location.rotation !== undefined).length > 0 ? 1 : 0
  }

  getScoreByGoldOnCard(card: MaterialItem, playerId: number): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
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
    const value = cardCaracs.scoringEffect!.value
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