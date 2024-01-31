<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import EditInvoice from "./components/EditInvoice.vue";
import Preview from "./components/Preview.vue";




let resizing = ref(false);
let startX = ref(0);
let startWidth = ref(0);

const columnWidth = ref(240);


const mouseDownHandler = (e: any) => {
  startX.value = e.pageX;
  startWidth.value = columnWidth.value;
  resizing.value = true;
};

const mouseMoveHandler = (e: any) => {
  if (resizing.value) {
    const width = startWidth.value + e.pageX - startX.value;
    columnWidth.value = width;
  }
};

const mouseUpHandler = () => {
  resizing.value = false;
};


onMounted(() => {
  const resizer = document.querySelector('.resizer') as HTMLElement;

  if (!resizer) return;

  resizer.addEventListener('mousedown', mouseDownHandler);
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('mouseup', mouseUpHandler);

});

onUnmounted(() => {
  window.removeEventListener('mousemove', mouseMoveHandler);
  window.removeEventListener('mouseup', mouseUpHandler);
});

</script>

<template>
  <div class="container" :style="`--side-width: ${columnWidth}px`">
    <div class="column column--edit">
      <div class="resizer"></div>
      <EditInvoice />
    </div>
    <div class="container column--preview">
      <Preview></Preview>
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
    width: var(--side-width);
    max-height: 100vh;
    overflow: scroll;
  }

  &--preview {
    width: 100%;
    max-height: 100vh;
    overflow: scroll;
    background-color: #f7f7f7;
  }
}

.resizer {
  opacity: 0.25;
  width: 4px;
  height: 2em;
  border-radius: 3px;
  background-color: white;
  position: absolute;
  right: .5em;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    opacity: .5;
  }
}

@media print {

  .column--edit {

    display: none;
  }
  .column--preview{
    width: 100%; overflow: auto; background-color: transparent;
  }
}
</style>
