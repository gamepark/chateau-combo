import { MaterialMove } from '@gamepark/rules-api'
import { BlazonType, canStockCoins, countBlazons, countBlazonsOfType, getBlazons } from '../../material/CardCharacteristics'
import { ImmediateEffectType } from '../../material/ImmediateEffectType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { AbstractImmediateEffect, Condition, isRespectingCostCondition, SpaceFilling } from './AbstractImmediateEffect'


export type GainCoinEffect = {
  type: ImmediateEffectType.GetCoins,
  value: number;
  condition?: Condition
}

export class ImmediateGainCoinEffect extends AbstractImmediateEffect<GainCoinEffect> {


  getEffectMoves(effect: GainCoinEffect) {

    const moves: MaterialMove[] = []
    const playerPanorama = this.panorama
    const panoramas = effect.condition !== undefined && effect.condition.bestNeighbor === true
      ? this.neighborPanorama
      : [this.panorama]

    const howManyDifferentBlazons: BlazonType[] = []
    playerPanorama.getItems().forEach(item => {
      getBlazons(item.id.front).forEach(blazon => !howManyDifferentBlazons.includes(blazon) && howManyDifferentBlazons.push(blazon))
    })

    const howManyMatchedBanners = effect.condition !== undefined && effect.condition.banner !== undefined
      ? Math.max(...panoramas.map(panorama => panorama.filter((item) => (item.id.back === effect.condition!.banner)).length))
      : 0

    const howManyMatchedBlazons = (effect.condition !== undefined && effect.condition.blazon !== undefined)
      ? effect.condition.blazon.some(blazon => blazon === BlazonType.Different || blazon === BlazonType.MissingDifferent)
        ? effect.condition.blazon.includes(BlazonType.Different) ? howManyDifferentBlazons.length : 6 - howManyDifferentBlazons.length
        : Math.max(...panoramas.map(panorama => panorama.getItems().reduce((cardAcc, currentCard) => cardAcc + effect.condition!.blazon!.reduce((blazonAcc, currentBlazon) => blazonAcc + countBlazonsOfType(currentCard.id.front, currentBlazon), 0), 0)))
      : 0

    const howManyMatchedBlazonsQuantity = (effect.condition !== undefined && effect.condition.blazonNumber !== undefined)
      ? playerPanorama.getItems().reduce((cardAcc, currentCard) => cardAcc + (countBlazons(currentCard.id.front) === effect.condition?.blazonNumber ? 1 : 0), 0)
      : 0

    const howManyMatchedSpaceFilling = (effect.condition !== undefined && effect.condition.filledOrEmpty !== undefined)
      ? effect.condition.filledOrEmpty === SpaceFilling.Filled ? playerPanorama.length : 9 - playerPanorama.length
      : 0

    const howManyMatchedCostCards = (effect.condition !== undefined && effect.condition.cardCost !== undefined)
      ? playerPanorama.getItems().reduce((cardAcc, currentCard) => (cardAcc + (isRespectingCostCondition(currentCard.id.front, effect.condition!.cardCost!) ? 1 : 0)), 0)
      : 0

    const howManyMatchedStoreCoinCards = (effect.condition !== undefined && effect.condition.onStockCard !== undefined)
      ? playerPanorama.getItems().filter(card => canStockCoins(card.id.front)).length
      : 0


    if (effect.value) {
      if (effect.condition !== undefined) {
        const quantity = (howManyMatchedBlazonsQuantity
          + howManyMatchedBanners
          + howManyMatchedBlazons
          + howManyMatchedSpaceFilling
          + howManyMatchedCostCards
          + howManyMatchedStoreCoinCards) * effect.value
        moves.push(...this.gainGold(quantity))
      } else {
        moves.push(...this.gainGold(effect.value))
      }

    }

    if (effect.condition !== undefined && effect.condition.opponentGain) {
      for (const player of this.game.players) {
        if (player === this.player) {
          moves.push(...this.gainGold(effect.condition.opponentGain))
        }
      }
    }

    return moves

  }

  gainGold(quantity: number) {
    if (!quantity) return []
    return [
      this
        .material(MaterialType.GoldCoin)
        .createItem({
          location: {
            type: LocationType.PlayerGoldStock,
            player: this.player
          },
          quantity: quantity
        })
    ]
  }
}