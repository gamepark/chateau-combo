import { isMoveItemType, ItemMove, Location, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BannerType, cardCharacteristics, getBanner, isNobleDiscount, isVillageDiscount } from '../CardCharacteristics'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerBoardHelper } from './helpers/PlayerBoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import { isNoble } from '../Card'

// PlayerTurnRule => game.rule.player !== undefined
// SimultaneousRule => game.rule.players !== undefined
// MaterialRulePart => Rien

export class BuyCardRule extends PlayerTurnRule {

  getPlayerMoves() {
    console.log("Effects: ", this.remind(Memory.ImmediateEffectsToPlay))
    const gold = this.gold
    const availableSpaces: Location[] = new PlayerBoardHelper(this.game, this.player).availableSpaces
    const cards = this.riverCards
    const buyableCards = cards
      .filter((item) => cardCharacteristics[item.id].cost - (isNoble(item.id) ? this.nobleDiscount : this.villageDiscount) <= gold)

    return availableSpaces.flatMap((space) => {
      return [
        ...buyableCards.moveItems(space),
        ...cards.moveItems({ ...space, rotation: true }),
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
      .location(banner === BannerType.NobleBanner? LocationType.NobleRiver: LocationType.VillageRiver)
  }

  get nobleDiscount() {
    return this
    .material(MaterialType.Card)
    .location(LocationType.PlayerBoard)
    .player(this.player).getItems().filter(item => isNobleDiscount(item.id)).length
  }
  
  get villageDiscount(){
    return this.material(MaterialType.Card)
    .location(LocationType.PlayerBoard)
    .player(this.player).getItems().filter(item => isVillageDiscount(item.id)).length
  }




  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type !== LocationType.NobleRiver && move.location.type !== LocationType.VillageRiver){
      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
      const moves: MaterialMove[] = []

      if (move.location.rotation === undefined || (cardCharacteristics[item.id].cost - (isNoble(item.id) ? this.nobleDiscount : this.villageDiscount) )> 0) {
        moves.push(
          ...this
            .material(MaterialType.GoldCoin)
            .location(LocationType.PlayerGoldStock)
            .player(this.player)
            .deleteItems(cardCharacteristics[item.id].cost - (isNoble(item.id) ? this.nobleDiscount : this.villageDiscount) )
        )
      }

      return moves

    }

    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard) {

      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
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
          .createItem({location:{type:LocationType.PlayerGoldStock, player:this.player}, quantity:6})
        )
        moves.push(
          this
          .material(MaterialType.Key)
          .createItem({location:{type:LocationType.PlayerKeyStock, player:this.player}, quantity:2})
        )
        moves.push(this.startRule(RuleId.EndOfTurn))
      
      } else {
        if (cardCharacteristics[item.id].immediateEffect !== undefined){
          this.memorize(Memory.PlacedCard, move.itemIndex)
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