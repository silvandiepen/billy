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

export enum ButtonIcon {
  CLOSE = "close",
  REMOVE = "close",
  DELETE = "close",
  NEW = "new",
  ADD = "add",
  EDIT = "edit",
  ARROW_LEFT = "arrow-left",
  ARROW_UP = "arrow-up",
  ARROW_RIGHT = "arrow-right",
  ARROW_DOWN = "arrow-down",
  FLAG_UK = "flag-uk",
  FLAG_NL = "flag-nl",
}
