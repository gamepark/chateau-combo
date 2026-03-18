import { css } from '@emotion/react'
import { brown, brownDark, gold, goldDark, goldLight } from './colors'
import { journalTheme } from './journal'
import { ParchmentCloseButton } from './ParchmentCloseButton'
import { ParchmentNavigation } from './ParchmentNavigation'

const waxSealButtonBaseCss = css`
  font-family: 'MedievalSharp', cursive;
  font-size: 1.05em;
  font-weight: 700;
  background: linear-gradient(135deg, #F0E4C8 0%, #e6d6b0 40%, #dcc898 100%);
  color: ${brownDark};
  border: 0.12em solid ${gold};
  border-radius: 0.35em;
  box-shadow: 0 0.12em 0.35em rgba(0,0,0,0.4), inset 0 0.06em 0 rgba(255,255,255,0.4), inset 0 -0.06em 0 rgba(0,0,0,0.1);
  text-shadow: 0 0.06em 0 rgba(255,255,255,0.3);
  letter-spacing: 0.03em;
  padding: 0.3em 0.6em;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: linear-gradient(135deg, #f5edd5 0%, #F0E4C8 40%, #e6d6b0 100%);
    border-color: ${goldLight};
    box-shadow: 0 0.25em 0.7em rgba(212,168,40,0.3), 0 0.12em 0.35em rgba(0,0,0,0.4), inset 0 0.06em 0 rgba(255,255,255,0.5);
    transform: translateY(-0.06em);
  }

  &:disabled {
    background: linear-gradient(135deg, #b8b0a0 0%, #a8a090 100%);
    border-color: #888070;
    color: #706858;
    box-shadow: none;
    text-shadow: none;
    cursor: default;

    img, picture {
      filter: grayscale(1) opacity(0.5);
    }
  }
`

export const waxSealButtonCss = css`
  font-family: 'MedievalSharp', cursive;
  font-size: 1.05em;
  font-weight: 700;
  background: linear-gradient(135deg, #F0E4C8 0%, #e6d6b0 40%, #dcc898 100%);
  color: ${brownDark};
  border: 0.12em solid ${gold};
  border-radius: 0.35em;
  box-shadow: 0 0.12em 0.35em rgba(0,0,0,0.4), inset 0 0.06em 0 rgba(255,255,255,0.4), inset 0 -0.06em 0 rgba(0,0,0,0.1);
  text-shadow: 0 0.06em 0 rgba(255,255,255,0.3);
  letter-spacing: 0.03em;
  padding: 0.3em 1.2em 0.3em 0.6em;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -0.4em;
    top: 50%;
    transform: translateY(-50%);
    width: 1em;
    height: 1em;
    background: radial-gradient(circle at 40% 35%, #c43a3a 0%, #8B2A40 50%, #5C1A2A 100%);
    border-radius: 50%;
    border: 0.12em solid ${gold};
    box-shadow: 0 0.12em 0.25em rgba(0,0,0,0.5), inset 0 -0.06em 0.12em rgba(0,0,0,0.3);
  }

  &:hover {
    background: linear-gradient(135deg, #f5edd5 0%, #F0E4C8 40%, #e6d6b0 100%);
    border-color: ${goldLight};
    box-shadow: 0 0.25em 0.7em rgba(212,168,40,0.3), 0 0.12em 0.35em rgba(0,0,0,0.4), inset 0 0.06em 0 rgba(255,255,255,0.5);
    transform: translateY(-0.06em);

    &::after {
      background: radial-gradient(circle at 40% 35%, #d94a4a 0%, #a03048 50%, #7a2238 100%);
      box-shadow: 0 0.12em 0.5em rgba(200,50,60,0.4), inset 0 -0.06em 0.12em rgba(0,0,0,0.3);
    }
  }

  &:disabled {
    background: linear-gradient(135deg, #b8b0a0 0%, #a8a090 100%);
    border-color: #888070;
    color: #706858;
    box-shadow: none;
    text-shadow: none;
    cursor: default;

    img, picture {
      filter: grayscale(1) opacity(0.5);
    }

    &::after {
      background: radial-gradient(circle at 40% 35%, #807070 0%, #605050 100%);
      border-color: #888070;
      box-shadow: none;
    }
  }
`

export const waxSealCss = css`
  position: absolute;
  right: -0.4em;
  top: 50%;
  transform: translateY(-50%);
  width: 1em;
  height: 1em;
  background: radial-gradient(circle at 40% 35%, #c43a3a 0%, #8B2A40 50%, #5C1A2A 100%);
  border-radius: 50%;
  border: 0.12em solid ${gold};
  box-shadow: 0 0.12em 0.25em rgba(0,0,0,0.5), inset 0 -0.06em 0.12em rgba(0,0,0,0.3);
  pointer-events: none;
`

export const theme = {
  root: {
    fontFamily: "'Lilita One', cursive",
    background: {
      image: '/cover-1920.jpg',
      overlay: 'rgba(0, 0, 0, 0.7)'
    }
  },
  palette: {
    primary: gold,
    primaryHover: goldLight,
    primaryActive: goldDark,
    primaryLight: '#FFF8E8',
    primaryLighter: '#FFF0D0',
    surface: '#F0E4C8',
    onSurface: brownDark,
    onSurfaceFocus: '#E8D8B4',
    onSurfaceActive: '#D8C8A0',
    danger: '#8B2020',
    dangerHover: '#FFD8D0',
    dangerActive: '#FFC0B0',
    disabled: '#8B8070'
  },
  dialog: {
    backgroundColor: '#E8D8B4',
    color: brownDark,
    container: css`
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

      h2 {
        font-family: 'MedievalSharp', cursive;
      }
    `,
    content: css`
      font-family: 'Crimson Pro', Georgia, serif;
      color: ${brown};
      @media only screen and (max-height: 599px) {
        font-size: 2.7em;
      }

      button {
        ${waxSealButtonCss}
      }
    `,
    closeButton: ParchmentCloseButton,
    navigation: ParchmentNavigation
  },
  header: {
    bar: css`
      background:
        radial-gradient(ellipse at 50% 50%, rgba(200, 180, 140, 0.15), transparent 70%),
        linear-gradient(90deg, #D8C8A0, #E8DCBC 20%, #F0E4C8 50%, #E8DCBC 80%, #D8C8A0);
      border-top: none;
      box-shadow: 0 0.15em 0.6em rgba(0, 0, 0, 0.4);
      font-family: 'MedievalSharp', cursive;
      color: ${brownDark};

      overflow: visible;
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        overflow: visible;
        margin: 0;
      }
    `,
    buttons: css`
      ${waxSealButtonBaseCss};
      font-size: 0.8em;
      padding-top: 0.1em;
      padding-bottom: 0.1em;
      border-width: 0.08em;

    `
  },
  dropArea: {
    backgroundColor: 'rgba(212, 168, 40, 0.3)'
  },
  menu: {
    panel: css`
      background:
        radial-gradient(ellipse at 20% 15%, rgba(200, 170, 110, 0.3), transparent 50%),
        radial-gradient(ellipse at 80% 85%, rgba(160, 130, 80, 0.15), transparent 50%),
        linear-gradient(168deg, #dcc898 0%, #E8D8B4 15%, #F2E6C8 30%, #E8DCBC 50%, #E0D0A8 70%, #D8C498 100%);
      color: ${brown};
      font-family: 'Crimson Pro', Georgia, serif;
    `
  },
  journal: journalTheme
}
