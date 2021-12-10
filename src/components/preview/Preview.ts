import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const allowZoom = ref(true);
    return {
      allowZoom,
    };
  },
});
