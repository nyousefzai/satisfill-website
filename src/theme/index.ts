"use client";

import { theme } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";

const { defaultAlgorithm } = theme;

export const customTheme: ThemeConfig = {
  components: {
    Button: {},
    Input: {
      paddingBlockLG: 16,
      paddingInlineLG: 24,
      fontSizeLG: 20,
    },
  },
  token: {
    colorPrimary: "#00775e",
  },
  algorithm: defaultAlgorithm,
};

export const styledComponentsTheme = {
  ...customTheme.token,
  primaryBackground: "#e5f3ef",
  gray1: "#ffffff",
  gray2: "#fafafa",
  gray3: "#f5f5f5",
  gray4: "#f0f0f0",
  gray5: "#d9d9d9",
  gray6: "#bfbfbf",
  gray7: "#8c8c8c",
  gray8: "#595959",
  gray9: "#434343",
  gray10: "#262626",
  gray11: "#1f1f1f",
  gray12: "#141414",
  gray13: "#000000",
  icon: "#000",
};

export type StyledComponentsTheme = typeof styledComponentsTheme;
