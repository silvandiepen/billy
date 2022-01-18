<script lang="ts">
import { defineComponent, computed, ref } from "vue";

import ControlPanel from "./components/ControlPanel/ControlPanel.vue";
import Preview from "./components/preview/Preview.vue";
import Invoice from "./components/invoice/Invoice.vue";
import Sidepanel from "./components/ui/sidepanel/Sidepanel.vue";
import { SidepanelIdentfier } from "./components/ui/sidepanel/Sidepanel.model";
import { state } from "./composables/state";
export default defineComponent({
  components: {
    Preview,
    ControlPanel,
    Sidepanel,
    Invoice,
  },
  setup() {
    const invoice = computed(() => {
      return state.invoice;
    });
    const debug = ref(false);
    return {
      SidepanelIdentfier,
      invoice,
      debug,
    };
  },
});
</script>

<template>
  <Sidepanel :identifier="SidepanelIdentfier.MAIN" :active="true">
    <ControlPanel />
  </Sidepanel>
  <Preview>
    <Invoice />
  </Preview>
  <div
    class="debug"
    @click="debug = !debug"
    :class="[debug ? 'debug--active' : 'debug--inactive']"
  >
    <button v-if="!debug">showDebug</button>
    <pre v-if="debug">{{ invoice }}</pre>
  </div>
</template>

<style lang="scss" src="./style/app.scss"></style>
