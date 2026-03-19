// Panel layout constants — values in TABLE em
// Used by PlayerPanels.tsx AND OnPlayerPanelLocator.ts

export const tableXMax = 46
export const tableYMin = -18.5

// Panel scale and dimensions
export const panelScale = 0.6
export const panelEmWidth = 22 // em at panel font-size
export const panelEmHeight = 8.48 // em at panel font-size (topZone + bar + strip)

// Actual rendered dimensions in table em
export const panelWidth = panelEmWidth * panelScale
export const panelHeight = panelEmHeight * panelScale

// Panel positioning (horizontal, aligned right)
export const panelRightMargin = 0.3 // table em from right edge
export const panelTopMargin = 0.3 // table em from top edge
export const panelGapEm = 1.01 // gap in panel font-size em
export const panelGap = panelGapEm * panelScale // gap in table em
