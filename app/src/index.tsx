/** @jsxImportSource @emotion/react */
import { ChateauComboOptionsSpec } from '@gamepark/chateau-combo/ChateauComboOptions'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { ChateauComboSetup } from '@gamepark/chateau-combo/ChateauComboSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { chateauComboAnimations } from './animations/ChateauComboAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import { ChateauComboScoringDescription } from './scoring/ChateauComboScoringDescription'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'
import { TutorialAI } from './tutorial/TutorialAI'

setupTranslation(translations, { debug: false })

ReactDOM.render(
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
      ai={TutorialAI}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
