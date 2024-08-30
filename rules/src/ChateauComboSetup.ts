import { MaterialGameSetup } from '@gamepark/rules-api'
import { CardType, nobles, villages } from './material/Card'
import { BannerType } from './CardCharacteristics'
import { ChateauComboOptions } from './ChateauComboOptions'
import { ChateauComboRules } from './ChateauComboRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'


/**
 * This class creates a new Game based on the game options
 */
export class ChateauComboSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ChateauComboOptions> {
  Rules = ChateauComboRules

  setupMaterial() {

    const allNobles = nobles.map((v) => ({ id: { front: v, back: CardType.Castle }, location: { type: LocationType.NobleDeck } }))
    this.material(MaterialType.Card).createItems(allNobles)
    this.material(MaterialType.Card).location(LocationType.NobleDeck).shuffle()

    const allVillages = villages.map((v) => ({ id: { front: v, back: CardType.Village }, location: { type: LocationType.VillageDeck } }))
    this.material(MaterialType.Card).createItems(allVillages)
    this.material(MaterialType.Card).location(LocationType.VillageDeck).shuffle()

    this.material(MaterialType.MessengerToken).createItem({ location: { type: LocationType.EndOfRiver, id: BannerType.NobleBanner } })
    this.material(MaterialType.GoldCoin).createItems(this.players.map(player => ({ quantity: 15, location: { type: LocationType.PlayerGoldStock, player } })))
    this.material(MaterialType.Key).createItems(this.players.map(player => ({ quantity: 2, location: { type: LocationType.PlayerKeyStock, player } })))

    const nobleDeck = this.material(MaterialType.Card).location(LocationType.NobleDeck).deck()
    const villageDeck = this.material(MaterialType.Card).location(LocationType.VillageDeck).deck()

    nobleDeck.deal({ type: LocationType.NobleRiver }, 3)
    villageDeck.deal({ type: LocationType.VillageRiver }, 3)
  }

  start() {
    this.startPlayerTurn(RuleId.BuyCard, this.game.players[0])
  }
}