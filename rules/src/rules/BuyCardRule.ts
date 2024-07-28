import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BannerType, CardObjects } from '../CardProperties'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'

// PlayerTurnRule => game.rule.player !== undefined
// SimultaneousRule => game.rule.players !== undefined
// MaterialRulePart => Rien

export class BuyCardRule extends PlayerTurnRule {

  getLegalMoves(): MaterialMove<number, number, number>[] {
    const goldAmount = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(this.player).getQuantity()
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const buyableCards = this
      .material(MaterialType.Card)
      .location((l) => l.type === LocationType.VillageRiver || l.type === LocationType.NobleRiver)
      .filter((item) => {
        const definition = CardObjects[item.id]
        const cost = definition.cost
        return cost <= goldAmount
      })

    return availableSpaces.flatMap((space) => {
      return buyableCards.moveItems(space)
    })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard) {

      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
      const moves: MaterialMove[] = []

      const deckLocationToDrawFrom = (CardObjects[item.id].banner === BannerType.NobleBanner) ? LocationType.NobleDeck : LocationType.VillageDeck
      const deckToDrawFrom = this.material(MaterialType.Card).location(deckLocationToDrawFrom).deck()

      moves.push(
        ...this
          .material(MaterialType.GoldCoin)
          .location(LocationType.PlayerGoldStock)
          .player(this.player)
          .deleteItems(CardObjects[item.id].cost)
      )

      return moves
    } else {
      return []
    }
  }

  getPlayerMoves() {
    return []
  }
}


/**
 * items: {
 *    [MaterialType....]: [
 *      0{
 *        id: number | { front: number, back: number },
 *        location: {
 *          type: LocationType...,
 *          id? : any,
 *          x: number,
 *          y: number,
 *          z: number,
 *          rotation: any
 *          player: number
 *        }
 *      }, 1{
 *        id: number | { front: number, back: number },
 *        location: {
 *          type: LocationType...,
 *          id? : any,
 *          x: number,
 *          y: number,
 *          z: number,
 *          rotation: any
 *          player: number
 *        }
 *      }
 *    ]
 * }
 */