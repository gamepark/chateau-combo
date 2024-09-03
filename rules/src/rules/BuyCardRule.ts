import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { Card, CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { EffectType } from '../material/Effect'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const gold = this.gold
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const moves: MaterialMove[] = []

    const cards = this.riverCards
    const buyableCards = cards
      .filter((item) => cardCharacteristics[item.id.front].cost - this.getDiscount(item.id.back) <= gold)

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

  getDiscount(place: Place) {
    let tableau = this
      .material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .getItems<CardId>()
    return sumBy(tableau, card => card.id?.front ? this.getCardDiscount(card.id.front, place) : 0)
  }

  getCardDiscount(card: Card, place: Place) {
    return sumBy(cardCharacteristics[card].effects, effect => {
      if (effect.type !== EffectType.Discount) return 0
      return (place === Place.Castle ? effect.castle : effect.village) ?? 0
    })
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type === LocationType.River) return []
    const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
    const moves: MaterialMove[] = []

    const discount = this.getDiscount(item.id.back)
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
}