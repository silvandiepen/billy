import { defineComponent, ref } from "vue";
import { useBemm} from "bemm";

export default defineComponent({
  setup() {
    const allowZoom = ref(true);
    const bemm = useBemm("preview");
    return {
      allowZoom,
      bemm,
    };
  },
});
