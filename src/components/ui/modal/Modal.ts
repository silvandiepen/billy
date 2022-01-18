import { defineComponent, PropType, ref } from "vue";
import { Style } from "@sil/tools";

import { eventBus, eventChannel } from "../../../composables";
import { ModalProps, ModalEventArguments, ModalAction } from "./Modal.model";
import Button from "../button/Button.vue";

export default defineComponent({
  components: {
    Knop: Button,
  },
  props: {
    identifier: {
      type: String as PropType<ModalProps["identifier"]>,
      default: null,
    },
    active: {
      type: Boolean as PropType<ModalProps["active"]>,
      default: false,
    },
  },
  setup(props) {
    const isActive = ref(props.active);
    const style = new Style("modal");

    // Actions
    const closeModal = () => (isActive.value = false);
    const openModal = () => (isActive.value = true);
    const toggleModal = () => (isActive.value = !isActive.value);

    // Events
    eventBus.on(eventChannel.MODAL, (args) => {
      const arg: ModalEventArguments = args as ModalEventArguments;

      if (arg.identifier === props.identifier) {
        switch (arg.action) {
          case ModalAction.OPEN:
            openModal();
            break;
          case ModalAction.CLOSE:
            closeModal();
            break;
          case ModalAction.TOGGLE:
            toggleModal();
            break;
        }
      }
    });

    return {
      isActive,
      style,
      closeModal,
      openModal,
    };
  },
});
