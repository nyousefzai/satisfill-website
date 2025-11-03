import type { ThemeConfig } from "antd";
import { createGlobalStyle, css } from "styled-components";

type Props = {
  theme?: ThemeConfig;
};

const styles = css`
  body {
    margin: 0;
    font-family: Inter;
  }

  .ant-form-item {
    margin: 0;
  }

  .ant-space {
    width: 100%;
  }

  a {
    color: inherit;
  }

  .ant-form-item-required {
    flex-direction: row-reverse;
    &::before {
      display: none !important;
      color: transparent;
    }
    &::after {
      display: none;
    }
  }
`;

const GlobalStyles = createGlobalStyle<Props>`
${styles}
`;

export default GlobalStyles;
