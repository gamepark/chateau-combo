import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { coins } from '../material/Coin'
import { ConditionType } from '../material/Condition'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'

/**
 * Each players move their remaining coins on the cards with a purse in their tableau
 */
export class EndGameRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const coinsMoney = this.material(MaterialType.GoldCoin).money(coins)
    for (const player of this.game.players) {
      const cards = this.getPanoramaWithoutHiddenCards(player)
      for (const [index, card] of cards.entries) {
        const scoring = cardCharacteristics[card.id.front].scoring
        if (scoring.condition.type === ConditionType.PerGoldInPurse) {
          const playerGold = coinsMoney.location(LocationType.PlayerGoldStock).player(player).count
          if (playerGold === 0) break
          const goldAlreadyOnCard = coinsMoney.location(LocationType.OnCard).parent(index).count
          const spaceLeft = scoring.condition.limit - goldAlreadyOnCard
          if (spaceLeft > 0) {
            moves.push(...coinsMoney.moveMoney(
              { type: LocationType.PlayerGoldStock, player },
              { type: LocationType.OnCard, player, parent: index },
              Math.min(spaceLeft, playerGold)
            ))
          }
        }
      }
    }
    moves.push(this.endGame())
    return moves
  }

  getPanorama(player: PlayerId) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Tableau)
      .player(player)
  }

  getPanoramaWithoutHiddenCards(player: PlayerId) {
    return this.getPanorama(player).location(l => l.rotation === undefined).sort(i => i.location.x!).sort(i => i.location.y!)
  }
}

