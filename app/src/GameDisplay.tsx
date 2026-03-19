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

const navCss = css`
  top: auto !important;
  left: ${import.meta.env.DEV ? '70px' : '16px'} !important;
  bottom: 16px;
  gap: 1em;

  button {
    width: 1.8em !important;
    height: 1.8em !important;
    border-radius: 50% !important;
    border: 0.07em solid #C8923A !important;
    background:
      radial-gradient(ellipse at 35% 30%, rgba(255, 245, 220, 0.4), transparent 60%),
      linear-gradient(145deg, #F0E4C8, #dcc898, #D0BC88) !important;
    color: #3A2410 !important;
    box-shadow:
      0 0.07em 0.2em rgba(0, 0, 0, 0.35),
      inset 0 0.03em 0 rgba(255, 255, 255, 0.35),
      inset 0 -0.03em 0 rgba(0, 0, 0, 0.08) !important;
    filter: none !important;
    -webkit-tap-highlight-color: transparent;

    &:not(:disabled):hover {
      border-color: #E8B85C !important;
      box-shadow:
        0 0.15em 0.4em rgba(200, 146, 58, 0.3),
        0 0.07em 0.2em rgba(0, 0, 0, 0.3),
        inset 0 0.03em 0 rgba(255, 255, 255, 0.4) !important;
      background:
        radial-gradient(ellipse at 35% 30%, rgba(255, 248, 230, 0.5), transparent 60%),
        linear-gradient(145deg, #F5EDD5, #F0E4C8, #dcc898) !important;
    }

    &:disabled {
      border-color: #908878 !important;
      background: linear-gradient(145deg, #b8b0a0, #a8a090) !important;
      color: #706858 !important;
      box-shadow: none !important;
    }
  }
`

export const GameDisplay = () => {
  const { show, dismiss, reopen } = useExtensionDialog()

  return (
    <ExtensionDialogContext.Provider value={reopen}>
      <GameTable xMin={-37} xMax={46} yMin={-18.5} yMax={25} zoom={true}
                 css={process.env.NODE_ENV === 'development' && css`border: 1px solid white;`}>
        <GameTableNavigation css={navCss}/>
        <PlayerPanels/>
        <SwitchViewOnDrag/>
        {import.meta.env.DEV && <ChateauComboDevTools/>}
      </GameTable>
      {show && <ExtensionInfoDialog onClose={dismiss}/>}
    </ExtensionDialogContext.Provider>
  )
}
