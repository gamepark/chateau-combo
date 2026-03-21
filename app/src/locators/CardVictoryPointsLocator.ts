import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import VictoryPoints from '../images/icons/VictoryPoints.png'

class CardVictoryPointsLocator extends Locator {
  locationDescription = new CardVictoryPointsLocatorDescription()
  parentItemType = MaterialType.Card
  positionOnParent = { x: 90, y: 50 }
  coordinates = { z: 5 }
}

class CardVictoryPointsLocatorDescription extends LocationDescription {
  image = VictoryPoints
  width = 3
  height = 2.85
  borderRadius = 0.5

  getExtraCss(location: Location) {
    return css`
      &:before {
        position: absolute;
        content: '${location.x}';
        font-family: "MedievalSharp", cursive;
        font-weight: 700;
        font-style: normal;
        font-size: 1.4em;
        top: 56%;
        left: 53%;
        transform: translate(-50%, -50%);
        color: #fff;
        text-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.5);
      }
    `
  }
}

export const cardVictoryPointsLocator = new CardVictoryPointsLocator()