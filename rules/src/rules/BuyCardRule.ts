import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { BannerType, cardCharacteristics, getBanner } from '../CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

// PlayerTurnRule => game.rule.player !== undefined
// SimultaneousRule => game.rule.players !== undefined
// MaterialRulePart => Rien

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const gold = this.gold
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const cards = this.riverCards
    const buyableCards = cards
      .filter((item) => cardCharacteristics[item.id].cost <= gold)

    return availableSpaces.flatMap((space) => {
      return [
        ...buyableCards.moveItems(space),
        ...cards.moveItems({ ...space, rotation: true }),
      ]
    })
  }

  get gold() {
    return this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(this.player).getQuantity()
  }

  get riverCards() {
    const banner = this
      .material(MaterialType.MessengerToken)
      .getItem()!.location.id

    return this
      .material(MaterialType.Card)
      .location(banner === BannerType.NobleBanner? LocationType.NobleRiver: LocationType.VillageRiver)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard) {
      if (move.location.rotation !== undefined) return []

      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
      const moves: MaterialMove[] = []

      const deckLocationToDrawFrom = (getBanner(item.id) === BannerType.NobleBanner) ? LocationType.NobleDeck : LocationType.VillageDeck
      //const deckToDrawFrom = this.material(MaterialType.Card).location(deckLocationToDrawFrom).deck()

      moves.push(
        ...this
          .material(MaterialType.GoldCoin)
          .location(LocationType.PlayerGoldStock)
          .player(this.player)
          .deleteItems(cardCharacteristics[item.id].cost)
      )

      this.memorize(Memory.PlacedCard, move.itemIndex)
      moves.push(this.startRule(RuleId.MoveMessenger))

      return moves
    } else {
      return []
    }
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