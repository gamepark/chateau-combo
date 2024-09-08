import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Locator, PileLocator } from '@gamepark/react-game'
import { cardRotateButtonLocator } from './CardRotateButtonLocator'
import { discardLocator } from './DiscardLocator'
import { effectLocator } from './EffectLocator'
import { endOfRiverLocator } from './EndOfRiverLocator'
import { gameDeckLocator } from './GameDeckLocator'
import { goldIconLocator } from './GoldIconLocator'
import { goldStockLocator } from './GoldStockLocator'
import { keyStockLocator } from './KeyStockLocator'
import { messengerIconDescription } from './MessengerIconLocator'
import { playerBoardLocator } from './PlayerBoardLocator'
import { playerGoldStockLocator } from './PlayerGoldStockLocator'
import { playerKeyStockLocator } from './PlayerKeyStockLocator'
import { riverLocator } from './RiverLocator'
import { scoringLocator } from './ScoringLocator'
import { shieldsLocator } from './ShieldsLocator'

export const Locators: Partial<Record<LocationType, Locator>> = {
  [LocationType.EndOfRiver]: endOfRiverLocator,
  [LocationType.River]: riverLocator,
  [LocationType.Deck]: gameDeckLocator,
  [LocationType.PlayerBoard]: playerBoardLocator,
  [LocationType.PlayerGoldStock]: playerGoldStockLocator,
  [LocationType.GoldStock]: goldStockLocator,
  [LocationType.PlayerKeyStock]: playerKeyStockLocator,
  [LocationType.KeyStock]: keyStockLocator,
  [LocationType.Discard]: discardLocator,
  [LocationType.OnCard]: new PileLocator({ parentItemType: MaterialType.Card, radius: 1, positionOnParent: { x: 50, y: 40 } }),
  [LocationType.CardRotate]: cardRotateButtonLocator,
  [LocationType.GoldIcon]: goldIconLocator,
  [LocationType.Shields]: shieldsLocator,
  [LocationType.Effect]: effectLocator,
  [LocationType.MessengerIcon]: messengerIconDescription,
  [LocationType.ScoringArea]: scoringLocator
}

