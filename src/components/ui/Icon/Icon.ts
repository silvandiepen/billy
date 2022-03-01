import { defineComponent, PropType } from "vue";
import { Style } from "@sil/tools";
import { IconList } from "./Icon.model";

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconList>,
      default: "",
    },
  },
  setup() {
    const style = new Style("icon");
    return {
      style,
    };
  },
});
