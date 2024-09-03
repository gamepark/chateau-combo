import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { ComponentSize, TokenDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Gold1 from '../images/tokens/Gold1.png'
import Gold5 from '../images/tokens/Gold5.png'

export class GoldCoinDescription extends TokenDescription {
  images = {
    1: Gold1,
    5: Gold5
  }

  getSize(itemId: number): ComponentSize {
    return itemId === 5 ? { width: 2.6, height: 2.6 } : { width: 1.9, height: 1.9 }
  }

  getStockLocation(item: MaterialItem) {
    return { type: LocationType.GoldStock, id: item.id ?? 1 }
  }

  staticItems = [
    { id: 1, quantity: 10, location: { type: LocationType.GoldStock, id: 1 } },
    { id: 5, quantity: 5, location: { type: LocationType.GoldStock, id: 5 } }
  ]

  protected getFrontId(itemId: number): number {
    return itemId ?? 1
  }
}

export const goldCoinDescription = new GoldCoinDescription()

