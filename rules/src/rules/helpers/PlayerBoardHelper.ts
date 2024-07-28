import { Location, MaterialGame, MaterialRulesPart, XYCoordinates } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import uniqBy from "lodash/uniqBy";

export class PlayerBoardHelper extends MaterialRulesPart {

    constructor(game:MaterialGame, readonly player:number){
        super(game)
    }

    getAvailableSpaces(){

        const availableSpaces: Location[] = [] 

        const playedCards = this.material(MaterialType.Card).location(LocationType.PlayerBoard).player(this.player).getItems().map(item => {return {x:item.location.x, y:item.location.y}})
    
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

        return uniqBy(availableSpaces, (location) => JSON.stringify(location))

    }

}

export const isAnyCardToTheLeft = (slotToCheck: {x?: number;y?: number}, reference:{x?: number;y?: number}) => {
    return slotToCheck.x === reference.x! -1 && slotToCheck.y === reference.y
  }
export const isAnyCardToTheRight = (slotToCheck: {x?: number;y?: number}, reference:{x?: number;y?: number}) => {
    return slotToCheck.x === reference.x! +1 && slotToCheck.y === reference.y
  }
export const isAnyCardAbove = (slotToCheck: {x?: number;y?: number}, reference:{x?: number;y?: number}) => {
    return slotToCheck.x === reference.x! && slotToCheck.y === reference.y! -1
  }
export const isAnyCardBelow = (slotToCheck: {x?: number;y?: number}, reference:{x?: number;y?: number}) => {
    return slotToCheck.x === reference.x! && slotToCheck.y === reference.y! +1
  }