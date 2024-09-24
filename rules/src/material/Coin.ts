import { getEnumValues } from '@gamepark/rules-api'

export enum Coin {
  Coin1 = 1, Coin5 = 5
}

export const coins = getEnumValues(Coin)