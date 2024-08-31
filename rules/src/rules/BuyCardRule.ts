import { isDeleteItemType, isMoveItemType, ItemMove, Location, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics, isDiscountForPlace } from '../CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const gold = this.gold
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const moves: MaterialMove[] = []

    if (this.keys.getQuantity() && !this.hasSpentKey) {
      moves.push(
        this.keys.deleteItem(1)
      )
    }

    const cards = this.riverCards
    const buyableCards = cards
      .filter((item) => cardCharacteristics[item.id.front].cost - this.getDiscount(item) <= gold)

    moves.push(
      ...availableSpaces.flatMap((space) => {
        return [
          ...buyableCards.moveItems(space),
          ...cards.moveItems({ ...space, rotation: true })
        ]
      })
    )

    return moves
  }

  get hasSpentKey() {
    return this.remind(Memory.KeySpent)
  }

  get gold() {
    return this.material(MaterialType.GoldCoin)
      .location(LocationType.PlayerGoldStock)
      .player(this.player)
      .getQuantity()
  }

  get riverCards() {
    const banner = this
      .material(MaterialType.MessengerToken)
      .getItem()!.location.id

    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(banner)
  }

  getDiscount(item: MaterialItem) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter((i) => isDiscountForPlace(i.id.front, item.id.back))
      .length
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type === LocationType.River) return []
    const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
    const moves: MaterialMove[] = []

    const discount = this.getDiscount(item)
    if (move.location.rotation === undefined && (cardCharacteristics[item.id.front].cost - discount) > 0) {
      moves.push(
        ...this
          .material(MaterialType.GoldCoin)
          .location(LocationType.PlayerGoldStock)
          .player(this.player)
          .deleteItems(cardCharacteristics[item.id.front].cost - discount)
      )
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move)) {
      this.memorize(Memory.KeySpent, true)
      return [this.startRule(RuleId.SpendKey)]
    }

    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.PlayerBoard) return []

    const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
    this.memorize(Memory.PlacedCard, move.itemIndex)
    const moves: MaterialMove[] = []
    this
      .material(MaterialType.Card)
      .location((l) => l.type === LocationType.River)
      .rotation(true)
      .getItems()
      .forEach((item) => delete item.location.rotation)

    // Player plays a hidden card
    if (move.location.rotation) {
      moves.push(
        this
          .material(MaterialType.GoldCoin)
          .createItem({ location: { type: LocationType.PlayerGoldStock, player: this.player }, quantity: 6 })
      )
      moves.push(
        this
          .material(MaterialType.Key)
          .createItem({ location: { type: LocationType.PlayerKeyStock, player: this.player }, quantity: 2 })
      )

      moves.push(this.startRule(RuleId.EndOfTurn))
      return moves
    }

    if (cardCharacteristics[item.id.front].immediateEffect !== undefined) {
      moves.push(this.startRule(RuleId.ImmediateEffect))
    } else {
      moves.push(this.startRule(RuleId.EndOfTurn))
    }

    return moves
  }

  get keys() {
    return this
      .material(MaterialType.Key)
      .player(this.player)
  }
}