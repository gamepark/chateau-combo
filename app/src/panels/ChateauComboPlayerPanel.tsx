import { css } from '@emotion/react'
import { Shield, shields } from '@gamepark/chateau-combo/material/CardCharacteristics'
import { ChateauComboRules } from '@gamepark/chateau-combo/ChateauComboRules'
import { PlayerId } from '@gamepark/chateau-combo/PlayerId'
import { Avatar, Picture, PlayerTimer, usePlay, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import castleIcon from '../images/icons/messenger-castle.png'
import villageIcon from '../images/icons/messenger-village.png'
import pointImage from '../images/icons/point.png'
import Panel1 from '../images/panels/panel.1.jpg'
import Panel2 from '../images/panels/panel.2.jpg'
import Panel3 from '../images/panels/panel.3.jpg'
import Panel4 from '../images/panels/panel.4.jpg'
import Panel5 from '../images/panels/panel.5.jpg'
import coinImage from '../images/tokens/Gold1.png'
import keyImage from '../images/tokens/Key1.png'
import { shieldImages } from '../material/help/Images'
import { usePlayerStats } from './usePlayerStats'

const panelBackgrounds = [Panel1, Panel2, Panel3, Panel4, Panel5]

const shieldColors: Record<Shield, { bg: string; border: string }> = {
  [Shield.Nobility]: { bg: 'rgba(40,120,184,0.55)', border: 'rgba(60,140,200,0.5)' },
  [Shield.Faith]: { bg: 'rgba(136,72,160,0.55)', border: 'rgba(156,92,180,0.5)' },
  [Shield.Scholarship]: { bg: 'rgba(110,170,30,0.55)', border: 'rgba(130,190,50,0.5)' },
  [Shield.Military]: { bg: 'rgba(200,50,50,0.55)', border: 'rgba(220,70,70,0.5)' },
  [Shield.Craftsmanship]: { bg: 'rgba(216,136,40,0.55)', border: 'rgba(230,156,60,0.5)' },
  [Shield.Peasantry]: { bg: 'rgba(190,165,40,0.55)', border: 'rgba(210,185,60,0.5)' }
}

type Props = {
  playerId: PlayerId
  isViewed: boolean
  isLeftNeighbor: boolean
  isRightNeighbor: boolean
  viewedPlayer: PlayerId
}

export const ChateauComboPlayerPanel: FC<Props> = ({ playerId, isViewed, isLeftNeighbor, isRightNeighbor, viewedPlayer }) => {
  const play = usePlay()
  const rules = useRules<ChateauComboRules>()!
  const name = usePlayerName(playerId)
  const viewedName = usePlayerName(viewedPlayer)
  const { t } = useTranslation()
  const { shieldCounts, castleCount, villageCount, keyQuantity, coinsQuantity, score, isOver } = usePlayerStats(playerId)
  const isActive = rules.isTurnToPlay(playerId)

  const bg = panelBackgrounds[(playerId as number - 1) % panelBackgrounds.length]

  return (
    <div
      css={[outerCss, isViewed ? viewedCss : notViewedCss]}
      style={{ transform: isViewed ? 'scale(1.06)' : undefined }}
      onClick={() => play(MaterialMoveBuilder.changeView(playerId), { transient: true })}
    >
      <div css={turnBorderCss} style={{ opacity: isActive ? 1 : 0 }}/>
      {/* Panel card (background image + overlay + content) */}
      {isViewed && <FontAwesomeIcon icon={faEye} css={viewedIconCss}/>}
      <div css={panelCss(bg)}>
        <div css={bgOverlayCss}/>

        {/* Top zone: avatar + name/timer + resources */}
        <div css={topZoneCss}>
          <Avatar css={avatarCss} playerId={playerId}/>
          <div css={identityCss}>
            <span css={nameCss}>{name}</span>
            <div css={metaCss}>
              <PlayerTimer playerId={playerId} css={timerCss}/>
            </div>
          </div>
          <div css={chipsCss}>
            {isOver
              ? <Chip img={pointImage} value={score} score/>
              : <Chip img={keyImage} value={keyQuantity}/>
            }
            <Chip img={coinImage} value={coinsQuantity}/>
          </div>
        </div>

        {/* Bottom bar: shields + banners */}
        <div css={barCss}>
          <div css={shieldsRowCss}>
            {shields.map(shield => (
              <div
                key={shield}
                css={[shieldDotCss(shieldColors[shield]), shieldCounts[shield] === 0 && hiddenCss]}
              >
                <Picture src={shieldImages[shield]} css={shieldImgCss}/>
                <span css={shieldNumCss}>{shieldCounts[shield]}</span>
              </div>
            ))}
          </div>
          <div css={bannersRowCss}>
            <div css={bannerCellCss}>
              <Picture src={castleIcon} css={bannerImgCss}/>
              <span css={bannerNumCss}>{castleCount}</span>
            </div>
            <div css={bannerCellCss}>
              <Picture src={villageIcon} css={bannerImgCss}/>
              <span css={bannerNumCss}>{villageCount}</span>
            </div>
          </div>
        </div>
        {/* Neighbor banner strip */}
        <div css={[neighborStripCss, !isLeftNeighbor && !isRightNeighbor && neighborStripHiddenCss]}>
          {isLeftNeighbor ? t('neighbor.left', '◄ {player}\'s left neighbor', { player: viewedName })
            : isRightNeighbor ? t('neighbor.right', '{player}\'s right neighbor ►', { player: viewedName })
            : '\u00A0'}
        </div>
      </div>
    </div>
  )
}

const Chip: FC<{ img: string; value: number; score?: boolean }> = ({ img, value, score }) => (
  <div css={[chipCss, score && scoreChipCss]}>
    <Picture src={img} css={chipImgCss}/>
    <span>{value}</span>
  </div>
)

// ---- Styles ----

const outerCss = css`
  position: relative;
  width: 22em;
  border-radius: 1em;
  cursor: pointer;
  color: white;
  transform: scale(1);
  transform-origin: right center;
  will-change: transform, box-shadow;
  transition: transform 0.4s cubic-bezier(.2,.8,.3,1), box-shadow 0.4s ease;
  &:active {
    transition: transform 0.08s ease-out, box-shadow 0.08s ease-out;
  }

  @media only screen and (max-height: 599px) {
    font-size: 1.15em;
  }
`


const notViewedCss = css``

const viewedCss = css`
  transform: scale(1.06);
  box-shadow: 0 0.4em 1.2em rgba(0,0,0,0.45);
`

const panelCss = (bg: string) => css`
  position: relative;
  box-sizing: border-box;
  border-radius: 1em;
  overflow: hidden;
  background: url(${bg}) top center / cover;
  box-shadow: 0 0.3em 0.8em rgba(0,0,0,0.4), inset 0 0 0 0.12em rgba(255,255,255,0.12);
`

const bgOverlayCss = css`
  position: absolute; inset: 0;
  background:
    linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%),
    radial-gradient(ellipse at 30% 30%, transparent 40%, rgba(0,0,0,0.15) 100%);
  pointer-events: none;
  z-index: 0;
`

const topZoneCss = css`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0.6em 0.7em 0.4em 0.6em;
  gap: 0.5em;
`

const avatarCss = css`
  position: relative;
  width: 3.4em;
  height: 3.4em;
  min-width: 3.4em;
  min-height: 3.4em;
  flex-shrink: 0;
  border: 0.2em solid rgba(255,255,255,0.8);
  transition: border-color 0.3s;
`

const turnBorderCss = css`
  position: absolute;
  inset: -0.25em;
  z-index: -1;
  border-radius: 1.2em;
  background: linear-gradient(90deg, transparent, gold, rgb(40, 184, 206), transparent, gold, rgb(40, 184, 206), transparent);
  background-size: 200% 100%;
  animation: borderTravel 2s linear infinite;
  pointer-events: none;
  transition: opacity 0.3s;
  @keyframes borderTravel {
    0% { background-position: 0% 0%; }
    100% { background-position: 200% 0%; }
  }
`

const identityCss = css`
  flex: 1;
  min-width: 0;
`

const nameCss = css`
  font-family: 'Lilita One', sans-serif;
  font-size: 1.45em;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  line-height: 1.15;
  text-shadow: 0.05em 0.05em 0 rgba(0,0,0,0.5), 0 0 0.5em rgba(0,0,0,0.25);
`

const metaCss = css`
  display: flex;
  align-items: center;
  gap: 0.4em;
  margin-top: 0.1em;
`

const timerCss = css`
  font-size: 1em;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 0.05em 0.15em rgba(0,0,0,0.5);
  font-weight: 500;
  background: rgba(0,0,0,0.6);
  padding: 0.15em 0.5em;
  border-radius: 0.4em;
`

const viewedIconCss = css`
  position: absolute;
  top: -0.8em;
  left: -1em;
  z-index: 3;
  font-size: 1.1em;
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.75);
  padding: 0.3em 0.35em;
  border-radius: 0.4em;
  box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.4);
`

const neighborStripCss = css`
  position: relative;
  z-index: 2;
  background: linear-gradient(90deg, #d4a828, #c09020, #d4a828);
  padding: 0.2em 0.6em 0.25em;
  text-align: center;
  font-family: 'Lilita One', sans-serif;
  font-size: 1.15em;
  font-weight: normal;
  color: #fff;
  text-shadow: 0 0.05em 0.1em rgba(0,0,0,0.4);
  box-shadow: inset 0 0.1em 0 rgba(255,255,255,0.2);
  letter-spacing: 0.02em;
  max-height: 2em;
  opacity: 1;
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  overflow: hidden;
`

const neighborStripHiddenCss = css`
  max-height: 0;
  opacity: 0;
  padding: 0 0.6em;
`

const chipsCss = css`
  display: flex;
  gap: 0.25em;
  flex-shrink: 0;
`

const chipCss = css`
  display: flex;
  align-items: center;
  gap: 0.15em;
  background: rgba(0,0,0,0.45);
  border-radius: 1em;
  padding: 0.2em 0.5em 0.1em 0.35em;
  border: 0.1em solid rgba(255,255,255,0.12);
  backdrop-filter: blur(3px);
  font-family: 'Lilita One', sans-serif;
  font-size: 1.25em;
  font-weight: normal;
  text-shadow: 0 0.05em 0.15em rgba(0,0,0,0.5);
  line-height: 1;
  transition: transform 0.2s, background 0.2s;
`

const scoreChipCss = css`
  background: rgba(160,40,35,0.55);
`

const chipImgCss = css`
  height: 1.5em;
  width: auto;
`

// Bottom bar
const barCss = css`
  position: relative;
  z-index: 1;
  background: rgba(0,0,0,0.38);
  backdrop-filter: blur(5px);
  padding: 0.3em 0.6em 0.35em;
  display: flex;
  align-items: center;
  gap: 0.3em;
  border-top: 0.05em solid rgba(255,255,255,0.06);
`

const shieldsRowCss = css`
  display: flex;
  gap: 0.15em;
  flex: 1;
`

const shieldDotCss = (colors: { bg: string; border: string }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0.05em 0;
  border-radius: 0.35em;
  background: ${colors.bg};
  border: 0.12em solid ${colors.border};
  transition: background 0.4s, border-color 0.4s, transform 0.3s;
`

const hiddenCss = css`
  background: transparent;
  border-color: transparent;
`

const shieldImgCss = css`
  width: 1.8em;
  height: 1.8em;
  object-fit: contain;
  filter: drop-shadow(0 0.05em 0.05em rgba(0,0,0,0.35));
`

const shieldNumCss = css`
  font-family: 'Lilita One', sans-serif;
  font-size: 1.05em;
  font-weight: normal;
  color: #fff;
  line-height: 1;
  text-shadow: 0 0.05em 0.05em rgba(0,0,0,0.5);
`

const bannersRowCss = css`
  display: flex;
  gap: 0.15em;
  border-left: 0.05em solid rgba(255,255,255,0.08);
  padding-left: 0.3em;
`

const bannerCellCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.15em;
`

const bannerImgCss = css`
  width: 1.6em;
  height: 1.6em;
  object-fit: contain;
  filter: drop-shadow(0 0.05em 0.05em rgba(0,0,0,0.3));
`

const bannerNumCss = css`
  font-family: 'Lilita One', sans-serif;
  font-size: 1em;
  font-weight: normal;
  color: #fff;
  line-height: 1;
  text-shadow: 0 0.05em 0.05em rgba(0,0,0,0.5);
`

