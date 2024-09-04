import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { coinsMoney } from '../material/Coin'
import { ConditionType } from '../material/Condition'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../PlayerId'

export class EndGameRule extends MaterialRulesPart {
  getAutomaticMoves() {
    // Moving the remaining money
    for (const player of this.game.players) {
      const playerGold = coinsMoney.count(this.getPlayerCoins(player))
      if (playerGold > 0) {
        const cards = this.getPanoramaWithoutHiddenCards(player)
        for (const [index, card] of cards.entries) {
          const scoring = cardCharacteristics[card.id.front].scoring
          if (scoring.condition.type === ConditionType.PerGoldInPurse) {
            const goldAlreadyOnCard = this.countPlayerGoldOnCard(index)
            const spaceLeft = scoring.condition.limit - goldAlreadyOnCard
            if (spaceLeft > 0) {
              return coinsMoney.moveAmount(
                this.material(MaterialType.GoldCoin),
                {type: LocationType.PlayerGoldStock, player},
                { type: LocationType.OnCard, player, parent: index },
                Math.min(spaceLeft, playerGold)
              )
            }
          }
        }
      }
    }
    return [this.endGame()]
  }

  getPlayerCoins(player: PlayerId) {
    return this
      .material(MaterialType.GoldCoin)
      .location(LocationType.PlayerGoldStock)
      .player(player)
  }

  countPlayerGoldOnCard(cardIndex: number) {
    return coinsMoney.count(this.material(MaterialType.GoldCoin).location(LocationType.OnCard).parent(cardIndex))
  }

  getPanorama(player: PlayerId) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(player)
  }

  getPanoramaWithoutHiddenCards(player: PlayerId) {
    return this.getPanorama(player).location(l => l.rotation === undefined).sort(i => i.location.x!).sort(i => i.location.y!)
  }
}

