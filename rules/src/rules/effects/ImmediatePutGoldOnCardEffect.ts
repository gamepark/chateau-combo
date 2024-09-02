import { MaterialMove } from '@gamepark/rules-api'
import { cardCharacteristics } from '../../material/CardCharacteristics'
import { PerGoldInPurse } from '../../material/Condition'
import { ImmediateEffectType } from '../../material/ImmediateEffect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { hasPurse } from '../../material/Scoring'

import { AbstractImmediateEffect } from './AbstractImmediateEffect'


export type PutGoldOnCardEffect = {
    type: ImmediateEffectType.PutGoldOnCard,
    goldPut: number;
    putMethod: PutMethod
}

export class ImmediatePutGoldOnCardEffect extends AbstractImmediateEffect<PutGoldOnCardEffect> {

    
    getEffectMoves(effect: PutGoldOnCardEffect) {

        const moves: MaterialMove[] = []
        const panorama = this.panorama 

        if (effect.putMethod === PutMethod.onEach){
            const cardsToPutGoldOn = panorama.filter(item => item.location.rotation === undefined 
                && cardCharacteristics[item.id.front].scoringEffect !== undefined
                && hasPurse(item.id.front))
            cardsToPutGoldOn.getItems().forEach(card => {
                const goldCardCanStore = (cardCharacteristics[card.id.front].scoringEffect.condition as PerGoldInPurse).limit
                const goldAlreadyOnCard = this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(this.player)
                    .filter(gold => gold.location.x === card.location.x && gold.location.y === card.location.y).getQuantity()
                if (goldCardCanStore - goldAlreadyOnCard !== 0){
                    moves.push(this.material(MaterialType.GoldCoin).createItem({
                        location:{
                            type: LocationType.PlayerBoard,
                            player: this.player,
                            x:card.location.x,
                            y:card.location.y
                        },
                        quantity:Math.min(effect.goldPut, goldCardCanStore - goldAlreadyOnCard)
                    }))
                }
            })

        } else if (effect.putMethod === PutMethod.onTwoBest){
            const cardsToPutGoldOn = panorama.filter(item => item.location.rotation === undefined 
                && cardCharacteristics[item.id.front].scoringEffect !== undefined
                && hasPurse(item.id.front))

            const getBestTwoCardsToPutGoldOn = cardsToPutGoldOn.getItems().sort((card1, card2) => { 
                const goldCard1CanStore = (cardCharacteristics[card1.id.front].scoringEffect.condition as PerGoldInPurse).limit
                const goldAlreadyOnCard1 = this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(this.player)
                    .filter(gold => gold.location.x === card1.location.x && gold.location.y === card1.location.y).getQuantity()
                const goldMissingOnCard1 = goldCard1CanStore - goldAlreadyOnCard1
                const goldCard2CanStore = (cardCharacteristics[card2.id.front].scoringEffect.condition as PerGoldInPurse).limit
                const goldAlreadyOnCard2 = this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(this.player)
                    .filter(gold => gold.location.x === card2.location.x && gold.location.y === card2.location.y).getQuantity()
                const goldMissingOnCard2 = goldCard2CanStore - goldAlreadyOnCard2

                return goldMissingOnCard2 - goldMissingOnCard1 }).splice(0,2)

            getBestTwoCardsToPutGoldOn.forEach(card => {
                const goldCardCanStore = (cardCharacteristics[card.id.front].scoringEffect.condition as PerGoldInPurse).limit
                const goldAlreadyOnCard = this.material(MaterialType.GoldCoin).location(LocationType.PlayerBoard).player(this.player)
                    .filter(gold => gold.location.x === card.location.x && gold.location.y === card.location.y).getQuantity()
                moves.push(this.material(MaterialType.GoldCoin).createItem({
                    location:{
                        type: LocationType.PlayerBoard,
                        player: this.player,
                        x:card.location.x,
                        y:card.location.y
                    },
                    quantity:goldCardCanStore - goldAlreadyOnCard
                }))
            })


        }

        return moves

    }
}


export enum PutMethod {
    onEach = 1,
    onBest,
    onTwoBest
  }