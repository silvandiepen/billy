import { defineComponent, PropType, computed } from "vue";
import { useBemm, useClasses } from "bemm";
import { IconComponent } from "../Icon";

import {
  ButtonSize,
  ButtonProps,
  ButtonType,
  ButtonColor,
} from "./Button.model";

export default defineComponent({
  components: { Icon: IconComponent },
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
    const bemm = useBemm("button");
    const bemmClasses = useClasses("button");

    const iconOnly = props.type === ButtonType.ICON;

    const classes = computed(() =>
      bemmClasses(
        "",
        { m: props.size },
        { m: iconOnly ? "icon-only" : props.type },
        { m: props.color },
        props.icon && !iconOnly ? ["", "has-icon"] : null
      )
    );

    const hasSlot = (name: string) => !!slots[name];

    return {
      bemm,
      classes,
      iconOnly,
      hasSlot,
    };
  },
});
