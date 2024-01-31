<template>
    <aside :class="bemm()" :style="`--side-width: ${columnWidth}px`">
      <div class="resizer"></div>
        <slot></slot>
    </aside>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useBemm } from "bemm";
const bemm = useBemm('sidebar');



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

<style lang="scss">
.sidebar{
    width: var(--side-width);
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
}</style>