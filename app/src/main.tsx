import { ChateauComboOptionsSpec } from '@gamepark/chateau-combo/ChateauComboOptions'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { ChateauComboSetup } from '@gamepark/chateau-combo/ChateauComboSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { chateauComboAnimations } from './animations/ChateauComboAnimations.ts'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import { ChateauComboScoringDescription } from './scoring/ChateauComboScoringDescription.tsx'
import { theme } from './theme'
import { Tutorial } from './tutorial/Tutorial.tsx'
import { TutorialAI } from './tutorial/TutorialAI.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="chateau-combo"
      Rules={ChateauComboRules}
      optionsSpec={ChateauComboOptionsSpec}
      GameSetup={ChateauComboSetup}
      material={Material}
      locators={Locators}
      materialI18n={materialI18n}
      animations={chateauComboAnimations}
      tutorial={new Tutorial()}
      scoring={new ChateauComboScoringDescription()}
      ai={TutorialAI}
      theme={theme}>
      <App/>
    </GameProvider>
  </StrictMode>
)
