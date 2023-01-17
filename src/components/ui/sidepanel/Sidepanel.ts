import { defineComponent, PropType, ref } from "vue";
import { useBemm } from "bemm";

import { eventBus, eventChannel } from "../../../composables";

import { ButtonType, ButtonIcon } from "../Button";
import ButtonComponent from "../button/Button.vue";

import {
  SidepanelPosition,
  SidepanelProps,
  SidepanelEventArguments,
  SidepanelAction,
} from "./Sidepanel.model";

export default defineComponent({
  components: {
    Knop: ButtonComponent,
  },
  props: {
    identifier: {
      type: String as PropType<SidepanelProps["identifier"]>,
      default: null,
    },
    position: {
      type: String as PropType<SidepanelProps["position"]>,
      default: SidepanelPosition.RIGHT,
    },
    active: {
      type: Boolean as PropType<SidepanelProps["active"]>,
      default: false,
    },
  },
  setup(props) {
    const bemm = useBemm("sidepanel");
    const isActive = ref(props.active);

    // Adctions
    const closeSidepanel = () => (isActive.value = false);
    const openSidepanel = () => (isActive.value = true);
    const toggleSidepanel = () => {
      console.log("toggling panel");
      isActive.value = !isActive.value;
    };

    // Events
    eventBus.on(eventChannel.SIDEPANEL, (args) => {
      const arg: SidepanelEventArguments = args as SidepanelEventArguments;

      if (arg.identifier === props.identifier) {
        switch (arg.action) {
          case SidepanelAction.OPEN:
            openSidepanel();
            break;
          case SidepanelAction.CLOSE:
            closeSidepanel();
            break;
          case SidepanelAction.TOGGLE:
            toggleSidepanel();
            break;
        }
      }
    });

    return {
      bemm,
      isActive,
      closeSidepanel,
      openSidepanel,
      toggleSidepanel,
      ButtonType,
      ButtonIcon,
    };
  },
});
