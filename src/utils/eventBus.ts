import mitt from "mitt";

export enum EventChannel {
  DATA = "data",
  UI = "ui",
  ACTION = "action",
}

export enum EventType {
   POPUP = "ui:popup",
 }

export interface EventData {
  type: EventType | string;
  value: any;
}

export const eventBus = mitt();

export const showPopup = (data: Object = {}) => {
  eventBus.emit(EventChannel.UI, {
    type: EventType.POPUP,
    ...data
  });
}

