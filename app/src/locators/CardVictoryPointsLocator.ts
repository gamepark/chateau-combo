import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import VictoryPoints from '../images/icons/VictoryPoints.png'

export class CardVictoryPointsLocator extends Locator {
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
        font-family: "Sriracha", cursive;
        font-weight: 400;
        font-style: normal;
        font-size: 1.4em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `
  }
}

export const cardVictoryPointsLocator = new CardVictoryPointsLocator()