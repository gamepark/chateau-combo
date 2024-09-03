import { Location, MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { Place } from '../../material/Place'

export class EndOfRiverHelper extends MaterialRulesPart {

    constructor(game: MaterialGame, readonly player: number) {
        super(game)
    }

    get getEmptySpace():Location[]{

        const messengerTokenLocation = this.material(MaterialType.MessengerPawn).location(LocationType.EndOfRiver).getItem()
        if (messengerTokenLocation!.id === Place.Castle){
            return [{type:LocationType.EndOfRiver, id:Place.Village}]
        } else {
            return [{type:LocationType.EndOfRiver, id:Place.Castle}]
        }
    }

}