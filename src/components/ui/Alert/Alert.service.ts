import {
  AlertContent,
  AlertServiceEventArguments,
  AlertServiceAction,
} from ".";
import AlertComponent from "./Alert.vue";
// import { mount } from "mount-vue-component";
import { mount } from "../../../composables/mount";
import { eventBus, eventChannel } from "../../../composables";

export const createAlert = (instance: any, content: AlertContent) => {
  const { vNode, destroy, el } = mount(AlertComponent, {
    props: { content },
    element: document.body,
    app: instance,
  });
  eventBus.on(eventChannel.ALERT, (args) => {
    const arg: AlertServiceEventArguments = args as AlertServiceEventArguments;

    if (arg.action == AlertServiceAction.CLOSE) {
      console.log("destroying alert");
      //   console.log(action);
      console.log(vNode, el, destroy);
      destroy();
    }
  });
};
