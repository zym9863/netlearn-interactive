// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${theme.fonts.body};
    font-size: 16px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    margin-bottom: ${theme.space.md};
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
  }

  h5 {
    font-size: ${theme.fontSizes.lg};
  }

  h6 {
    font-size: ${theme.fontSizes.md};
  }

  p {
    margin-bottom: ${theme.space.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.body};
  }

  ul, ol {
    margin-bottom: ${theme.space.md};
    padding-left: ${theme.space.xl};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  code {
    font-family: ${theme.fonts.monospace};
    background-color: ${theme.colors.lightGray};
    padding: ${theme.space.xs} ${theme.space.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.fontSizes.sm};
  }
`;

export default GlobalStyles;
