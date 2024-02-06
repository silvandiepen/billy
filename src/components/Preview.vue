
<template>
  <div :class="bemm()">

    <div :class="bemm('tools')">
      <InputRange v-if="!autoSize" :label="`Preview Size`" v-model="previewSize" :min="0.2" :max="1.5" :step="0.01" />
      <InputCheckbox :label="`Auto size`" :class="bemm('auto-size')" v-model="autoSize" />
    </div>

    <div :class="bemm('paper')" id="paper"
      :style="`--preview-size: ${previewSize}cm; --primary: ${invoice.details.color}`">
      <div :class="bemm('invoice')">

        <header :class="bemm('header')">
          <EntityView :entity="invoice.receiver" label="to" />
          <EntityView :entity="invoice.sender" label="from" />
        </header>

        <div :class="bemm('details')">
          <DetailsView :invoice="invoice"></DetailsView>
        </div>

        <main :class="bemm('main')">
          <ItemListView :invoice="invoice"></ItemListView>
          <TotalView :invoice="invoice"></TotalView>
        </main>
        <footer :class="bemm('footer')">
          <NoteListView :invoice="invoice"></NoteListView>
        </footer>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, PropType } from "vue";
import { useBemm } from "bemm";
import { useUI } from "@/composables";
import { Invoice } from "@/types";

import DetailsView from "@/components/Details/View.vue";
import EntityView from "@/components/Entity/View.vue";
import ItemListView from "@/components/Item/List.vue";
import NoteListView from "@/components/Note/List.vue";
import TotalView from "@/components/Total/View.vue";
import InputRange from "@/components/form/InputRange.vue";
import InputCheckbox from "@/components/form/InputCheckbox.vue";

defineProps({
  invoice: {
    type: Object as PropType<Invoice>,
    required: true
  },
})

const bemm = useBemm("preview");
const { isMobile, previewSize } = useUI();

const autoSize = ref(true);


const setAutoSize = () => {
  previewSize.value = isMobile.value ? (window.innerWidth / 1000) : (window.innerWidth / 1000) - 0.25;
}

onMounted(() => {
  previewSize.value = 1;

  if (autoSize.value) {
    setAutoSize();
  }
  window.addEventListener("resize", () => {
    if (autoSize.value) {
      setAutoSize()
    }
  });
})



// Pinch

const evCache = ref<{ pointerId: any, clientX: number, clientY: number }[]>([])
const prevDiff = ref(-1);

type PointerEv = PointerEvent & { target: HTMLElement };

const removeEvent = (ev: PointerEv) => {
  const index = evCache.value.findIndex(
    (cachedEv) => cachedEv.pointerId === ev.pointerId,
  );
  evCache.value.splice(index, 1);
}

const pointerdownHandler = (ev: PointerEv) => {
  evCache.value.push(ev);
}

const pointerupHandler = (ev: PointerEv) => {
  removeEvent(ev);
  if (evCache.value.length < 2)  prevDiff.value = -1;  
}
const pointermoveHandler = (ev: PointerEv) => {

  const index = evCache.value.findIndex(
    (cachedEv) => cachedEv.pointerId === ev.pointerId,
  );
  evCache.value[index] = ev;
  if (evCache.value.length === 2) {
    const curDiff = Math.abs(evCache.value[0].clientX - evCache.value[1].clientX);   
    prevDiff.value = curDiff;
    previewSize.value = curDiff / 1000;
  }
}


const init = () => {
  // Install event handlers for the pointer target
  const el = document.getElementById("paper");
  if (!el) return;

  // @ts-ignore
  el.onpointerdown = pointerdownHandler;
  // @ts-ignore
  el.onpointermove = pointermoveHandler;

  // @ts-ignore
  el.onpointerup = pointerupHandler;
  // @ts-ignore
  el.onpointercancel = pointerupHandler;
  // @ts-ignore
  el.onpointerout = pointerupHandler;
  // @ts-ignore
  el.onpointerleave = pointerupHandler;
}

onMounted(() => {
  init()
})


</script>



<style lang="scss">
.preview {
  width: 100%;
  height: fit-content;
  min-height: 100vh;

  padding-top: 5em;
  padding-bottom: 5em;
  touch-action: none;

  &__tools {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    color: white;
    background-color: var(--dark);
    display: flex;
    gap: var(--space);
    padding: var(--space);
    margin: var(--space-s);
    border-radius: var(--border-radius);
    opacity: .125;

    &:hover {
      opacity: 1;
    }
  }

  &__paper {


    // width: 210mm;
    // height: 297mm;

    margin: auto;
    display: block;
    font-size: var(--preview-size, 1cm);
    width: 21em;
    height: 29.7em;
    border: 1px solid #ccc;
    background-color: var(--light);
    color: var(--dark);

  }

  &__invoice {
    color: black;
    font-size: .35em;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 2em;
    height: 100%;
    justify-content: space-between;
  }

  &__footer {
    align-self: flex-end;
    justify-self: flex-end;
  }

  &__main {
    display: flex;
    flex-direction: column;

  }

  &__debug {
    max-height: 80vh;
    overflow: scroll;
    background-color: rgba(0, 0, 0, .75);
    font-size: .5em;
    color: white;
    position: absolute;
    right: 1em;
    bottom: 1em;
    border-radius: .25em;

    &--active {
      opacity: 1
    }

    &--inactive {
      opacity: .1;

      max-height: 20vh;
    }
  }

  &__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
