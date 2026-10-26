import { Effect, EffectType } from '@gamepark/chateau-combo/material/Effect'

export const getLockEffects = (effects: Effect[]): Effect[] => {
  const result: Effect[] = []
  for (const effect of effects) {
    if (effect.type === EffectType.DiscardEntireRiver) {
      result.push({ type: EffectType.DiscardEntireRiver })
      if (effect.bonus) result.push(effect.bonus)
    } else {
      result.push(effect)
    }
  }
  return result
}
