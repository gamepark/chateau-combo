import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Locator } from '@gamepark/react-game'
import { cardRotateButtonLocator } from './CardRotateButtonLocator'
import { cardVictoryPointsLocator } from './CardVictoryPointsLocator'
import { discardLocator } from './DiscardLocator'
import { effectLocator } from './EffectLocator'
import { endOfRiverLocator } from './EndOfRiverLocator'
import { gameDeckLocator } from './GameDeckLocator'
import { goldIconLocator } from './GoldIconLocator'
import { goldStockLocator } from './GoldStockLocator'
import { keyStockLocator } from './KeyStockLocator'
import { messengerIconDescription } from './MessengerIconLocator'
import { keyOnCardLocator } from './KeyOnCardLocator'
import { onCardLocator } from './OnCardLocator'
import { tableauLocator } from './TableauLocator'
import { playerGoldStockLocator } from './PlayerGoldStockLocator'
import { playerKeyStockLocator } from './PlayerKeyStockLocator'
import { riverLocator } from './RiverLocator'
import { scoringLocator } from './ScoringLocator'
import { shieldsLocator } from './ShieldsLocator'

export const Locators: Partial<Record<LocationType, Locator>> = {
  [LocationType.EndOfRiver]: endOfRiverLocator,
  [LocationType.River]: riverLocator,
  [LocationType.Deck]: gameDeckLocator,
  [LocationType.Tableau]: tableauLocator,
  [LocationType.PlayerGoldStock]: playerGoldStockLocator,
  [LocationType.GoldStock]: goldStockLocator,
  [LocationType.PlayerKeyStock]: playerKeyStockLocator,
  [LocationType.KeyStock]: keyStockLocator,
  [LocationType.Discard]: discardLocator,
  [LocationType.OnCard]: onCardLocator,
  [LocationType.KeyOnCard]: keyOnCardLocator,
  [LocationType.CardRotate]: cardRotateButtonLocator,
  [LocationType.GoldIcon]: goldIconLocator,
  [LocationType.Shields]: shieldsLocator,
  [LocationType.Effect]: effectLocator,
  [LocationType.MessengerIcon]: messengerIconDescription,
  [LocationType.ScoringArea]: scoringLocator,
  [LocationType.CardVictoryPoints]: cardVictoryPointsLocator
}
