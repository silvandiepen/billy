import { defineComponent } from "vue";
import { useBemm } from "bemm";
export default defineComponent({
  setup() {
    const bemm = useBemm("introduction");
    return {
      bemm,
    };
  },
});
