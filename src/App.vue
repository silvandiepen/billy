<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";

import { ControlPanelComponent } from "./components/ControlPanel";
import { PreviewComponent } from "./components/Preview";
import { InvoiceComponent } from "./components/Invoice";
import {
  SidepanelComponent,
  SidepanelIdentfier,
  ModalIdentifier,
} from "./components/ui";

import { isPristineInvoice } from "./composables/state";
import { ToolbarComponent } from "./components/Toolbar";
import { IntroductionComponent } from "./components/Introduction";
export default defineComponent({
  components: {
    Toolbar: ToolbarComponent,
    Preview: PreviewComponent,
    ControlPanel: ControlPanelComponent,
    Sidepanel: SidepanelComponent,
    Invoice: InvoiceComponent,
    Introduction: IntroductionComponent,
  },
  setup() {
    const showIntroduction = computed(() => {
      return isPristineInvoice();
    });
    onMounted(()=>{
      document.querySelector('body')?.setAttribute('color-mode','light');
    })
    return { showIntroduction, SidepanelIdentfier, ModalIdentifier };
  },
});
</script>

<template>
  <Sidepanel :identifier="SidepanelIdentfier.MAIN" :active="true">
    <ControlPanel />
  </Sidepanel>
  <Preview>
    <Introduction v-if="showIntroduction" />
    <Invoice v-else />
  </Preview>
  <Toolbar />
</template>
