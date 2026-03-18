import { css } from '@emotion/react'
import { gold } from './colors'

export const journalTheme = {
  historyEntry: css`
    background: rgba(100, 70, 30, 0.12);
    background-color: rgba(100, 70, 30, 0.12);
    border-radius: 0.25em;
    font-family: 'Crimson Pro', Georgia, serif;
    color: #4A2A10;
    border-left: 0.3em solid ${gold};
    padding: 0.35em 0.5em 0.35em 0.6em;
    margin-bottom: 0.12em;
    margin-left: 0;
    font-size: 2.7em;
    box-shadow: none;

    @media only screen and (max-height: 599px) {
      font-size: 3em;
    }
  `
}
