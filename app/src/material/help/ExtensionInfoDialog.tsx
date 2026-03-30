/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import LockIcon from '../../images/icons/lock.png'
import KeyIcon from '../../images/tokens/Key1.png'
import { brown, brownDark, gold } from '../../theme/colors'

type Props = {
  onClose: () => void
}

export const ExtensionInfoDialog: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation()
  return (
    <div css={overlayCss} onClick={onClose}>
      <div css={dialogCss} onClick={e => e.stopPropagation()}>
        <div css={headerCss}>
          <Picture src={LockIcon} css={headerIconCss}/>
          <div>
            <h2 css={titleCss}>{t('extension.title')}</h2>
            <p css={introCss}>{t('extension.intro')}</p>
          </div>
        </div>

        <div css={contentCss}>
          <div css={sectionCss}>
            <div css={sectionHeaderCss}>
              <Picture src={LockIcon} css={sectionIconCss}/>
              {t('extension.lock.title')}
              <span css={sectionLineCss}/>
            </div>
            <div css={blockCss}>
              {t('extension.lock.desc')}
            </div>
          </div>

          <div css={sectionCss}>
            <div css={sectionHeaderCss}>
              <Picture src={KeyIcon} css={sectionIconCss}/>
              {t('extension.activate.title')}
              <span css={sectionLineCss}/>
            </div>
            <div css={blockCss}>
              {t('extension.activate.desc')}
            </div>
          </div>

          <div css={sectionCss}>
            <div css={sectionHeaderCss}>
              {t('extension.scoring.title')}
              <span css={sectionLineCss}/>
            </div>
            <div css={blockCss}>
              {t('extension.scoring.desc')}
            </div>
          </div>
        </div>

        <button css={closeBtnCss} onClick={onClose}>
          {t('extension.ok')}
        </button>
      </div>
    </div>
  )
}

const overlayCss = css`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.3s ease;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`

const dialogCss = css`
  background:
    radial-gradient(ellipse at 20% 15%, rgba(200, 170, 110, 0.3), transparent 50%),
    radial-gradient(ellipse at 80% 85%, rgba(160, 130, 80, 0.15), transparent 50%),
    linear-gradient(168deg, #dcc898 0%, #E8D8B4 15%, #F2E6C8 30%, #E8DCBC 50%, #E0D0A8 70%, #D8C498 100%);
  border-radius: 0.6em;
  box-shadow:
    0 0.7em 3em rgba(0, 0, 0, 0.7),
    0 0 0 0.12em rgba(140, 110, 50, 0.4),
    0 0 0 0.3em rgba(40, 25, 10, 0.6),
    0 0 0 0.35em rgba(140, 110, 50, 0.2);
  font-family: 'Crimson Pro', Georgia, serif;
  color: ${brown};
  padding: 2em 2.5em;
  max-width: 35em;
  font-size: calc(3em * var(--gp-scale, 1));
  animation: slideUp 0.3s ease;
  @keyframes slideUp {
    from { transform: translateY(1em); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

const headerCss = css`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
  padding-bottom: 0.8em;
  border-bottom: 0.12em solid rgba(140, 110, 50, 0.15);
`

const headerIconCss = css`
  width: 4em;
  height: auto;
  filter: drop-shadow(0 0.12em 0.25em rgba(0, 0, 0, 0.3));
  flex-shrink: 0;
`

const titleCss = css`
  font-family: 'MedievalSharp', cursive;
  color: ${brownDark};
  text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.3);
  margin: 0 0 0.2em;
  font-size: 1.4em;
`

const introCss = css`
  margin: 0;
  color: #5C3A1E;
  font-size: 0.95em;
  line-height: 1.4;
`

const contentCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`

const sectionCss = css`
  margin-bottom: 0.3em;
`

const sectionHeaderCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.72em;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #3A2410;
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.3em;
`

const sectionIconCss = css`
  height: 1.8em;
  width: auto;
  filter: drop-shadow(0 0.06em 0.12em rgba(0, 0, 0, 0.3));
`

const sectionLineCss = css`
  flex: 1;
  height: 0.12em;
  background: linear-gradient(90deg, #D4A828 0%, rgba(140, 110, 50, 0.2) 50%, transparent 100%);
  border-radius: 0.06em;
`

const blockCss = css`
  color: #5C3A1E;
  font-size: 0.92em;
  line-height: 1.55;
  padding: 0.4em 0.7em;
  background: linear-gradient(135deg, rgba(140, 110, 50, 0.07), rgba(140, 110, 50, 0.02));
  border-left: 0.25em solid #D4A828;
  border-radius: 0 0.3em 0.3em 0;
  box-shadow: 0 0.06em 0.18em rgba(0, 0, 0, 0.06);
`

const closeBtnCss = css`
  display: block;
  margin: 1.2em auto 0;
  font-family: 'MedievalSharp', cursive;
  font-size: 1em;
  font-weight: 700;
  background: linear-gradient(135deg, #F0E4C8 0%, #e6d6b0 40%, #dcc898 100%);
  color: ${brownDark};
  border: 0.12em solid ${gold};
  border-radius: 0.35em;
  box-shadow: 0 0.12em 0.35em rgba(0, 0, 0, 0.4), inset 0 0.06em 0 rgba(255, 255, 255, 0.4);
  text-shadow: 0 0.06em 0 rgba(255, 255, 255, 0.3);
  padding: 0.3em 1.5em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #f5edd5 0%, #F0E4C8 40%, #e6d6b0 100%);
    transform: translateY(-0.06em);
    box-shadow: 0 0.25em 0.7em rgba(212, 168, 40, 0.3), 0 0.12em 0.35em rgba(0, 0, 0, 0.4);
  }
`
