/** @jsxImportSource @emotion/react */

import { ChateauComboRules } from "@gamepark/chateau-combo/ChateauComboRules"
import { ImmediateEffectType } from "@gamepark/chateau-combo/material/ImmediateEffect"
import { MaterialType } from "@gamepark/chateau-combo/material/MaterialType"
import { Memory } from "@gamepark/chateau-combo/rules/Memory"
import { usePlayerId, useRules } from "@gamepark/react-game"
import { useTranslation } from "react-i18next"

export const ImmediateEffectHeader = () => {
  const rules = useRules<ChateauComboRules>()!
  const player = usePlayerId()
  const activePlayer = rules.getActivePlayer()!

  if (player === activePlayer){
    return <MyImmediateEffectHeader />
  } else {
    return <PlayerImmediateEffectHeader activePlayer={activePlayer} />
  }
}

const MyImmediateEffectHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const placedCard = rules.material(MaterialType.Card).index(rules.game.memory[Memory.PlacedCard]) 
  const actualImmediateEffect = undefined //rules.game.memory[Memory.ImmediateEffectsToPlay][0].type

  return <span>{ t(getEffectHeader(actualImmediateEffect, 'you'), {placedCard}) }</span>
}

const PlayerImmediateEffectHeader = ({ activePlayer }: { activePlayer: number }) => {
  const { t } = useTranslation()
  const rules = useRules<ChateauComboRules>()!
  const placedCard = rules.material(MaterialType.Card).index(rules.game.memory[Memory.PlacedCard]) 
  const actualImmediateEffect = undefined // rules.game.memory[Memory.ImmediateEffectsToPlay][0].type

  return <span>{ t(getEffectHeader(actualImmediateEffect, 'player'), {activePlayer, placedCard}) }</span>
}

function getEffectHeader(effect:ImmediateEffectType | undefined, who:string):string{
    switch (effect){
        case ImmediateEffectType.GainGold:
            return 'header.'+who+'.immediate.gold.effect'
        case ImmediateEffectType.GetKeys:
            return 'header.'+who+'.immediate.key.effect'
        case ImmediateEffectType.PutGoldOnCard:
            return 'header.'+who+'.immediate.put.gold.effect'
        default:
            return 'header.'+who+'.immediate.default.effect'
    }
}