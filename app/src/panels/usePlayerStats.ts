import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { Card, getCardPlace } from '@gamepark/chateau-combo/material/Card'
import { cardCharacteristics, Shield, shields } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Place } from '@gamepark/chateau-combo/material/Place'
import { ScoringHelper } from '@gamepark/chateau-combo/material/ScoringHelper'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { useRules } from '@gamepark/react-game'
import { useMemo } from 'react'

export const usePlayerStats = (playerId: PlayerId) => {
  const rules = useRules<ChateauComboRules>()!

  const tableauCards = rules.material(MaterialType.Card)
    .location(LocationType.Tableau)
    .player(playerId)
    .getItems()

  return useMemo(() => {
    const scoring = new ScoringHelper(rules.game, playerId)
    const shieldCounts = shields.reduce((acc, shield) => { acc[shield] = 0; return acc }, {} as Record<Shield, number>)
    let castleCount = 0
    let villageCount = 0

    for (const item of tableauCards) {
      if (!item.id?.front || item.location.rotation) continue
      const card = item.id.front as Card
      for (const shield of cardCharacteristics[card].shields) shieldCounts[shield]++
      if (getCardPlace(card) === Place.Castle) castleCount++
      else villageCount++
    }

    return {
      shieldCounts,
      castleCount,
      villageCount,
      keyQuantity: scoring.keyScore,
      coinsQuantity: scoring.goldCount,
      score: scoring.totalScore,
      isOver: rules.isOver()
    }
  }, [tableauCards, rules, playerId])
}
