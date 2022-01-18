import { defineComponent, PropType, computed } from "vue";
import { Style } from "@sil/tools";

import {
  ButtonSize,
  ButtonProps,
  ButtonType,
  ButtonColor,
} from "./Button.model";

export default defineComponent({
  props: {
    size: {
      type: String as PropType<ButtonProps["size"]>,
      default: ButtonSize.MEDIUM,
    },
    type: {
      type: String as PropType<ButtonProps["type"]>,
      default: ButtonType.NORMAL,
    },
    icon: {
      type: String as PropType<ButtonProps["icon"]>,
      default: null,
    },
    color: {
      type: String as PropType<ButtonProps["color"]>,
      default: ButtonColor.PRIMARY,
    },
  },

  setup(props, { slots }) {
    const style = new Style("button");
    const iconOnly = props.type === ButtonType.ICON;

    const classes = computed(() => {
      let classNames = [];

      classNames.push(style.bem());
      classNames.push(style.bem("", props.size));
      classNames.push(style.bem("", iconOnly ? "icon-only" : props.type));
      classNames.push(style.bem("", props.color));
      classNames.push(props.icon && !iconOnly ? style.bem("", "has-icon") : "");

      return classNames;
    });

    const hasSlot = (name: string) => !!slots[name];

    return {
      style,
      classes,
      iconOnly,
      hasSlot,
    };
  },
});
