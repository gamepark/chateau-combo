import { Place } from '@gamepark/chateau-combo/material/Place'
import { ItemContext, ListLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

class RiverLocator extends ListLocator {
  getCoordinates(location: Location) {
    return { y: this.getRiverY(location.id) }
  }

  getRiverY(place: Place) {
    return place === Place.Castle ? -18 : -8
  }

  gap = { x: 7 }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = super.getItemCoordinates(item, context)
    if (item.selected) coordinates.y! -= 1
    return coordinates
  }
}

export const riverLocator = new RiverLocator()