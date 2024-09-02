import { getEnumValues } from '@gamepark/rules-api'

export enum Place {
  Castle = 1,
  Village
}

export const places = getEnumValues(Place)