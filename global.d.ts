import "styled-components";

import { type StyledComponentsTheme } from "./src/theme";

declare module "styled-components" {
  export interface DefaultTheme extends StyledComponentsTheme {}
}
