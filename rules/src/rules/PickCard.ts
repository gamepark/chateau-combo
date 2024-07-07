import { Location, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Card, CardObjects } from "../CardProperties";

// PlayerTurnRule => game.rule.player !== undefined
// SimultaneousRule => game.rule.players !== undefined
// MaterialRulePart => Rien

export class PickCard extends PlayerTurnRule {

  getLegalMoves(player:number): MaterialMove<number, number, number>[] {
    const goldAmount = this.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(this.player).getQuantity()
    const availableSpaces: Location[] = [{type:LocationType.PlayerBoard, player:this.player, x:0, y:0}] // Calculer la liste des coordonnées dispo

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