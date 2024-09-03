import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { ComponentSize, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Key1 from '../images/tokens/Key1.png'
import Key3 from '../images/tokens/Key3.png'

export class KeyDescription extends TokenDescription {
  images = {
    1: Key1,
    3: Key3
  }

  getSize(itemId: number): ComponentSize {
    return itemId === 3 ? { width: 3.315, height: 3.4 } : { width: 1.67, height: 3 }
  }

  getStockLocation(item: MaterialItem) {
    return { type: LocationType.KeyStock, id: item.id ?? 1 }
  }

  staticItems = [
    { id: 1, quantity: 10, location: { type: LocationType.KeyStock, id: 1 } },
    { id: 3, quantity: 5, location: { type: LocationType.KeyStock, id: 3 } }
  ]

  protected getFrontId(itemId: number): number {
    return itemId ?? 1
  }
}

export const keyDescription = new KeyDescription()

