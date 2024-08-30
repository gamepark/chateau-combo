import { BannerType } from '@gamepark/chateau-combo/CardCharacteristics'
import { Locator } from "@gamepark/react-game"
import { Location } from "@gamepark/rules-api"



export class EndOfRiverLocator extends Locator {

  getCoordinates(location: Location) {
    if (location.id === BannerType.NobleBanner){
      return { x: 23, y: -18, z: 0 }
    } else {
      return { x: 23, y: -8, z: 0 }
    }
  }

}

export const endOfRiverLocator = new EndOfRiverLocator()