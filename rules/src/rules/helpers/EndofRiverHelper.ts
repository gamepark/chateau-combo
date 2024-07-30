import { LocalMoveType, Location, MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { BannerType } from "../../CardCharacteristics";

export class EndOfRiverHelper extends MaterialRulesPart {

    constructor(game: MaterialGame, readonly player: number) {
        super(game)
    }

    get getEmptySpace():Location[]{

        const messengerTokenLocation = this.material(MaterialType.MessengerToken).location(LocationType.EndOfRiver).getItem()
        if (messengerTokenLocation!.id === BannerType.NobleBanner){
            return [{type:LocationType.EndOfRiver, id:BannerType.VillageBanner}]
        } else {
            return [{type:LocationType.EndOfRiver, id:BannerType.NobleBanner}]
        }
    }

}