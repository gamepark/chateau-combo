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
    this.material(MaterialType.MessengerToken).createItem({id:1, location:{type :LocationType.EndOfRiver}})
    this.material(MaterialType.NobleCard).createItems(nobleCards.map(nobleCard => ({id:nobleCard, location:{type:LocationType.NobleDeck}})))
    this.material(MaterialType.NobleCard).shuffle()
    this.material(MaterialType.VillageCard).createItems(villageCards.map(villageCard => ({id:villageCard, location:{type:LocationType.VillageDeck}})))
    this.material(MaterialType.VillageCard).shuffle()
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}