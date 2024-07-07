import { MaterialGameSetup } from '@gamepark/rules-api'
import { ChateauComboOptions } from './ChateauComboOptions'
import { ChateauComboRules } from './ChateauComboRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { BannerType, CardObjects, cards } from './CardProperties'


/**
 * This class creates a new Game based on the game options
 */
export class ChateauComboSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ChateauComboOptions> {
  Rules = ChateauComboRules

  setupMaterial() {

    this.material(MaterialType.Card).createItems(cards.filter((card) => {
        return CardObjects[card].banner == BannerType.NobleBanner
    }).map(card => ({id:card, location:{type:LocationType.NobleDeck}})))
    this.material(MaterialType.Card).location(LocationType.NobleDeck).shuffle()

    this.material(MaterialType.Card).createItems(cards.filter((card) => {
      return CardObjects[card].banner == BannerType.VillageBanner
    }).map(card => ({id:card, location:{type:LocationType.VillageDeck}})))
    this.material(MaterialType.Card).location(LocationType.VillageDeck).shuffle()

    this.material(MaterialType.MessengerToken).createItem({location:{type :LocationType.EndOfRiver, x:1}})
    this.material(MaterialType.GoldCoin).createItems(this.players.map(player => ({quantity:15, location:{type:LocationType.PlayerGoldStock, player}})))
    this.material(MaterialType.Key).createItems(this.players.map(player => ({quantity:2, location:{type:LocationType.PlayerKeyStock, player}})))
  
    const nobleDeck = this.material(MaterialType.Card).location(LocationType.NobleDeck).deck()
    const villageDeck = this.material(MaterialType.Card).location(LocationType.VillageDeck).deck()

    nobleDeck.deal({type:LocationType.NobleRiver}, 3)

    villageDeck.deal({type:LocationType.VillageRiver}, 3)
  }

  start() {
    this.startPlayerTurn(RuleId.PickCard, this.game.players[0])
  }
}