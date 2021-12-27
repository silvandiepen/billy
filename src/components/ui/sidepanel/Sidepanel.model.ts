export interface SidepanelProps {
  identifier: string;
  position: SidepanelPosition;
  active: boolean;
}

export enum SidepanelPosition {
  LEFT = "left",
  RIGHT = "right",
}

export enum SidepanelAction {
  OPEN = "[Sidepanel] open",
  CLOSE = "[Sidepanel] close",
  TOGGLE = "[Sidepanel] toggle",
}

export interface SidepanelEventArguments {
  identifier: SidepanelIdentfier;
  active: boolean;
  action: SidepanelAction;
}

export enum SidepanelIdentfier {
  MAIN = "[Sidepanel] main",
}
