import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { RuleId } from '@gamepark/chateau-combo/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isCreateItemType } from '@gamepark/rules-api/dist/material/moves/items/CreateItem'
import { isDeleteItemType } from '@gamepark/rules-api/dist/material/moves/items/DeleteItem'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'

export const chateauComboAnimations = new MaterialGameAnimations()

chateauComboAnimations
  .when()
  .rule(RuleId.KeyEffect)
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.Discard)
  .duration(0.3)

chateauComboAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.River)
  .duration(0.3)

chateauComboAnimations
  .when()
  .move((move, context) => isMoveItemType(MaterialType.Card)(move)
    && move.location.rotation !== context.rules.material(MaterialType.Card).getItem(move.itemIndex)!.location.rotation)
  .duration(0.3)

chateauComboAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Card)(move) && move.location.type === LocationType.PlayerBoard)
  .mine()
  .duration(0.5)


chateauComboAnimations
  .when()
  .move((move) => isDeleteItemType(MaterialType.Key)(move))
  .mine()
  .duration(0.5)


chateauComboAnimations
  .when()
  .move((move) => isMoveItemType(MaterialType.Key)(move) || isMoveItemType(MaterialType.GoldCoin)(move) || isCreateItemType(MaterialType.Key)(move) || isCreateItemType(MaterialType.GoldCoin)(move) || isDeleteItemType(MaterialType.GoldCoin)(move))
  .duration(0.8)