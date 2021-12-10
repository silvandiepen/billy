import { defineComponent, PropType, computed } from "vue";

import {
  ButtonSize,
  ButtonProps,
  ButtonType,
  ButtonColor,
} from "./Button.model";
import { bem } from "../../../composables";

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
    const block = "button";

    const iconOnly = props.type === ButtonType.ICON;

    const classes = computed(() => {
      let classNames = [];

      classNames.push(bem(block));
      classNames.push(bem(block, "", props.size));
      classNames.push(bem(block, "", iconOnly ? "icon-only" : props.type));
      classNames.push(bem(block, "", props.color));
      classNames.push(
        props.icon && !iconOnly ? bem(block, "", "has-icon") : ""
      );

      return classNames;
    });

    const hasSlot = (name: string) => !!slots[name];

    return {
      block,
      bem,
      classes,
      iconOnly,
      hasSlot,
    };
  },
});
