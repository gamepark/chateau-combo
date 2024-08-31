import { isMoveItemType, ItemMove, Location, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { cardCharacteristics, isNobleDiscount, isVillageDiscount } from '../CardCharacteristics'
import { Place } from '../material/Card'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const gold = this.gold
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const cards = this.riverCards
    const buyableCards = cards
      .filter((item) => cardCharacteristics[item.id.front].cost - this.getDiscount(item) <= gold)

    return availableSpaces.flatMap((space) => {
      return [
        ...buyableCards.moveItems(space),
        ...cards.moveItems({ ...space, rotation: true })
      ]
    })
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
      .location(banner === Place.Castle ? LocationType.NobleRiver : LocationType.VillageRiver)
  }

  getDiscount(item: MaterialItem) {
    const filterCards = (i: MaterialItem) => item.id.back === Place.Castle? isNobleDiscount(i.id.front): isVillageDiscount(i.id.front)
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .filter(filterCards)
      .length
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type !== LocationType.NobleRiver && move.location.type !== LocationType.VillageRiver) {
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

    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard) {

      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
      this.memorize(Memory.PlacedCard, move.itemIndex)
      const moves: MaterialMove[] = []
      this
        .material(MaterialType.Card)
        .location((l) => l.type === LocationType.NobleRiver || l.type === LocationType.VillageRiver)
        .rotation(true)
        .getItems()
        .forEach((item) => delete item.location.rotation)

      // Player plays a hidden card
      if (move.location.rotation !== undefined) {
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

      } else {
        if (cardCharacteristics[item.id.front].immediateEffect !== undefined) {
          moves.push(this.startRule(RuleId.ImmediateEffect))
        } else {
          moves.push(this.startRule(RuleId.EndOfTurn))
        }
      }

      return moves
    } else {
      return []
    }
  }
}