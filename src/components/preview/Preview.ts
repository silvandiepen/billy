import { defineComponent, ref } from "vue";
import { Style } from "@sil/tools";

export default defineComponent({
  setup() {
    const allowZoom = ref(true);
    const style = new Style("preview");
    return {
      allowZoom,
      style,
    };
  },
});
