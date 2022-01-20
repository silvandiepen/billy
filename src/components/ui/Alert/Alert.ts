import { defineComponent, onMounted, PropType } from "vue";
import { AlertServiceAction } from ".";
import {
  ModalComponent,
  ButtonComponent,
  ButtonGroupComponent,
  ModalIdentifier,
  ModalEventArguments,
  ModalAction,
} from "..";
import { eventBus, eventChannel } from "../../../composables";
import { AlertContent, AlertServiceEventArguments } from "./Alert.model";
export default defineComponent({
  components: {
    UIModal: ModalComponent,
    UIButton: ButtonComponent,
    UIButtonGroup: ButtonGroupComponent,
  },
  props: {
    content: {
      type: Object as PropType<AlertContent>,
      required: true,
    },
  },
  setup() {
    const openModal = () => {
      eventBus.emit(eventChannel.MODAL, {
        identifier: ModalIdentifier.ALERT,
        active: true,
        action: ModalAction.OPEN,
      } as ModalEventArguments);
    };
    const closeModal = () => {
      eventBus.emit(eventChannel.MODAL, {
        identifier: ModalIdentifier.ALERT,
        active: false,
        action: ModalAction.CLOSE,
      } as ModalEventArguments);

      // emit("closeEvent");
      eventBus.emit(eventChannel.ALERT),
        {
          action: AlertServiceAction.CLOSE,
        } as AlertServiceEventArguments;
    };

    onMounted(() => {
      openModal();
    });

    const invokeAction = (action: () => void) => {
      closeModal();
      action();
    };

    return { invokeAction, ModalIdentifier };
  },
});
