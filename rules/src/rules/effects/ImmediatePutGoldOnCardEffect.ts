import { MaterialMove } from '@gamepark/rules-api'
import { CardId } from '../../material/Card'
import { cardCharacteristics } from '../../material/CardCharacteristics'
import { coinsMoney } from '../../material/Coin'
import { PerGoldInPurse } from '../../material/Condition'
import { PutGoldOnCard } from '../../material/Effect'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { hasPurse } from '../../material/Scoring'
import { AbstractImmediateEffect } from './AbstractImmediateEffect'

export class ImmediatePutGoldOnCardEffect extends AbstractImmediateEffect<PutGoldOnCard> {


  getEffectMoves(effect: PutGoldOnCard) {

    const moves: MaterialMove[] = []
    const panorama = this.panorama

    const cardsWithPurse = panorama.location(location => !location.rotation).id<CardId>(id => hasPurse(id.front))
    const cardsSpace: { cardIndex: number, space: number }[] = []
    for (const [index, card] of cardsWithPurse.entries) {
      const goldCardCanStore = (cardCharacteristics[card.id.front].scoring.condition as PerGoldInPurse).limit
      const goldAlreadyOnCard = coinsMoney.count(this.material(MaterialType.GoldCoin).location(LocationType.OnCard).parent(index))
      if (goldCardCanStore - goldAlreadyOnCard > 0) {
        cardsSpace.push({ cardIndex: index, space: goldCardCanStore - goldAlreadyOnCard })
      }
    }
    if (effect.cardsLimit) {
      cardsSpace.sort((a, b) => b.space - a.space)
      cardsSpace.splice(effect.cardsLimit)
    }

    for (const { cardIndex, space } of cardsSpace) {
      moves.push(...coinsMoney.createOrDelete(
        this.material(MaterialType.GoldCoin),
        {
          type: LocationType.OnCard,
          player: this.player,
          parent: cardIndex
        },
        Math.min(effect.gold ?? Infinity, space)))
    }

    return moves

  }
}

