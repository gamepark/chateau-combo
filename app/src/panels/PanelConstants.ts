// Panel layout constants — values in TABLE em
// Used by PlayerPanels.tsx AND OnPlayerPanelLocator.ts

export const tableXMin = -37
export const tableXMax = 46
export const tableYMin = -18.5

// Panel scale and dimensions
export const panelScale = 0.6
export const panelEmWidth = 22 // em at panel font-size
export const panelEmHeight = 8.48 // em at panel font-size (topZone + bar + strip)

// Actual rendered dimensions in table em
export const panelWidth = panelEmWidth * panelScale
export const panelHeight = panelEmHeight * panelScale

// Panel positioning
export const panelMargin = 0.3 // table em from edges
export const panelTopMargin = panelMargin
export const panelGapEm = 1.01 // gap in panel font-size em
export const panelGap = panelGapEm * panelScale // gap in table em

/**
 * X coordinate (table em) of the center of a panel, given its index and total player count.
 */
export function getPanelX(panelIndex: number, totalPlayers: number): number {
  if (totalPlayers === 2) {
    return panelIndex === 0
      ? tableXMin + panelMargin + panelWidth / 2
      : tableXMax - panelMargin - panelWidth / 2
  }
  const tableCenter = (tableXMin + tableXMax) / 2
  const totalWidth = totalPlayers * panelWidth + (totalPlayers - 1) * panelGap
  const startX = tableCenter - totalWidth / 2
  return startX + panelIndex * (panelWidth + panelGap) + panelWidth / 2
}
