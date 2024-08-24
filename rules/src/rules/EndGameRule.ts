import { Coordinates, MaterialItem, MaterialMove, MaterialRulesPart, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { LocationType } from '../material/LocationType'
import { BannerType, BlazonType, cardCharacteristics, CardPattern, howManyTargettedBlazon } from '../CardCharacteristics'
import { isNoble } from '../Card'

export class EndGameRule extends MaterialRulesPart {
    onRuleStart() {
        const moves: MaterialMove[] = []

        const panoramaAndScoreOfPlayers = this.game.players.map(player => ({player, panorama:this.panorama.player(player), score:0}))
        panoramaAndScoreOfPlayers.forEach(panoramaObject => {
            const playerKeys = this.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(panoramaObject.player).getQuantity()
            panoramaObject.panorama.getItems().map(card => {
                return this.getScoreOfTheCard(card , panoramaObject.panorama.getItems(), playerKeys)
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

    getScoreOfTheCard(card:MaterialItem<number, number>, panorama:MaterialItem[], playerKeys:number):number{

        const cardCaracs = cardCharacteristics[card.id]
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
                case ScoringType.ByMissingBlazon:
                    return this.getScoreByMissingBlazon(card, panorama)
            }
        } else {
            return 0
        }

        // Pieces sur la carte
        // Missing blazon
        // Cartes à X blason
        // Reductions
        // Groupe de banners
        // Coutant X ou plus // Coutant exactement X
        // Cartes où l'argent est stockable
        // Si carte retournee

        return 0

    }

    getScoreByBanner(card:MaterialItem, panorama:MaterialItem[]):number{
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const banner = cardCaracs.scoringEffect!.blazonCondition.bannerType
        return value * panorama.filter(item => banner === BannerType.NobleBanner ? isNoble(item.id) : !isNoble(item.id)).length
    }


    getScoreByBlazon(card:MaterialItem<number, number>, panorama:MaterialItem[]):number{
        console.log("score carte n° ", card.id)
        const cardCaracs = cardCharacteristics[card.id]
        const blazon = cardCaracs.scoringEffect!.blazonCondition.blazonType
        const value = cardCaracs.scoringEffect!.value
        const cardCoordinates = {x:card.location.x!, y:card.location.y!}
        const cardsToCheck = panorama.filter(item => item.location.rotation === undefined && (
            (cardCaracs.scoringEffect!.blazonCondition.line === true && item.location.y === cardCoordinates.y) ||
            (cardCaracs.scoringEffect!.blazonCondition.column === true && item.location.x === cardCoordinates.x)
        ))
        console.log("score : ", value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazon), 0))
        return value * cardsToCheck.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazon), 0)  

    }

    getScoreByBlazonGroup(card:MaterialItem, panorama:MaterialItem[]):number{
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const blazonGroup:BlazonType[] = cardCaracs.scoringEffect!.blazonGroupType
        return value * Math.min(...blazonGroup.map(blazonToCount => panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, blazonToCount), 0)))
    }

    getScoreByMissingBlazon(card:MaterialItem, panorama:MaterialItem[]):number{
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const missingBlazon = cardCaracs.scoringEffect!.missingBlazonType
        return panorama.reduce((cardAcc, currentCard) => cardAcc + howManyTargettedBlazon(currentCard.id, missingBlazon), 0) > 0 ? 0 : value
    }

    getScoreByPosition(card:MaterialItem<number, number>, panorama:MaterialItem[]):number{
        const cardCaracs = cardCharacteristics[card.id]
        const value = cardCaracs.scoringEffect!.value
        const validPositions:XYCoordinates[] = cardCaracs.scoringEffect!.validPositions
        const rationnalizedPanorama = this.getRationnalizedPanorama(panorama)
        const cardCoordinates = {x: rationnalizedPanorama.find(item => item.id === card.id)!.location.x!, y:rationnalizedPanorama.find(item => item.id === card.id)!.location.y!}

        return validPositions.filter(position => position.x === cardCoordinates.x && position.y === cardCoordinates.y).length * value
}

    getScoreByKeys(card:MaterialItem<number, number>, keys:number):number{
    return keys * cardCharacteristics[card.id].scoringEffect!.value
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

// Structure scoring : {type: ScoringType, value:number}
    // & condition

//    export type Condition = {
//        banner?: BannerType,
//        blazon?: BlazonType[]
//        blazonNumber?: number
//        cardCost?:{cost:number, sign:Sign}
//    }

export enum ScoringType {
    ByBlazon = 1,
    ByBlazonGroup,
    ByMissingBlazon,
    ByBanner,
    ByKeys,
    ByDiscount,
    ByPosition,
}