import { defineComponent, PropType } from "vue";
import { useBemm } from "bemm";
import { IconList } from "./Icon.model";

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconList>,
      default: "",
    },
  },
  setup() {
    const bemm = useBemm("icon");
    return {
      bemm,
    };
  },
});
