import { MaterialGameSetup } from '@gamepark/rules-api'
import { ChateauComboOptions } from './ChateauComboOptions'
import { ChateauComboRules } from './ChateauComboRules'
import { Card, cards, getCardPlace } from './material/Card'
import { cardCharacteristics } from './material/CardCharacteristics'
import { Coin } from './material/Coin'
import { Key } from './material/Key'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Place, places } from './material/Place'
import { PlayerId } from './PlayerId'
import { RuleId } from './rules/RuleId'


/**
 * This class creates a new Game based on the game options
 */
export class ChateauComboSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, ChateauComboOptions> {
  Rules = ChateauComboRules

  setupMaterial(options: ChateauComboOptions) {
    this.setupMessengerPawn()
    this.setupPlayers()
    this.setupDecks(options)
    this.setupRiver()
  }

  setupMessengerPawn() {
    this
      .material(MaterialType.MessengerPawn)
      .createItem({
        location: {
          type: LocationType.EndOfRiver,
          id: Place.Village
        }
      })
  }

  setupPlayers() {
    for (const player of this.players) {
      this.setupPlayer(player)
    }
  }

  setupPlayer(player: PlayerId) {
    this.material(MaterialType.GoldCoin).createItem({
      id: Coin.Coin5,
      location: {
        type: LocationType.PlayerGoldStock,
        player: player
      },
      quantity: 2
    })
    this.material(MaterialType.GoldCoin).createItem({
      id: Coin.Coin1,
      location: {
        type: LocationType.PlayerGoldStock,
        player: player
      },
      quantity: 5
    })

    this
      .material(MaterialType.Key)
      .createItem({
        id: Key.Key1,
        location: {
          type: LocationType.PlayerKeyStock,
          player: player
        },
        quantity: 2
      })

  }

  setupDecks(options: ChateauComboOptions) {
    // DEBUG: Cards to force into river (placed on top of deck after shuffle)
    const debugRiverCards = [Card.Banker]

    const baseCards = cards.filter(card => !cardCharacteristics[card].outOfTheOubliette)
    const baseItems = baseCards.map(card => ({
      id: { front: card, back: getCardPlace(card) },
      location: { type: LocationType.Deck, id: getCardPlace(card) }
    }))
    this.material(MaterialType.Card).createItems(baseItems)
    for (const place of places) {
      this.material(MaterialType.Card).location(LocationType.Deck).locationId(place).shuffle()
    }

    // DEBUG: always include extension cards on top for testing
    if (options.expansion1) {
      const extensionCards = cards.filter(card => cardCharacteristics[card].outOfTheOubliette)
      const extensionItems = extensionCards.map(card => ({
        id: { front: card, back: getCardPlace(card) },
        location: { type: LocationType.Deck, id: getCardPlace(card) }
      }))
      this.material(MaterialType.Card).createItems(extensionItems)
    }

    // DEBUG: Move debug cards to top of their deck so they appear in river
    for (const card of debugRiverCards) {
      const place = getCardPlace(card)
      const deck = this.material(MaterialType.Card).location(LocationType.Deck).locationId(place)
      const maxX = Math.max(...deck.getItems().map(i => i.location.x ?? 0))
      const idx = deck.id((id: any) => id.front === card).getIndex()
      this.game.items[MaterialType.Card]![idx].location.x = maxX + 1
    }
  }

  setupRiver() {
    for (const place of places) {
      this.setupRiverType(place)
    }
  }

  setupRiverType(place: Place) {
    const deck = this.getDeck(place)
    deck.deal({
      type: LocationType.River,
      id: place
    }, 3)
  }

  getDeck(place: Place) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Deck)
      .locationId(place)
      .deck()
  }

  start() {
    this.startPlayerTurn(RuleId.SpendKey, this.game.players[0])
  }
}