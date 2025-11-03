"use client";

import { useGlobalNotification } from "@/store/global-notification";
import { customTheme, styledComponentsTheme } from "@/theme";
import GlobalStyles from "@/theme/global-styles";
import { ConfigProvider, notification } from "antd";
import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "./styled-components-registry";

export default function Providers({ children }: { children: ReactNode }) {
  const [api, contextHolder] = notification.useNotification();
  const { setNotificationFunctions } = useGlobalNotification();

  useEffect(() => {
    if (api) {
      setNotificationFunctions({
        success: api["success"],
        error: api["error"],
        info: api["info"],
        warning: api["warning"],
        destroy: api["destroy"],
      });
    }
  }, [api]);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={styledComponentsTheme}>
        <GlobalStyles />
        <ConfigProvider theme={customTheme}>
          {children}
          {contextHolder}
        </ConfigProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
