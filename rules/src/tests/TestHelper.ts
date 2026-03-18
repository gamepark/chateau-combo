import { MaterialGame, MaterialMove, MaterialRules } from '@gamepark/rules-api'
import { ChateauComboRules } from '../ChateauComboRules'
import { Card, getCardPlace } from '../material/Card'
import { Coin } from '../material/Coin'
import { Key } from '../material/Key'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Place } from '../material/Place'
import { PlayerId } from '../PlayerId'
import { RuleId } from '../rules/RuleId'

export function createGame(players: PlayerId[] = [1, 2]): MaterialGame {
  return {
    players,
    items: {
      [MaterialType.Card]: [],
      [MaterialType.GoldCoin]: [],
      [MaterialType.Key]: [],
      [MaterialType.MessengerPawn]: [{
        location: { type: LocationType.EndOfRiver, id: Place.Castle }
      }]
    },
    rule: { id: RuleId.SpendKey, player: players[0] },
    memory: {}
  } as MaterialGame
}

export function addCardToRiver(game: MaterialGame, card: Card) {
  game.items[MaterialType.Card]!.push({
    id: { front: card, back: getCardPlace(card) },
    location: { type: LocationType.River, id: getCardPlace(card) }
  })
}

export function addCardToTableau(game: MaterialGame, card: Card, player: PlayerId, x: number, y: number, rotation = false) {
  game.items[MaterialType.Card]!.push({
    id: { front: card, back: getCardPlace(card) },
    location: { type: LocationType.Tableau, player, x, y, rotation: rotation || undefined }
  })
}

export function addCardToDeck(game: MaterialGame, card: Card) {
  game.items[MaterialType.Card]!.push({
    id: { front: card, back: getCardPlace(card) },
    location: { type: LocationType.Deck, id: getCardPlace(card) }
  })
}

export function setGold(game: MaterialGame, player: PlayerId, amount: number) {
  game.items[MaterialType.GoldCoin] = game.items[MaterialType.GoldCoin]?.filter(
    i => !(i.location.type === LocationType.PlayerGoldStock && i.location.player === player)
  ) ?? []
  if (amount >= 5) {
    game.items[MaterialType.GoldCoin]!.push({
      id: Coin.Coin5,
      location: { type: LocationType.PlayerGoldStock, player },
      quantity: Math.floor(amount / 5)
    })
  }
  if (amount % 5 > 0) {
    game.items[MaterialType.GoldCoin]!.push({
      id: Coin.Coin1,
      location: { type: LocationType.PlayerGoldStock, player },
      quantity: amount % 5
    })
  }
}

export function setKeys(game: MaterialGame, player: PlayerId, amount: number) {
  game.items[MaterialType.Key] = game.items[MaterialType.Key]?.filter(
    i => !(i.location.type === LocationType.PlayerKeyStock && i.location.player === player)
  ) ?? []
  if (amount > 0) {
    game.items[MaterialType.Key]!.push({
      id: Key.Key1,
      location: { type: LocationType.PlayerKeyStock, player },
      quantity: amount
    })
  }
}

export function addKeyOnCard(game: MaterialGame, player: PlayerId, cardIndex: number) {
  game.items[MaterialType.Key]!.push({
    id: Key.Key1,
    location: { type: LocationType.KeyOnCard, player, parent: cardIndex },
    quantity: 1
  })
}

export function getRules(game: MaterialGame) {
  return new ChateauComboRules(game)
}

export function playConsequences(rules: MaterialRules, move: MaterialMove) {
  const consequences = rules.play(move)
  while (consequences.length > 0) {
    consequences.push(...rules.play(consequences.shift()!))
  }
}

export function playAllConsequences(rules: MaterialRules, moves: MaterialMove[]) {
  for (const move of moves) {
    playConsequences(rules, move)
  }
}

export function getGold(rules: ChateauComboRules, player: PlayerId): number {
  return rules.material(MaterialType.GoldCoin).location(LocationType.PlayerGoldStock).player(player)
    .getItems().reduce((sum, item) => sum + (item.id as number) * (item.quantity ?? 1), 0)
}

export function getKeys(rules: ChateauComboRules, player: PlayerId): number {
  return rules.material(MaterialType.Key).location(LocationType.PlayerKeyStock).player(player)
    .getItems().reduce((sum, item) => sum + (item.id as number) * (item.quantity ?? 1), 0)
}
