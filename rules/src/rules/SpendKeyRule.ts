import { CustomMove, isCustomMoveType, isDeleteItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { CardId } from '../material/Card'
import { cardCharacteristics } from '../material/CardCharacteristics'
import { Key, keys } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BuyCardRule } from './BuyCardRule'
import { CustomMoveType } from './CustomMoveType'
import { LockHelper } from './helpers/LockHelper'
import { ImmediateEffectRule } from './ImmediateEffectRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class SpendKeyRule extends BuyCardRule {
  onRuleStart() {
    this.forget(Memory.ReturnRule)
    const original = this.remind<number>(Memory.OriginalPlacedCard)
    if (original !== undefined) {
      this.memorize(Memory.PlacedCard, original)
      this.forget(Memory.OriginalPlacedCard)
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves = super.getPlayerMoves()

    const keysMoney = this.material(MaterialType.Key).money(keys)
    const playerKeys = keysMoney.location(LocationType.PlayerKeyStock).player(this.player).count
    if (playerKeys > 0) {
      moves.push(...keysMoney.removeMoney(1, { type: LocationType.PlayerKeyStock, player: this.player }))
    }

    if (!this.remind<boolean>(Memory.LockActivatedThisTurn)) {
      const lockMoves = new LockHelper(this.game, this.player).activatableLockCardIndexes
        .map(index => this.customMove(CustomMoveType.ActivateLock, index))
      moves.push(...lockMoves)
    }

    return moves
  }

  beforeItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move) && this.material(MaterialType.Key).getItem(move.itemIndex).id === Key.Key3) {
      return this.material(MaterialType.Key).money(keys).addMoney(2, { type: LocationType.PlayerKeyStock, player: this.player })
    }
    return super.beforeItemMove(move)
  }

  afterItemMove(move: ItemMove) {
    if (isDeleteItemType(MaterialType.Key)(move)) {
      // Don't redirect to KeyEffect if we're in a lock activation flow
      if (this.remind<RuleId>(Memory.ReturnRule)) return []
      return [this.startRule(RuleId.KeyEffect)]
    }
    return super.afterItemMove(move)
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (!isCustomMoveType(CustomMoveType.ActivateLock)(move)) return []

    const cardIndex = move.data as number
    const card = this.material(MaterialType.Card).getItem<CardId>(cardIndex)
    const characteristics = cardCharacteristics[card.id!.front!]
    const moves: MaterialMove[] = []

    // Spend the key from the card
    moves.push(
      ...this.material(MaterialType.Key).money(keys).removeMoney(1, {
        type: LocationType.KeyOnCard, player: this.player, parent: cardIndex
      })
    )

    // Mark lock as activated this turn
    this.memorize(Memory.LockActivatedThisTurn, true)

    // Save original placed card and set lock card for effects
    this.memorize(Memory.OriginalPlacedCard, this.remind<number>(Memory.PlacedCard))
    this.memorize(Memory.PlacedCard, cardIndex)

    // Set return rule to come back to SpendKey after effects resolve
    this.memorize(Memory.ReturnRule, RuleId.SpendKey)

    // Trigger the card's effects
    this.memorize(Memory.PendingEffects, [...characteristics.effects])
    moves.push(...new ImmediateEffectRule(this.game).getPendingEffectsMoves())

    return moves
  }
}
