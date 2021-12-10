<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import Sidebar from "./components/sidebar/Sidebar.vue";
import Preview from "./components/preview/Preview.vue";
import Invoice from "./components/invoice/Invoice.vue";
import Clients from "./components/clients/Clients.vue";
import Sidepanel from "./components/ui/sidepanel/Sidepanel.vue";
import Modal from "./components/ui/modal/Modal.vue";
// import { eventBus } from "./composables";

import { ModalIdentifier } from "./components/ui/modal/Modal.model";
export default defineComponent({
  components: {
    Preview,
    Sidebar,
    Sidepanel,
    Invoice,
    Modal,
    Clients,
  },
  setup() {
    const { t } = useI18n({});

    return {
      ClientModal: ModalIdentifier.CLIENT,
      t,
    };
  },
});
</script>

<template>
  <Sidepanel :active="true">
    <Sidebar />
  </Sidepanel>
  <Preview>
    <Invoice />
  </Preview>
  <Modal :identifier="ClientModal" :active="false">
    <Clients />
  </Modal>
</template>

<style lang="scss" src="./style/app.scss"></style>
