import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line no-shadow
export enum ColorPallete {
  PRIMARY_1 = '#9ab1c8',
  PRIMARY_2 = '#09416c',
  PRIMARY_3 = '#e6e7e7',
  PRIMARY_4 = '#9bb2ca',
  NEUTRAL_1 = '#18191d',
  NEUTRAL_2 = '#fcfcfc',
  NEUTRAL_3 = '#808080',
  NEUTRAL_4 = '#d6d4d4',
  NEUTRAL_5 = '#1d2024',
  NEUTRAL_6 = '#2a2b31',
  SYSTEM_1 = '#c11e0f',
  SYSTEM_2 = '#f2921b',
  SYSTEM_3 = '#4a90e2',
  SYSTEM_4 = '#494aa7',
  SYSTEM_5 = '#75b831',
}

export function applyAlpha(color: ColorPallete, alpha: number): string {
  return color + Math.round(alpha * 255).toString(16);
}

export default createGlobalStyle`
  :root {
    --color-primary-1: ${ColorPallete.PRIMARY_1};
    --color-primary-2: ${ColorPallete.PRIMARY_2};
    --color-primary-3: ${ColorPallete.PRIMARY_3};
    --color-primary-4: ${ColorPallete.PRIMARY_4};
    --color-neutral-1: ${ColorPallete.NEUTRAL_1};
    --color-neutral-2: ${ColorPallete.NEUTRAL_2};
    --color-neutral-3: ${ColorPallete.NEUTRAL_3};
    --color-neutral-4: ${ColorPallete.NEUTRAL_4};
    --color-neutral-5: ${ColorPallete.NEUTRAL_5};
    --color-neutral-6: ${ColorPallete.NEUTRAL_6};
    --color-system-1: ${ColorPallete.SYSTEM_1};
    --color-system-2: ${ColorPallete.SYSTEM_2};
    --color-system-3: ${ColorPallete.SYSTEM_3};
    --color-system-4: ${ColorPallete.SYSTEM_4};
    --color-system-5: ${ColorPallete.SYSTEM_5};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Nunito', Arial, Helvetica, sans-serif;
    font-size: 16px;
    /* color: var(--color-neutral-3); */
  }

  body {
    background: var(--color-neutral-1);
    /* color: #fff; */
    -webkit-font-smoothing: antialiased;
  }

  html, body {
    height: 100%;
  }

  body,
  input,
  button,
  div {
  }

  .no-user-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  ::-webkit-scrollbar{
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background-color: var(--color-neutral-3);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: var(--color-system-3)
  }

  ::-webkit-scrollbar-corner {
    background: var(--color-neutral-1);
  }
`;
