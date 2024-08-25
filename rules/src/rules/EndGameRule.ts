import { Coordinates, MaterialItem, MaterialMove, MaterialRulesPart, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { LocationType } from '../material/LocationType'
import { BannerType, BlazonType, cardCharacteristics, CardPattern, getBanner, getBlazons, howManyTargettedBlazon, isNobleDiscount, isVillageDiscount } from '../CardCharacteristics'
import { isNoble } from '../Card'
import { isRespectingCostCondition } from './effects/AbstractImmediateEffect'
import { t } from 'i18next'

export class EndGameRule extends MaterialRulesPart {
    onRuleStart() {
        const moves: MaterialMove[] = []

        // Moving the remaining money
        this.game.players.forEach(player => {
            const cardsToFill = this.panorama.player(player).getItems().filter(item => item.location.rotation === undefined && cardCharacteristics[item.id].scoringEffect?.type === ScoringType.ByGoldOnCard)
            cardsToFill.forEach(card => {
                const playerGoldStock = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(player).getQuantity()
                if(playerGoldStock === 0){
                    return 
                } else {
                    const goldAlreadyOnCard = this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(player)
                    .filter(item => item.location.x === card.location.x && item.location.y === card.location.y)
                    .getQuantity()
                    if (goldAlreadyOnCard < cardCharacteristics[card.id].scoringEffect!.limit){
                        moves.push(...this.material(MaterialType.GoldCoin)
                        .location(LocationType.PlayerGoldStock)
                        .player(player)
                        .moveItems(
                             {
                                type:LocationType.PlayerBoard,
                                player,
                                x:card.location.x,
                                y:card.location.y,
                            }, Math.min(cardCharacteristics[card.id].scoringEffect!.limit - goldAlreadyOnCard, playerGoldStock)
                            
                        ))
                    }
                }
            })

        })


        // TODO : use this only after the end of the game !
        // Calculating final score
        const panoramaAndScoreOfPlayers = this.game.players.map(player => ({player, panorama:this.panoramaWithoutHiddenCards.player(player), score:0}))
        panoramaAndScoreOfPlayers.forEach(panoramaObject => {
            const playerKeys = this.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(panoramaObject.player).getQuantity()
            panoramaObject.panorama.getItems().map(card => {
                return card.location.rotation === undefined ? this.getScoreOfTheCard(card , panoramaObject.panorama.getItems(), panoramaObject.player) : 0
            })
        })

        moves.push(this.rules().endGame())
        return moves
  }

  get placedCard() {
    return this
        .material(MaterialType.Card)
        .getItem(this.remind(Memory.PlacedCard))
  }

  get panorama() {
    return this
        .material(MaterialType.Card)
        .location(LocationType.PlayerBoard)
  }

  get panoramaWithoutHiddenCards(){
    return this.panorama.filter(item => item.location.rotation === undefined)
  }

    getScoreOfTheCard(card:MaterialItem<number, number>, panorama:MaterialItem[], playerId:number):number{

        const cardCaracs = cardCharacteristics[card.id]
        const playerKeys = this.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(playerId).getQuantity()
        if (cardCaracs.scoringEffect !== undefined){
            switch (cardCaracs.scoringEffect.type){
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
                    return this.getScoreIfHiddenCard(card, this.panorama.getItems())
                case ScoringType.ByBlazonCount:
                    return this.getScoreByBlazonQuantity(card, panorama)
                case ScoringType.ByBannerGroup:
                    return this.getScoreByBannerGroup(card, panorama)
                case ScoringType.ByGoldOnCard:
                    return this.getScoreByGoldOnCard(card, playerId)
                case ScoringType.ByGoldOnAllCards:
                    return this.getScoreByGoldOnAllCards(card, playerId)
            }
        } else {
            return 0
        }

    }

    getScoreByBanner(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const banner = cardCaracs.scoringEffect!.bannerType
        console.log("score : ", value * panorama.filter(item => banner === BannerType.NobleBanner ? isNoble(item.id) : !isNoble(item.id)).length)
        return value * panorama.filter(item => banner === BannerType.NobleBanner ? isNoble(item.id) : !isNoble(item.id)).length
    }

    getScoreByBannerGroup(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const bannerConditions:{nobleBanners:number, villageBanners:number} = cardCaracs.scoringEffect!.bannerConditions
        const playerBannerCount: Record<number, number> = {
            [BannerType.NobleBanner] : 0,
            [BannerType.VillageBanner] : 0,
        }

        panorama.forEach(item => playerBannerCount[getBanner(item.id)] += 1)

        if(bannerConditions.nobleBanners !== 0){
            playerBannerCount[BannerType.NobleBanner] = playerBannerCount[BannerType.NobleBanner] % bannerConditions.nobleBanners
        } 
        if(bannerConditions.villageBanners !== 0){
            playerBannerCount[BannerType.VillageBanner] = playerBannerCount[BannerType.VillageBanner] % bannerConditions.villageBanners
        }

        console.log("score : ", value * Math.min(...Object.values(playerBannerCount)))
        return value * Math.min(...Object.values(playerBannerCount))
    }


    getScoreByBlazon(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const blazon = cardCaracs.scoringEffect!.blazonCondition.blazonType
        const value = cardCaracs.scoringEffect!.value
        const cardCoordinates = {x:card.location.x!, y:card.location.y!}
        const cardsToCheck = cardCaracs.scoringEffect!.blazonCondition.line !== true && cardCaracs.scoringEffect!.blazonCondition.column !== true 
            ? panorama
            : panorama.filter(item => (
            (cardCaracs.scoringEffect!.blazonCondition.line === true && item.location.y === cardCoordinates.y) ||
            (cardCaracs.scoringEffect!.blazonCondition.column === true && item.location.x === cardCoordinates.x)
        ))

        if (blazon === BlazonType.Different){
            const howManyDifferentBlazons:BlazonType[] = []
            cardsToCheck.forEach(item => {
                getBlazons(item.id).forEach(blazon => howManyDifferentBlazons.includes(blazon) === false && howManyDifferentBlazons.push(blazon))
            })
            console.log("score : ", value * howManyDifferentBlazons.length)
            return value * howManyDifferentBlazons.length
        } else {
            console.log("score : ", value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazon), 0))
            return value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazon), 0)      
        }
    }

    getScoreByBlazonGroup(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const blazonGroup:BlazonType[] = cardCaracs.scoringEffect!.blazonGroupType

        if (blazonGroup[0] === BlazonType.Identical){
        
            const playerBlazonCounting: Record<number, number> = {
                [BlazonType.Noble] : 0,
                [BlazonType.Prayer] : 0,
                [BlazonType.Teacher] : 0,
                [BlazonType.Soldier] : 0,
                [BlazonType.Worker] : 0,
                [BlazonType.Farmer] : 0,
            }

            panorama.forEach(item => 
                getBlazons(item.id).forEach(blazon => playerBlazonCounting[blazon] += 1)
            )
            console.log("score : ", value * Object.values(playerBlazonCounting).reduce((acc, cur) => acc + cur % 3, 0))
            return value * Object.values(playerBlazonCounting).reduce((acc, cur) => acc + cur % 3, 0)

        } else {
            console.log("score : ", value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazonToCount), 0))))
            return value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazonToCount), 0)))
        }
    }

    getScoreByMissingBlazon(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const missingBlazon = cardCaracs.scoringEffect!.missingBlazonType
        const howManyDifferentBlazons:BlazonType[] = []
        panorama.forEach(item => {
            getBlazons(item.id).forEach(blazon => howManyDifferentBlazons.includes(blazon) === false && howManyDifferentBlazons.push(blazon))
        })
        console.log("score : ", panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, missingBlazon), 0) > 0 ? 0 : value)
        return missingBlazon === BlazonType.Different 
            ? value * (6 - howManyDifferentBlazons.length)
            : panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, missingBlazon), 0) > 0 ? 0 : value
    }

    getScoreByBlazonQuantity(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const quantityToCheck = cardCaracs.scoringEffect!.blazonQuantity
        console.log("score : ", value * panorama.filter(item => cardCharacteristics[item.id].blazon.lastIndexOf === quantityToCheck).length)
        return value * panorama.filter(item => cardCharacteristics[item.id].blazon.lastIndexOf === quantityToCheck).length
    }

    getScoreByPosition(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const validPositions:XYCoordinates[] = cardCaracs.scoringEffect!.validPositions
        const rationnalizedPanorama = this.getRationnalizedPanorama(panorama)
        const cardCoordinates = {x: rationnalizedPanorama.find(item => item.id === card.id)!.location.x!, y:rationnalizedPanorama.find(item => item.id === card.id)!.location.y!}

        console.log("score : ", validPositions.filter(position => position.x === cardCoordinates.x && position.y === cardCoordinates.y).length * value)
        return validPositions.filter(position => position.x === cardCoordinates.x && position.y === cardCoordinates.y).length * value
    }

    getScoreByKeys(card:MaterialItem, keys:number):number{
        console.log("score carte n° ", card.id)
        console.log("score : ", keys * cardCharacteristics[card.id].scoringEffect!.value)
        return keys * cardCharacteristics[card.id].scoringEffect!.value
    }

    getScoreByDiscountCards(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        console.log("score : ", value * panorama.filter(item => isNobleDiscount(item.id) || isVillageDiscount(item.id)).length)
        return value * panorama.filter(item => isNobleDiscount(item.id) || isVillageDiscount(item.id)).length
    }

    getScoreByCost(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        console.log("score : ", value * panorama.reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id, cardCaracs.scoringEffect!.cardCost) ? 1 : 0)) , 0 ) )
        return value * panorama.reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id, cardCaracs.scoringEffect!.cardCost) ? 1 : 0)) , 0 )
    }

    getScoreIfHiddenCard(card:MaterialItem, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        console.log("score : ", value * panorama.filter(item => item.location.rotation !== undefined).length > 0 ? 1 : 0)
        return value * panorama.filter(item => item.location.rotation !== undefined).length > 0 ? 1 : 0
    }

    getScoreByGoldOnCard(card:MaterialItem, playerId:number):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const goldOnCard = this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(playerId)
        .filter(item => item.location.x === card.location.x && item.location.y === card.location.y).getQuantity()
        console.log("score : ", goldOnCard * value)
        return goldOnCard * value
    }

    getScoreByGoldOnAllCards(card:MaterialItem, playerId:number):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        console.log("score : ", value * this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(playerId).getQuantity())
        return value * this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(playerId).getQuantity()
    }

    getRationnalizedPanorama(panorama:MaterialItem[]):MaterialItem[]{
    const maxX = Math.max(...panorama.map(item => item.location.x!))
    const maxY = Math.max(...panorama.map(item => item.location.y!))
    const rationnalizedPanorama = panorama.map(item => {
        const result = item
        if (maxX === 2){
            result.location.x = result.location.x! - 1
        } else if (maxX === 0){
            result.location.x = result.location.x! + 1
        }
        if (maxY === 2){
            result.location.y = result.location.y! - 1
        } else if (maxY === 0){
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