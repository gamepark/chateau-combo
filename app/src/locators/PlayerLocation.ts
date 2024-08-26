import { Coordinates } from '@gamepark/rules-api'


export const getPosition = (players: number, index: number): Coordinates => {
  switch (players) {
    case 2: return getTwoPlayerGamePosition(index)
    case 3: return getThreePlayerGamePosition(index)
    case 4: return getFourPlayerGamePosition(index)
    case 5: return getFivePlayerGamePosition(index)
  }

  return { x: 0, y: 0, z: 0 }
}

export const getTwoPlayerGamePosition = (index: number) => {
  return { x: -30 + 60 * index, y: 12, z: 0 }
}

export const getThreePlayerGamePosition = (index: number) => {
  return { x: -30 + 30 * index, y: 12, z: 0 }
}

export const getFourPlayerGamePosition = (index: number) => {
  return { x: 0, y: 0, z: 0 }
}

export const getFivePlayerGamePosition = (index: number) => {
  return { x: 0, y: 0, z: 0 }
}