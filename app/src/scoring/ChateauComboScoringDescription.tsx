/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { coinsMoney } from '@gamepark/chateau-combo/material/Coin'
import { keysMoney } from '@gamepark/chateau-combo/material/Key'
import { MaterialType } from '@gamepark/chateau-combo/material/MaterialType'
import { Tableau } from '@gamepark/chateau-combo/material/Tableau'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { ScoringDescription } from '@gamepark/react-client'
import { Picture } from '@gamepark/react-game'
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

export class ChateauComboScoringDescription implements ScoringDescription {
  getScoringKeys() {

    return [
      ScoringKeys.Tableau0_0,
      ScoringKeys.Tableau0_1,
      ScoringKeys.Tableau0_2,
      ScoringKeys.Tableau1_0,
      ScoringKeys.Tableau1_1,
      ScoringKeys.Tableau1_2,
      ScoringKeys.Tableau2_0,
      ScoringKeys.Tableau2_1,
      ScoringKeys.Tableau2_2,
      ScoringKeys.Keys,
      ScoringKeys.Total,
      ScoringKeys.Gold
    ]
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.Tableau0_0:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau0_0}/>
          </div>
        )
      case ScoringKeys.Tableau0_1:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau0_1}/>
          </div>
        )
      case ScoringKeys.Tableau0_2:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau0_2}/>
          </div>
        )
      case ScoringKeys.Tableau1_0:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau1_0}/>
          </div>
        )
      case ScoringKeys.Tableau1_1:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau1_1}/>
          </div>
        )
      case ScoringKeys.Tableau1_2:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau1_2}/>
          </div>
        )
      case ScoringKeys.Tableau2_0:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau2_0}/>
          </div>
        )
      case ScoringKeys.Tableau2_1:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau2_1}/>
          </div>
        )
      case ScoringKeys.Tableau2_2:
        return (
          <div css={centeredCss}>
            <Picture css={mini} src={Tableau2_2}/>
          </div>
        )
      case ScoringKeys.Keys:
        return (
          <div css={centeredCss}>
            <Picture css={[mini, keyCss ]} src={Key}/>
          </div>
        )
      case ScoringKeys.Gold:
        return (
          <div css={centeredCss}>
            <Trans defaults="scoring.gold.tie"
                   components={{
                     gold: <Picture css={mini} src={Gold}/>
                   }}
                   />
          </div>
        )
      case ScoringKeys.Total:
      default:
        return <div css={[bold, centeredCss]}><Trans defaults="scoring.total"/></div>
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerId, rules: ChateauComboRules) {
    const tableau = new Tableau(rules.game, player)
    switch (key) {
      case ScoringKeys.Tableau0_0:
        return tableau.getCardScore(0, 0)
      case ScoringKeys.Tableau0_1:
        return tableau.getCardScore(0, 1)
      case ScoringKeys.Tableau0_2:
        return tableau.getCardScore(0, 2)
      case ScoringKeys.Tableau1_0:
        return tableau.getCardScore(1, 0)
      case ScoringKeys.Tableau1_1:
        return tableau.getCardScore( 1, 1)
      case ScoringKeys.Tableau1_2:
        return tableau.getCardScore(1, 2)
      case ScoringKeys.Tableau2_0:
        return tableau.getCardScore(2, 0)
      case ScoringKeys.Tableau2_1:
        return tableau.getCardScore(2, 1)
      case ScoringKeys.Tableau2_2:
        return tableau.getCardScore(2, 2)
      case ScoringKeys.Gold:
        return coinsMoney.count(rules.material(MaterialType.GoldCoin).player(player))
      case ScoringKeys.Keys:
        return keysMoney.count(rules.material(MaterialType.Key).player(player))
      case ScoringKeys.Total:
      default:
        return tableau.score
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