import { MaterialGameSetup } from '@gamepark/rules-api'
import { ChateauComboOptions } from './ChateauComboOptions'
import { ChateauComboRules } from './ChateauComboRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { nobleCards, villageCards } from './CardProperties'

/**
 * This class creates a new Game based on the game options
 */
export class ChateauComboSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ChateauComboOptions> {
  Rules = ChateauComboRules

  setupMaterial() {
    this.material(MaterialType.MessengerToken).createItem({location:{type :LocationType.EndOfRiver, x:1}})
    this.material(MaterialType.NobleCard).createItems(nobleCards.map(nobleCard => ({id:nobleCard, location:{type:LocationType.NobleDeck}})))
    this.material(MaterialType.NobleCard).shuffle()
    this.material(MaterialType.VillageCard).createItems(villageCards.map(villageCard => ({id:villageCard, location:{type:LocationType.VillageDeck}})))
    this.material(MaterialType.VillageCard).shuffle()
    this.material(MaterialType.GoldCoin).createItems(this.players.map(player => ({quantity:15, location:{type:LocationType.PlayerGoldStock, player}})))
    this.material(MaterialType.Key).createItems(this.players.map(player => ({quantity:2, location:{type:LocationType.PlayerKeyStock, player}})))
    const nobleDeck = this.material(MaterialType.NobleCard).location(LocationType.NobleDeck).deck()
    const villageDeck = this.material(MaterialType.VillageCard).location(LocationType.VillageDeck).deck()

    nobleDeck.dealOne({type:LocationType.NobleRiver, x:0})
    nobleDeck.dealOne({type:LocationType.NobleRiver, x:1})
    nobleDeck.dealOne({type:LocationType.NobleRiver, x:2})
    villageDeck.dealOne({type:LocationType.VillageRiver, x:0})
    villageDeck.dealOne({type:LocationType.VillageRiver, x:1})
    villageDeck.dealOne({type:LocationType.VillageRiver, x:2})
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}