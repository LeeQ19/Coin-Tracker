import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    bgHeaderColor: string;
    textColor: string;
    accentColor: string;
    boxColor: string;
    hoverColor: string;
  }
}
