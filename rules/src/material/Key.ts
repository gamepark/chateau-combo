import { getEnumValues, Money } from '@gamepark/rules-api'

export enum Key {
  Key1 = 1, Key3 = 3
}

export const keysMoney = new Money(getEnumValues(Key))
