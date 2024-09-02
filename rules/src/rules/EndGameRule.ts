import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { hasPurse, ScoringByGoldOnCard } from '../material/Scoring'
import { PlayerId } from '../PlayerId'

export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    // Moving the remaining money
    this.game.players.forEach(player => {
      const cardsToFill = this
        .getPanoramaWithoutHiddenCards(player)
        .filter(item => hasPurse(item.id.front))

      cardsToFill.forEach(card => {
        const playerGoldStock = this.getPlayerGoldStock(player)
        if (playerGoldStock.getQuantity() === 0) return

        const goldAlreadyOnCard = this.countPlayerGoldOnCard(player, card)
        if (goldAlreadyOnCard < (cardCharacteristics[card.id.front].scoringEffect as ScoringByGoldOnCard).limit) {
          moves.push(
            ...playerGoldStock
              .moveItems(
                {
                  type: LocationType.PlayerBoard,
                  player,
                  x: card.location.x,
                  y: card.location.y
                }, Math.min((cardCharacteristics[card.id.front].scoringEffect as ScoringByGoldOnCard).limit - goldAlreadyOnCard, playerGoldStock.getQuantity())
              ))
        }
      })

    })

    moves.push(this.endGame())
    return moves
  }

  getPlayerGoldStock(player: PlayerId) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerGoldStock)
      .player(player)
  }

  countPlayerGoldOnCard(player: PlayerId, card: MaterialItem) {
    return this.getPlayerGoldOnCards(player)
      .filter(item => item.location.x === card.location.x && item.location.y === card.location.y)
      .getQuantity()
  }

  getPlayerGoldOnCards(player: PlayerId) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerBoard)
      .player(player)
  }

  getPanorama(player: PlayerId) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(player)
      .getItems()
  }

  getPanoramaWithoutHiddenCards(player: PlayerId) {
    return this.getPanorama(player).filter(item => item.location.rotation === undefined)
  }
}

