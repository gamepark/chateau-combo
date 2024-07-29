import { FillGapStrategy, PositiveSequenceStrategy, SecretMaterialRules, hideItemId } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { MoveMessengerRule } from './rules/MoveMessengerRule'
import { RuleId } from './rules/RuleId'
import { BuyCardRule } from './rules/BuyCardRule'
import { SpendKeyRule } from './rules/SpendKeyRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ChateauComboRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType> {
  rules = {
    [RuleId.SpendKey]: SpendKeyRule,
    [RuleId.BuyCard]: BuyCardRule,
    [RuleId.MoveMessenger]: MoveMessengerRule,
    [RuleId.EndOfTurn]: EndOfTurnRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.NobleDeck]: new PositiveSequenceStrategy(),
      [LocationType.NobleRiver]: new FillGapStrategy(), // FillGap 
      [LocationType.VillageDeck]: new PositiveSequenceStrategy(),
      [LocationType.VillageRiver]: new FillGapStrategy(), // FillGap 
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