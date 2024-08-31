/** @jsxImportSource @emotion/react */
import { ChateauComboOptionsSpec } from '@gamepark/chateau-combo/ChateauComboOptions'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { ChateauComboSetup } from '@gamepark/chateau-combo/ChateauComboSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import translations from './translations.json'

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
      animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
