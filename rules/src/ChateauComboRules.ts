import { CompetitiveScore, FillGapStrategy, HiddenMaterialRules, hideFront, MaterialGame, MaterialMove, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { ScoringHelper } from './material/ScoringHelper'
import { PlayerId } from './PlayerId'
import { ActivateAdjacentAbilityRule } from './rules/ActivateAdjacentAbilityRule'
import { ActivateLockRule } from './rules/ActivateLockRule'
import { BuyCardRule } from './rules/BuyCardRule'
import { ChooseBetweenRule } from './rules/ChooseBetweenRule'
import { DiscardEntireRiverRule } from './rules/DiscardEntireRiverRule'
import { DiscardFromRiverRule } from './rules/DiscardFromRiverRule'
import { EndGameRule } from './rules/EndGameRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
import { KeyEffectRule } from './rules/KeyEffectRule'
import { MoveMessengerRule } from './rules/MoveMessengerRule'
import { RuleId } from './rules/RuleId'
import { SpendKeyRule } from './rules/SpendKeyRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ChateauComboRules extends HiddenMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.SpendKey]: SpendKeyRule,
    [RuleId.KeyEffect]: KeyEffectRule,
    [RuleId.BuyCard]: BuyCardRule,
    [RuleId.MoveMessenger]: MoveMessengerRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.DiscardFromRiver]: DiscardFromRiverRule,
    [RuleId.ChooseBetween]: ChooseBetweenRule,
    [RuleId.EndGame]: EndGameRule,
    [RuleId.DiscardEntireRiver]: DiscardEntireRiverRule,
    [RuleId.ActivateAdjacentAbility]: ActivateAdjacentAbilityRule,
    [RuleId.ActivateLock]: ActivateLockRule
  }

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.River]: new FillGapStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Deck]: hideFront
    }
  }

  getScore(player: PlayerId): number {
    return new ScoringHelper(this.game, player).totalScore
  }

  getTieBreaker(tieBreaker: number, player: PlayerId) {
    if (tieBreaker === 1) {
      return new ScoringHelper(this.game, player).goldCount
    }
    return
  }
}