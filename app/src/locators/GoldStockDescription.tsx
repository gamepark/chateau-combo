import { PlayerColor } from "@gamepark/chateau-combo/PlayerColor"
import { LocationType } from "@gamepark/chateau-combo/material/LocationType"
import { MaterialType } from "@gamepark/chateau-combo/material/MaterialType"
import { LocationDescription } from "@gamepark/react-game"

export class GoldStockDescription extends LocationDescription<PlayerColor, MaterialType, LocationType> {
    location = goldStockLocation
    width = 9
    ratio = 1
    borderRadius = this.width / 2
    coordinates = { x: -5, y: 15, z: 0 }
  }
  
  export const goldStockLocation = { type: LocationType.GoldStock }