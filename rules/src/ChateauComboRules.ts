import { PositiveSequenceStrategy, SecretMaterialRules, hideItemId } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { PickCard } from './rules/PickCard'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ChateauComboRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PickCard]: PickCard
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.NobleDeck]: new PositiveSequenceStrategy(),
      [LocationType.NobleRiver]: new PositiveSequenceStrategy(), // FillGap 
      [LocationType.VillageDeck]: new PositiveSequenceStrategy(),
      [LocationType.VillageRiver]: new PositiveSequenceStrategy(), // FillGap 
    },
    [MaterialType.GoldCoin]: {
      [LocationType.GoldStock]: new PositiveSequenceStrategy(),
      [LocationType.PlayerGoldStock]: new PositiveSequenceStrategy(),
    },

  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.NobleDeck]: hideItemId,
      [LocationType.VillageDeck]: hideItemId,
    }
  }
}