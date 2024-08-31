import { CompetitiveScore, FillGapStrategy, MaterialGame, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, hideItemId } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { MoveMessengerRule } from './rules/MoveMessengerRule'
import { RuleId } from './rules/RuleId'
import { BuyCardRule } from './rules/BuyCardRule'
import { SpendKeyRule } from './rules/SpendKeyRule'
import { ImmediateEffectRule } from './rules/ImmediateEffectRule'
import { DiscardFromRiverRule } from './rules/DiscardFromRiverRule'
import { ChooseBetweenRule } from './rules/ChooseBetweenRule'
import { EndGameRule } from './rules/EndGameRule'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ChateauComboRules extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
implements CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.SpendKey]: SpendKeyRule,
    [RuleId.BuyCard]: BuyCardRule,
    [RuleId.MoveMessenger]: MoveMessengerRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.ImmediateEffect]: ImmediateEffectRule,
    [RuleId.DiscardFromRiver]: DiscardFromRiverRule,
    [RuleId.ChooseBetween]: ChooseBetweenRule,
    [RuleId.EndGame]:EndGameRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.River]: new FillGapStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideItemId,
    }
  }

  getScore(playerId: PlayerColor): number {
    return 0
  }
}