import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { GainHelper } from './helpers/GainHelper'
import { CardId, isOutOfTheOubliette } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { coins } from '../material/Coin'
import { keys } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tableau } from '../material/Tableau'
import { CustomMoveType } from './CustomMoveType'
import { LockHelper } from './helpers/LockHelper'
import { TableauHelper } from './helpers/TableauHelper'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    const gold = this.gold
    const availableSpaces: Location[] = new TableauHelper(this.game, this.player).availableSpaces
    const tableau = new Tableau(this.game, this.player)

    const cards = this.riverCards
    const affordableCards = cards
      .filter<CardId>(item => cardCharacteristics[item.id.front!].cost - tableau.getDiscount(item.id.back) <= gold)

    const moves: MaterialMove[] = availableSpaces.flatMap(space => [
      ...affordableCards.moveItems(space),
      ...cards.moveItems({ ...space, rotation: true })
    ])

    if (!this.remind<boolean>(Memory.LockActivatedThisTurn)) {
      const lockMoves = new LockHelper(this.game, this.player).activatableLockCardIndexes
        .map(index => this.customMove(CustomMoveType.ActivateLock, index))
      moves.push(...lockMoves)
    }

    return moves
  }

  get gold() {
    return this.material(MaterialType.GoldCoin).money(coins)
      .location(LocationType.PlayerGoldStock)
      .player(this.player)
      .count
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

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ActivateLock)(move)) return []
    return new LockHelper(this.game, this.player).activateLock(move.data as number, RuleId.BuyCard)
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Tableau && !move.location.rotation) {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)
      const discount = new Tableau(this.game, this.player).getDiscount(card.id!.back)
      const cost = Math.max(cardCharacteristics[card.id!.front!].cost - discount, 0)
      return this.material(MaterialType.GoldCoin).money(coins).removeMoney(cost, { type: LocationType.PlayerGoldStock, player: this.player })
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Tableau) return []

    const rotatedRiverItems = this.material(MaterialType.Card).location(LocationType.River).rotation(true).getItems()
    for (const item of rotatedRiverItems) {
      delete item.location.rotation
    }

    // Player plays a hidden card
    if (move.location.rotation) {
      const gain = new GainHelper(this.game)
      return [
        ...gain.gainGold(6, this.player),
        ...gain.gainKeys(2, this.player),
        this.startRule(RuleId.EndOfTurn)
      ]
    } else {
      const card = this.material(MaterialType.Card).getItem<CardId>(move.itemIndex)
      const characteristics = cardCharacteristics[card.id!.front!]
      this.memorize(Memory.PlacedCard, move.itemIndex)

      const moves: MaterialMove[] = []

      const oubliette = isOutOfTheOubliette(card.id!.front!)
      if (oubliette) {
        // Place a key from supply on the card (lock ability — effect triggered later)
        moves.push(...this.material(MaterialType.Key).money(keys).addMoney(1, {
          type: LocationType.KeyOnCard, player: this.player, parent: move.itemIndex
        }))
      }

      if (!oubliette && characteristics.effects.length) {
        this.memorize(Memory.PendingEffects, [...characteristics.effects])
        moves.push(...new ImmediateEffectRule(this.game).getPendingEffectsMoves())
      } else {
        moves.push(this.startRule(RuleId.MoveMessenger))
      }
      return moves
    }
  }
}