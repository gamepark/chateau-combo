import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { PerGoldInPurse } from '../material/Condition'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { hasPurse } from '../material/Scoring'
import { PlayerId } from '../PlayerId'

export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    // Moving the remaining money
    for (const player of this.game.players) {
      const cardsToFill = this
        .getPanoramaWithoutHiddenCards(player)
        .id<CardId>(id => hasPurse(id.front))

      for (const [index, card] of cardsToFill.entries) {
        const playerGoldStock = this.getPlayerGoldStock(player)
        if (playerGoldStock.getQuantity() === 0) continue

        const goldAlreadyOnCard = this.countPlayerGoldOnCard(index)
        if (goldAlreadyOnCard < (cardCharacteristics[card.id.front].scoring.condition as PerGoldInPurse).limit) {
          moves.push(
            ...playerGoldStock
              .moveItems(
                {
                  type: LocationType.OnCard,
                  player,
                  parent: index
                }, Math.min((cardCharacteristics[card.id.front].scoring.condition as PerGoldInPurse).limit - goldAlreadyOnCard, playerGoldStock.getQuantity())
              ))
        }
      }

    }

    moves.push(this.endGame())
    return moves
  }

  getPlayerGoldStock(player: PlayerId) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerGoldStock)
      .player(player)
  }

  countPlayerGoldOnCard(cardIndex: number) {
    return this.material(MaterialType.GoldCoin).location(LocationType.OnCard).parent(cardIndex).getQuantity()
  }

  getPanorama(player: PlayerId) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(player)
  }

  getPanoramaWithoutHiddenCards(player: PlayerId) {
    return this.getPanorama(player).location(l => l.rotation === undefined)
  }
}

