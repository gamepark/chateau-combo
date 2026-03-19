import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { DropAreaDescription, GridLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, isMoveItemType, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { isEqual } from 'es-toolkit'
import { cardDescription } from '../material/ChateauComboCardDescription'
import { getViewPlayer } from './panelCoordinates'

export const TABLEAU_X = -20

class TableauLocator extends GridLocator {
  gap = { x: cardDescription.width + 0.2, y: cardDescription.height + 0.2 }
  gridSize = { columns: 3, rows: 3 }

  getCoordinates(location: Location, context: MaterialContext) {
    const coords = super.getCoordinates(location, context)
    return { x: TABLEAU_X + (coords.x ?? 0), y: (coords.y ?? 0) + 6.5, z: coords.z }
  }

  getLocations(context: MaterialContext) {
    const { rules, player } = context
    const viewPlayer = getViewPlayer(context)

    const selectedCard = rules.material(MaterialType.Card).selected(true)
    if (!!player && player === viewPlayer && selectedCard.length) {
      return rules.getLegalMoves(player).filter(isMoveItemType(MaterialType.Card))
        .filter(move => move.itemIndex === selectedCard.getIndex() && move.location.rotation === selectedCard.getItem()?.location.rotation)
        .map(move => move.location) as Location[]
    }
    return []
  }

  hide(item: MaterialItem, context: ItemContext): boolean {
    return item.location.player !== getViewPlayer(context)
  }

  getHoverTransform = () => ['translateZ(10em)', 'scale(2)']

  locationDescription = new TableauSpotDescription()

  getPositionDependencies(location: Location, context: MaterialContext): unknown {
    const selectedCard = context.rules.material(MaterialType.Card).selected(true)
    return [...super.getPositionDependencies(location, context), context.rules.game.rule?.id, selectedCard.length ? selectedCard.getIndex() : undefined]
  }
}

export class TableauSpotDescription extends DropAreaDescription {
  constructor() {
    super(cardDescription)
  }

  canShortClick(move: MaterialMove, location: Location, { rules }: MaterialContext) {
    return isMoveItemType(MaterialType.Card)(move)
      && isEqual(move.location, location)
      && rules.material(MaterialType.Card).getItem(move.itemIndex).selected === true
  }

  getBestDropMove(moves: MaterialMove[], _location: Location, context: ItemContext): MaterialMove {
    const moveWithSameRotation = moves.find(move =>
      isMoveItem(move) && move.location.rotation === context.rules.material(move.itemType).getItem(move.itemIndex)?.location.rotation
    )
    return moveWithSameRotation ?? moves[0]
  }
}

export const tableauLocator = new TableauLocator()
