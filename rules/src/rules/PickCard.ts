import { isMoveItemType, ItemMove, Location, Material, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { BannerType, Card, CardObjects } from "../CardProperties";
import { isAnyCardAbove, isAnyCardBelow, isAnyCardToTheLeft, isAnyCardToTheRight } from "./helpers/PlayerBoardHelper";

// PlayerTurnRule => game.rule.player !== undefined
// SimultaneousRule => game.rule.players !== undefined
// MaterialRulePart => Rien

export class PickCard extends PlayerTurnRule {

  getLegalMoves(player:number): MaterialMove<number, number, number>[] {
    const goldAmount = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(this.player).getQuantity()
    const playedCards = this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(this.player).getItems().map(item => {return {x:item.location.x, y:item.location.y}})

    const availableSpaces: Location[] = [
    ] 

    if (playedCards.length === 0){
      availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:0, y:0, z:0})
    }



    playedCards.forEach(playedCard => {
      if (playedCards.find(item => isAnyCardToTheLeft(item, playedCard) ) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!-1, y:playedCard.y!, z:0})
      }
      if (playedCards.find(item => isAnyCardToTheRight(item, playedCard) ) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!+1, y:playedCard.y!, z:0})
      }
      if (playedCards.find(item => isAnyCardBelow(item, playedCard)) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!, y:playedCard.y! -1, z:0})
      }
      if (playedCards.find(item => isAnyCardAbove(item, playedCard) ) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!, y:playedCard.y! +1, z:0})
      }
    })

    const buyableCards = this
      .material(MaterialType.Card)
      .location((l) => l.type === LocationType.VillageRiver || l.type === LocationType.NobleRiver)
      .filter((item) => {
        const definition = CardObjects[item.id]
        const cost = definition.cost
        return cost <= goldAmount
    })  

    const moves: MaterialMove[] = availableSpaces.flatMap((space) => {
      return buyableCards.moveItems(space)
    }) 
    console.log(moves)
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard){

      const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
      const moves: MaterialMove[] = []


      const deckLocationToDrawFrom = (CardObjects[item.id].banner === BannerType.NobleBanner) ? LocationType.NobleDeck : LocationType.VillageDeck
      const deckToDrawFrom = this.material(MaterialType.Card).location(deckLocationToDrawFrom).deck()

      moves.push(...this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(this.player).deleteItems(CardObjects[item.id].cost))
      
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