import { ChateauComboSetup } from '@gamepark/chateau-combo/ChateauComboSetup'
import { Card } from '@gamepark/chateau-combo/material/Card'
import { LocationType } from '@gamepark/chateau-combo/material/LocationType'
import { Place } from '@gamepark/chateau-combo/material/Place'

export const me = 1
export const opponent = 2
export class TutorialSetup extends ChateauComboSetup {
  setupRiverType(place: Place) {
    if (place === Place.Village) {
      const deck = this.getDeck(place)
      deck
        .id((id: { front: Card, back: Place }) => id.front === Card.Stonemason || id.front === Card.Potter)
        .deal({
          type: LocationType.River,
          id: place
        }, 2)

      deck
        .dealOne({
          type: LocationType.River,
          id: place
        })
    } else {
      const deck = this.getDeck(place)
      deck
        .id((id: { front: Card, back: Place }) => id.front === Card.Duchess)
        .dealOne({
          type: LocationType.River,
          id: place
        })

      deck
        .deal({
          type: LocationType.River,
          id: place
        }, 2)
    }

  }
}