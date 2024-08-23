import { MaterialItem, MaterialMove, MaterialRulesPart, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { LocationType } from '../material/LocationType'
import { cardCharacteristics, CardPattern, howManyTargettedBlazon } from '../CardCharacteristics'

export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
        const moves: MaterialMove[] = []

        const panoramaAndScoreOfPlayers = this.game.players.map(player => ({player, panorama:this.panorama.player(player), score:0}))
        panoramaAndScoreOfPlayers.forEach(panoramaObject => {
            panoramaObject.panorama.getItems().map(card => {
                return getScoreOfTheCard(card , panoramaObject.panorama.getItems())
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

}

function getScoreOfTheCard(card:MaterialItem<number, number>, panorama:MaterialItem[]):number{
    const cardCaracs = cardCharacteristics[card.id]

    if (cardCaracs.scoringEffect !== undefined){
        switch (cardCaracs.scoringEffect.type){
            case ScoringType.ByBlazon:
                return getScoreByBlazon(card, panorama)
        }
    } else {
        return 0
    }

function getScoreByBlazon(card:MaterialItem<number, number>, panorama:MaterialItem[]):number{

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


    // Pieces sur la carte
    // Blason ligne / colonne / ligne & colonne
    // Position sur la grille
    // Missing blazon
    // Cartes à X blason
    // Banner
    // Cles restantes tresor
    // Reductions
    // groupe de blasons
    // Groupe de banners
    // Coutant X ou plus // Coutant exactement X
    // Cartes où l'argent est stockable
    // Si carte retournee


    return 0

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
    ByBanner,
    ByKeys,
    ByDiscount,
}