import { MaterialItem, MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { BlazonType, cardCharacteristics, getBlazons, howManyTargettedBlazon, isNobleDiscount, isVillageDiscount } from '../CardCharacteristics'
import { Place } from '../material/Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { isRespectingCostCondition } from './effects/AbstractImmediateEffect'

export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    // Moving the remaining money
    this.game.players.forEach(player => {
      const cardsToFill = this
        .getPanoramaWithoutHiddenCards(player)
        .filter(item => cardCharacteristics[item.id.front].scoringEffect?.type === ScoringType.ByGoldOnCard)

      cardsToFill.forEach(card => {
        const playerGoldStock = this.getPlayerGoldStock(player)
        if (playerGoldStock.getQuantity() === 0) return

        const goldAlreadyOnCard = this.countPlayerGoldOnCard(player, card)
        if (goldAlreadyOnCard < cardCharacteristics[card.id.front].scoringEffect!.limit) {
          moves.push(
            ...playerGoldStock
              .moveItems(
                {
                  type: LocationType.PlayerBoard,
                  player,
                  x: card.location.x,
                  y: card.location.y
                }, Math.min(cardCharacteristics[card.id.front].scoringEffect!.limit - goldAlreadyOnCard, playerGoldStock.getQuantity())
              ))
        }
      })

    })


    // TODO : use this only after the end of the game !
    // Calculating final score
    const panoramaAndScoreOfPlayers = this.game.players.map(player => ({ player, panorama: this.getPanoramaWithoutHiddenCards(player), score: 0 }))

    panoramaAndScoreOfPlayers.forEach(panoramaObject => {
      panoramaObject.panorama.map(card => {
        return card.location.rotation === undefined ? this.getScoreOfTheCard(card, panoramaObject.panorama, panoramaObject.player) : 0
      })
    })

    moves.push(this.rules().endGame())
    return moves
  }

  getPlayerGoldStock(player: PlayerColor) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerGoldStock)
      .player(player)
  }

  getPlayerKeyStock(player: PlayerColor) {
    return this
      .material(MaterialType.Key)
      .location(LocationType.PlayerKeyStock)
      .player(player)
  }

  countPlayerGoldOnCard(player: PlayerColor, card: MaterialItem) {
    return this.getPlayerGoldOnCards(player)
      .filter(item => item.location.x === card.location.x && item.location.y === card.location.y)
      .getQuantity()
  }

  countPlayerGoldOnCards(player: PlayerColor) {
    return this.getPlayerGoldOnCards(player).getQuantity()
  }

  getPlayerGoldOnCards(player: PlayerColor) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerBoard)
      .player(player)
  }

  getPanorama(player: PlayerColor) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(player)
      .getItems()
  }

  getPanoramaWithoutHiddenCards(player: PlayerColor) {
    return this.getPanorama(player).filter(item => item.location.rotation === undefined)
  }

  getScoreOfTheCard(card: MaterialItem<number, number>, panorama: MaterialItem[], playerId: number): number {

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
          return this.getScoreIfHiddenCard(card, this.getPanorama(playerId))
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
    const value = cardCaracs.scoringEffect!.value
    const banner = cardCaracs.scoringEffect!.bannerType
    console.log('score : ', value * panorama.filter(item => banner === item.id.back).length)
    return value * panorama.filter(item => banner === item.id.back).length
  }

  getScoreByBannerGroup(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    const bannerConditions: { nobleBanners: number, villageBanners: number } = cardCaracs.scoringEffect!.bannerConditions
    const playerBannerCount: Record<number, number> = {
      [Place.Castle]: 0,
      [Place.Village]: 0
    }

    panorama.forEach(item => playerBannerCount[item.id.back] += 1)

    if (bannerConditions.nobleBanners !== 0) {
      playerBannerCount[Place.Castle] = playerBannerCount[Place.Castle] % bannerConditions.nobleBanners
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
    const blazon = cardCaracs.scoringEffect!.blazonCondition.blazonType
    const value = cardCaracs.scoringEffect!.value
    const cardCoordinates = { x: card.location.x!, y: card.location.y! }
    const cardsToCheck = !cardCaracs.scoringEffect!.blazonCondition.line && !cardCaracs.scoringEffect!.blazonCondition.column
      ? panorama
      : panorama.filter(item => (
        (!!cardCaracs.scoringEffect!.blazonCondition.line && item.location.y === cardCoordinates.y) ||
        (!!cardCaracs.scoringEffect!.blazonCondition.column && item.location.x === cardCoordinates.x)
      ))

    if (blazon === BlazonType.Different) {
      const howManyDifferentBlazons: BlazonType[] = []
      cardsToCheck.forEach(item => {
        getBlazons(item.id.front).forEach(blazon => !howManyDifferentBlazons.includes(blazon) && howManyDifferentBlazons.push(blazon))
      })
      console.log('score : ', value * howManyDifferentBlazons.length)
      return value * howManyDifferentBlazons.length
    } else {
      console.log('score : ', value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id.front, blazon), 0))
      return value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id.front, blazon), 0)
    }
  }

  getScoreByBlazonGroup(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    const blazonGroup: BlazonType[] = cardCaracs.scoringEffect!.blazonGroupType

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
      console.log('score : ', value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id.front, blazonToCount), 0))))
      return value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id.front, blazonToCount), 0)))
    }
  }

  getScoreByMissingBlazon(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    const missingBlazon = cardCaracs.scoringEffect!.missingBlazonType
    const howManyDifferentBlazons: BlazonType[] = []
    panorama.forEach(item => {
      getBlazons(item.id.front).forEach(blazon => !howManyDifferentBlazons.includes(blazon) && howManyDifferentBlazons.push(blazon))
    })
    console.log('score : ', panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id.front, missingBlazon), 0) > 0 ? 0 : value)
    return missingBlazon === BlazonType.Different
      ? value * (6 - howManyDifferentBlazons.length)
      : panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id.front, missingBlazon), 0) > 0 ? 0 : value
  }

  getScoreByBlazonQuantity(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    const quantityToCheck = cardCaracs.scoringEffect!.blazonQuantity
    console.log('score : ', value * panorama.filter(item => cardCharacteristics[item.id.front].blazon.lastIndexOf === quantityToCheck).length)
    return value * panorama.filter(item => cardCharacteristics[item.id.front].blazon.lastIndexOf === quantityToCheck).length
  }

  getScoreByPosition(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    const validPositions: XYCoordinates[] = cardCaracs.scoringEffect!.validPositions
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
    console.log('score : ', keys * cardCharacteristics[card.id.front].scoringEffect!.value)
    return keys * cardCharacteristics[card.id.front].scoringEffect!.value
  }

  getScoreByDiscountCards(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    console.log('score : ', value * panorama.filter(item => isNobleDiscount(item.id.front) || isVillageDiscount(item.id.front)).length)
    return value * this.countDiscountCards(panorama)
  }

  countDiscountCards(panorama: MaterialItem[]) {
    return panorama
      .filter((i) => isNobleDiscount(i.id.front) || isVillageDiscount(i.id.front))
      .length
  }

  getScoreByCost(card: MaterialItem, panorama: MaterialItem[]): number {
    console.log('score carte n° ', card.id.front)
    const cardCaracs = cardCharacteristics[card.id.front]
    const value = cardCaracs.scoringEffect!.value
    console.log('score : ', value * panorama.reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id.front, cardCaracs.scoringEffect!.cardCost) ? 1 : 0)), 0))
    return value * panorama.reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id.front, cardCaracs.scoringEffect!.cardCost) ? 1 : 0)), 0)
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

export enum ScoringType {
  ByBlazon = 1,
  ByBlazonGroup,
  ByBlazonCount,
  IfMissingBlazon,
  ByBanner,
  ByBannerGroup,
  ByKeys,
  ByDiscount,
  ByPosition,
  ByCost,
  IfHiddenCard,
  ByGoldOnCard,
  ByGoldOnAllCards
}