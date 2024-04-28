import { PlayerColor } from "@gamepark/chateau-combo/PlayerColor"
import { LocationType } from "@gamepark/chateau-combo/material/LocationType"
import { MaterialType } from "@gamepark/chateau-combo/material/MaterialType"
import { LocationDescription } from "@gamepark/react-game"

export class KeyStockDescription extends LocationDescription<PlayerColor, MaterialType, LocationType> {
    location = keyStockLocation
    width = 9
    ratio = 1
    coordinates = { x: -5, y: 15, z: 0 }
  }
  
  export const keyStockLocation = { type: LocationType.KeyStock }