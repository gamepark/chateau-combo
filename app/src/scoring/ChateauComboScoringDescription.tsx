import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { ScoringHelper } from '@gamepark/chateau-combo/material/ScoringHelper'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { Picture, ScoringDescription } from '@gamepark/react-game'
import React from 'react'
import { Trans } from 'react-i18next'
import Tableau0_0 from '../images/icons/scoring/tableau_0_0.jpg'
import Tableau0_1 from '../images/icons/scoring/tableau_0_1.jpg'
import Tableau0_2 from '../images/icons/scoring/tableau_0_2.jpg'
import Tableau1_0 from '../images/icons/scoring/tableau_1_0.jpg'
import Tableau1_1 from '../images/icons/scoring/tableau_1_1.jpg'
import Tableau1_2 from '../images/icons/scoring/tableau_1_2.jpg'
import Tableau2_0 from '../images/icons/scoring/tableau_2_0.jpg'
import Tableau2_1 from '../images/icons/scoring/tableau_2_1.jpg'
import Tableau2_2 from '../images/icons/scoring/tableau_2_2.jpg'
import Gold from '../images/tokens/Gold1.png'
import Key from '../images/tokens/Key1.png'

enum ScoringKeys {
  Tableau0_0 = 1,
  Tableau0_1,
  Tableau0_2,
  Tableau1_0,
  Tableau1_1,
  Tableau1_2,
  Tableau2_0,
  Tableau2_1,
  Tableau2_2,
  Keys,
  Gold,
  Total
}

const tableauImages = [
  [Tableau0_0, Tableau0_1, Tableau0_2],
  [Tableau1_0, Tableau1_1, Tableau1_2],
  [Tableau2_0, Tableau2_1, Tableau2_2]
]

const tableauKeys = [
  [ScoringKeys.Tableau0_0, ScoringKeys.Tableau0_1, ScoringKeys.Tableau0_2],
  [ScoringKeys.Tableau1_0, ScoringKeys.Tableau1_1, ScoringKeys.Tableau1_2],
  [ScoringKeys.Tableau2_0, ScoringKeys.Tableau2_1, ScoringKeys.Tableau2_2]
]

export class ChateauComboScoringDescription implements ScoringDescription {
  getScoringKeys() {
    return [
      ...tableauKeys.flat(),
      ScoringKeys.Keys,
      ScoringKeys.Total,
      ScoringKeys.Gold
    ]
  }

  getScoringHeader(key: ScoringKeys) {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (tableauKeys[y][x] === key) {
          return <div css={centeredCss}><Picture css={mini} src={tableauImages[y][x]}/></div>
        }
      }
    }
    switch (key) {
      case ScoringKeys.Keys:
        return <div css={centeredCss}><Picture css={[mini, keyCss]} src={Key}/></div>
      case ScoringKeys.Gold:
        return <div css={centeredCss}><Trans i18nKey="scoring.gold.tie" components={{ gold: <Picture css={mini} src={Gold}/> }}/></div>
      case ScoringKeys.Total:
      default:
        return <div css={[bold, centeredCss]}><Trans i18nKey="scoring.total"/></div>
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerId, rules: ChateauComboRules) {
    const scoring = new ScoringHelper(rules.game, player)
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (tableauKeys[y][x] === key) {
          return scoring.getCardScore(x, y)
        }
      }
    }
    switch (key) {
      case ScoringKeys.Keys:
        return scoring.keyScore
      case ScoringKeys.Gold:
        return scoring.goldCount
      case ScoringKeys.Total:
      default:
        return scoring.totalScore
    }
  }
}

const bold = css`
  font-weight: bold;
`

const centeredCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1em;
`

const mini = css`
  position: relative;
  height: 1.3em;
`

const keyCss = css`
  position: relative;
  height: 2em;
  transform: rotateZ(90deg) translateX(-0.5em);
`
