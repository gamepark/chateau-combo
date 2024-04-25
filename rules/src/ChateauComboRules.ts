import { PositiveSequenceStrategy, SecretMaterialRules, hideItemId } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ChateauComboRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  locationsStrategies = {
    [MaterialType.NobleCard]: {
      [LocationType.NobleDeck]: new PositiveSequenceStrategy(),
    },
    [MaterialType.VillageCard]: {
      [LocationType.VillageDeck]: new PositiveSequenceStrategy(),
    },
    [MaterialType.GoldCoin]: {
      [LocationType.GoldStock]: new PositiveSequenceStrategy(),
    }
  }

  hidingStrategies = {
    [MaterialType.NobleCard]: {
      [LocationType.NobleDeck]: hideItemId,
    },
    [MaterialType.VillageCard]: {
      [LocationType.VillageDeck]: hideItemId,
    }
  }
}