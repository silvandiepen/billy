export type AlertAction = () => void;

export interface AlertButton {
  label: string;
  action: AlertAction;
}
export interface AlertContent {
  title: string;
  description: string;
  buttons: AlertButton[];
}
export enum AlertServiceAction {
  CLOSE = "[AlertServiceAction] close",
}
export interface AlertServiceEventArguments {
  action: AlertServiceAction;
}
