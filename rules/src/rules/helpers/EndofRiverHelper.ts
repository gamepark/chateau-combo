import { Location, MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { Place } from '../../material/Card'
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";

export class EndOfRiverHelper extends MaterialRulesPart {

    constructor(game: MaterialGame, readonly player: number) {
        super(game)
    }

    get getEmptySpace():Location[]{

        const messengerTokenLocation = this.material(MaterialType.MessengerToken).location(LocationType.EndOfRiver).getItem()
        if (messengerTokenLocation!.id === Place.Castle){
            return [{type:LocationType.EndOfRiver, id:Place.Village}]
        } else {
            return [{type:LocationType.EndOfRiver, id:Place.Castle}]
        }
    }

}