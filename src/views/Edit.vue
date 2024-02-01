<script setup lang="ts">
import EditInvoice from "@/components/EditInvoice.vue";
import Preview from "@/components/Preview.vue";
import SideBar from "@/components/SideBar.vue";

import { useInvoice } from "@/composables";
const { invoice } = useInvoice();
</script>

<template>
  <div class="container">
    <div class="column column--edit">
      <SideBar>
        <EditInvoice />
      </SideBar>
    </div>
    <div class="container column--preview">
      <Preview :invoice="invoice"></Preview>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  height: 100vh;
}

.column {
  width: 50%;
  min-height: 100vh;
  flex-shrink: 0;
  padding: 2em;
  position: relative;

  &--edit {
    background-color: black;
    width: fit-content;
    max-height: 100vh;
    overflow: scroll;
    background-image: linear-gradient(to right bottom, black, var(--background));

  }

  &--preview {
    width: 100%;
    max-height: 100vh;
    overflow: scroll;
    background-color: #f7f7f7;
  }
}


@media print {

  .column--edit {

    display: none;
  }

  .column--preview {
    width: 100%;
    overflow: auto;
    background-color: transparent;
  }
}
</style>
