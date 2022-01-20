<script lang="ts">
import { defineComponent, computed, ref } from "vue";

import { ControlPanelComponent } from "./components/ControlPanel";
import { PreviewComponent } from "./components/Preview";
import { InvoiceComponent } from "./components/Invoice";
import {
  SidepanelComponent,
  SidepanelIdentfier,
  ModalIdentifier,
} from "./components/ui";

import { getInvoice } from "./composables/state";
import ToolbarComponent from "./components/Toolbar/Toolbar.vue";
export default defineComponent({
  components: {
    Toolbar: ToolbarComponent,
    Preview: PreviewComponent,
    ControlPanel: ControlPanelComponent,
    Sidepanel: SidepanelComponent,
    Invoice: InvoiceComponent,
  },
  setup() {
    const invoice = computed(() => {
      return getInvoice();
    });
    const debug = ref(false);
    return {
      SidepanelIdentfier,
      invoice,
      debug,
      ModalIdentifier,
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
  <Toolbar />
</template>
