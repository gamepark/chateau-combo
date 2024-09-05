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
    const affordableCards = cards
      .filter((item) => cardCharacteristics[item.id.front].cost - tableau.getDiscount(item.id.back) <= gold)

    moves.push(
      ...availableSpaces.flatMap((space) => {
        return [
          ...affordableCards.moveItems(space),
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

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.PlayerBoard) return []

    const rotatedRiveItems = this.material(MaterialType.Card).location(LocationType.River).rotation(true).getItems()
    for (const item of rotatedRiveItems) {
      delete item.location.rotation
    }

    // Player plays a hidden card
    if (move.location.rotation) {
      return [
        ...coinsMoney.createOrDelete(this.material(MaterialType.GoldCoin), { type: LocationType.PlayerGoldStock, player: this.player }, 6),
        ...keysMoney.createOrDelete(this.material(MaterialType.Key), { type: LocationType.PlayerKeyStock, player: this.player }, 2),
        this.startRule(RuleId.EndOfTurn)
      ]
    } else {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)
      const discount = new Tableau(this.game, this.player).getDiscount(card.id!.back)
      const cost = Math.max(cardCharacteristics[card.id!.front!].cost - discount, 0)
      this.memorize(Memory.PlacedCard, move.itemIndex)
      this.memorize(Memory.PendingEffects, cardCharacteristics[card.id!.front!].effects)
      return [
        ...coinsMoney.createOrDelete(this.material(MaterialType.GoldCoin), { type: LocationType.PlayerGoldStock, player: this.player }, -cost),
        ...new ImmediateEffectRule(this.game).getPendingEffectsMoves()
      ]
    }
  }
}