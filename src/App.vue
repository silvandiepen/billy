<script lang="ts">
import { defineComponent } from "vue";

import Sidebar from "./components/sidebar/Sidebar.vue";
import Preview from "./components/preview/Preview.vue";
import Invoice from "./components/invoice/Invoice.vue";
import Sidepanel from "./components/ui/sidepanel/Sidepanel.vue";
import { SidepanelIdentfier } from "./components/ui/sidepanel/Sidepanel.model";

export default defineComponent({
  components: {
    Preview,
    Sidebar,
    Sidepanel,
    Invoice,
  },
  setup() {
    return {
      SidepanelIdentfier,
    };
  },
});
</script>

<template>
  <Sidepanel :identifier="SidepanelIdentfier.MAIN" :active="true">
    <Sidebar />
  </Sidepanel>
  <Preview>
    <Invoice />
  </Preview>
</template>

<style lang="scss" src="./style/app.scss"></style>
