import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    id: "light" | "dark" | undefined;
    bgColor: string;
    bgHeaderColor: string;
    textColor: string;
    accentColor: string;
    boxColor: string;
    hoverColor: string;
    scrollColor: string;
  }
}
