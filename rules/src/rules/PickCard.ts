import { Location, Material, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Card, CardObjects } from "../CardProperties";

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
      if (playedCards.find(item => item.x === playedCard.x! -1 && item.y === playedCard.y! ) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!-1, y:playedCard.y!, z:0})
      }
      if (playedCards.find(item => item.x === playedCard.x! +1 && item.y === playedCard.y! ) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!+1, y:playedCard.y!, z:0})
      }
      if (playedCards.find(item => item.x === playedCard.x! && item.y === playedCard.y! -1 ) === undefined){
        availableSpaces.push({type:LocationType.PlayerBoard, player:this.player, x:playedCard.x!, y:playedCard.y! -1, z:0})
      }
      if (playedCards.find(item => item.x === playedCard.x! && item.y === playedCard.y! +1 ) === undefined){
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

    
    //const indexes = buyableCards.getIndexes()

//    for (const index of indexes) {
//      const item = buyableCards.getItem(index) // MaterialItem => id, location
//      const item = buyableCards.index(index) // Material => move, create...
//    }
    

  //  for (const cardItem of villageCards.getIndexes()){
   //   console.log(cardItem)
  //    const card:CardPattern = VillageCardsObjects[cardItem]
   //   if (card.cost <= goldAmount){   
  //      moves.push(villageCards[cardItem].moveItem({type:LocationType.PlayerBoard, player, x:0, y:0}))
  //    }
  //  }

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

    return moves
  }

/*   afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.NobleCard)(move) && move.location.type === LocationType.PlayerBoard){

      const item = this.material(MaterialType.NobleCard).getItem(move.itemIndex)!
      const moves: MaterialMove[] = []

      moves.push(...this.material(MaterialType.GoldCoin).deleteItems(VillageCardsObjects[item.id].cost))
      moves.push(this.rules().startPlayerTurn(RuleId.ChooseRegion, this.nextPlayer))
      
      return moves
    }
  } */

  getPlayerMoves() {
    return []
  }
}