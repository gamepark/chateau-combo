import { CompetitiveScore, FillGapStrategy, HiddenMaterialRules, hideFront, MaterialGame, MaterialMove, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { coins } from './material/Coin'
import { keys } from './material/Key'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Tableau } from './material/Tableau'
import { PlayerId } from './PlayerId'
import { BuyCardRule } from './rules/BuyCardRule'
import { ChooseBetweenRule } from './rules/ChooseBetweenRule'
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
    [RuleId.EndGame]: EndGameRule
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
    return this.material(MaterialType.Key).money(keys).player(player).count + new Tableau(this.game, player).score
  }

  getTieBreaker(tieBreaker: number, player: PlayerId) {
    if (tieBreaker === 1) {
      return this.material(MaterialType.GoldCoin).money(coins).location(LocationType.PlayerGoldStock).player(player).count
    }
    return
  }
}