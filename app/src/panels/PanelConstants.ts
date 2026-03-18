// Panel layout constants — values in TABLE em
// Must match PlayerPanels.tsx and GameDisplay.tsx

export const tableXMax = 45
export const tableYMin = -18.5

// Panel scale and dimensions
export const panelScale = 0.6
export const panelEmWidth = 22 // em at panel font-size
export const panelEmHeight = 7.6 // approximate em at panel font-size (topZone + bar)

// Actual rendered dimensions in table em
export const panelWidth = panelEmWidth * panelScale
export const panelHeight = panelEmHeight * panelScale

// Panel positioning (right side, stacked vertically)
// Container: right = 0.5/scale, top = 1/scale (in panel font-size), converted to table em
export const panelRightMargin = 0.5 // table em from right edge of container
export const panelTopMargin = 1 // table em from top edge of container
export const panelGap = 0.8 * panelScale // flex gap 0.8em * scale

export function panelTopOffset(index: number): number {
  return panelTopMargin + index * (panelHeight + panelGap)
}
