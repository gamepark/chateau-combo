import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { coinsMoney } from '../material/Coin'
import { keysMoney } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tableau } from '../material/Tableau'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    const gold = this.gold
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const tableau = new Tableau(this.game, this.player)
    const moves: MaterialMove[] = []

    const cards = this.riverCards
    const buyableCards = cards
      .filter((item) => cardCharacteristics[item.id.front].cost - tableau.getDiscount(item.id.back) <= gold)

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
    return coinsMoney.count(this.material(MaterialType.GoldCoin)
      .location(LocationType.PlayerGoldStock)
      .player(this.player))
  }

  get riverCards() {
    const banner = this
      .material(MaterialType.MessengerPawn)
      .getItem()!.location.id

    return this
      .material(MaterialType.Card)
      .location(LocationType.River)
      .locationId(banner)
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard && move.location.rotation === undefined) {
      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
      const discount = new Tableau(this.game, this.player).getDiscount(item.id.back)
      const cost = cardCharacteristics[item.id.front].cost - discount
      if (cost > 0) {
        return coinsMoney.createOrDelete(this.material(MaterialType.GoldCoin), { type: LocationType.PlayerGoldStock, player: this.player }, -cost)
      }
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.PlayerBoard) return []

    const moves: MaterialMove[] = []
    this
      .material(MaterialType.Card)
      .location((l) => l.type === LocationType.River)
      .rotation(true)
      .getItems()
      .forEach((item) => delete item.location.rotation)

    // Player plays a hidden card
    if (move.location.rotation) {
      moves.push(...coinsMoney.createOrDelete(this.material(MaterialType.GoldCoin), { type: LocationType.PlayerGoldStock, player: this.player }, 6))

      moves.push(...keysMoney.createOrDelete(this.material(MaterialType.Key), { type: LocationType.PlayerKeyStock, player: this.player }, 2))

      moves.push(this.startRule(RuleId.EndOfTurn))
      return moves
    }

    const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)
    this.memorize(Memory.PlacedCard, move.itemIndex)
    this.memorize(Memory.PendingEffects, cardCharacteristics[card.id!.front!].effects)
    moves.push(...new ImmediateEffectRule(this.game).getPendingEffectsMoves())

    return moves
  }
}