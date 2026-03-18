import { css } from '@emotion/react'
import { useDndMonitor } from '@dnd-kit/core'
import { DevToolEntry, DevToolsHub, GameTable, GameTableNavigation, usePlay, usePlayerId } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC, lazy, Suspense, useCallback, useState } from 'react'
import { ExtensionDialogContext, useExtensionDialog } from './ExtensionContext'
import { ExtensionInfoDialog } from './material/help/ExtensionInfoDialog'
import { PlayerPanels } from './panels/PlayerPanels'

const CardDebugViewer = import.meta.env.DEV ? lazy(() => import('./debug/CardDebugViewer').then(m => ({ default: m.CardDebugViewer }))) : null

const SwitchViewOnDrag = () => {
  const play = usePlay()
  const me = usePlayerId()
  const onDragStart = useCallback(() => {
    if (me) {
      play(MaterialMoveBuilder.changeView(me), { transient: true })
    }
  }, [me, play])
  useDndMonitor({ onDragStart })
  return null
}

const ChateauComboDevTools: FC = () => {
  const [showCards, setShowCards] = useState(false)
  return (
    <>
      <DevToolsHub>
        <DevToolEntry icon={'\u2726'} label="Card Viewer" desc="Browse & validate cards" onClick={() => setShowCards(!showCards)}/>
      </DevToolsHub>
      {showCards && CardDebugViewer && <Suspense><CardDebugViewer onClose={() => setShowCards(false)}/></Suspense>}
    </>
  )
}

export const GameDisplay = () => {
  const { show, dismiss, reopen } = useExtensionDialog()

  return (
    <ExtensionDialogContext.Provider value={reopen}>
      <GameTable xMin={-37} xMax={46} yMin={-18.5} yMax={22} zoom={true}
                 css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
        <GameTableNavigation/>
        <PlayerPanels/>
        <SwitchViewOnDrag/>
        {import.meta.env.DEV && <ChateauComboDevTools/>}
      </GameTable>
      {show && <ExtensionInfoDialog onClose={dismiss}/>}
    </ExtensionDialogContext.Provider>
  )
}
