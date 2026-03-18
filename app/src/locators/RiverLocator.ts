import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { DropAreaDescription, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/ChateauComboCardDescription'

// Rivers on the right side — first card at this x, then +gap for each next card
export const RIVER_X = 8.5

class RiverLocator extends ListLocator {
  getCoordinates(location: Location) {
    return { x: RIVER_X, y: this.getRiverY(location.id) }
  }

  getRiverY(place: Place) {
    return place === Place.Castle ? -9 : 1
  }

  gap = { x: 6.6 }

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = super.getItemCoordinates(item, context)
    if (item.selected) coordinates.y! -= 1
    return coordinates
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2)']

  locationDescription = new DropAreaDescription({ ...cardDescription, borderRadius: cardDescription.borderRadius })

  getLocations(_context: MaterialContext) {
    return [Place.Castle, Place.Village].flatMap(place =>
      [0, 1, 2].map(x => ({ type: LocationType.River, id: place, x }))
    )
  }
}

export const riverLocator = new RiverLocator()
