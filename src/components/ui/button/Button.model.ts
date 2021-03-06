import { IconList } from "../Icon/Icon.model";

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ButtonType {
  NORMAL = "normal",
  GHOST = "ghost",
  ICON = "icon",
  SECONDARY = "secondary",
}

export enum ButtonColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface ButtonProps {
  size: ButtonSize;
  type: ButtonType;
  color: ButtonColor;
  icon: string;
}
export enum ButtonAlign {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}
export enum ButtonDirection {
  ROW = "row",
  COLUMN = "column",
}
export const ButtonIcon = IconList;
// export enum ButtonIcon {}
