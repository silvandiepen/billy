<template>
  <Teleport to="body">

    <div :class="[bemm(), bemm('', loaded ? 'active' : 'inactive')]" v-if="active">
      <div :class="bemm('background')" @click="close()">
      </div>
      <Button :class="bemm('close')"  :icon="Icons.CLOSE"  @click="close()"></Button>
      <div :class="bemm('content')">
        <slot></slot>
      </div>

    </div>
  </Teleport>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';
import { onMounted, ref } from 'vue';

import { EventChannel, EventType, eventBus } from '@/utils';
import { Icons } from "@/types";

import Button from '@/components/Button.vue';

const active = ref(false);
const loaded = ref(false);
const bemm = useBemm('pop-up');

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const close = () => {
  loaded.value = false;
  setTimeout(() => {
    active.value = false;

  }, 200)
}

onMounted(() => {
  eventBus.on(EventChannel.UI, (data: any) => {
    if (data.type === EventType.POPUP && data.id === props.id) {

      if (active.value) {
        loaded.value = false;
        setTimeout(() => {
          active.value = false;
        }, 200)
      } else {
        active.value = true;
        setTimeout(() => {
          loaded.value = true;
        }, 200);
      }
    }
  })
})

</script>

<style lang="scss">
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
    @media screen and (width <= 768px) {

      align-items: flex-start;
      justify-content: flex-start;
    }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .25);
    backdrop-filter: blur(2px);
    opacity: 0;
    transition: .2s ease-in-out;
  }

  &__content {
    position: relative;
    z-index: 2;
    background-color: var(--background);
    color: var(--foreground);
    padding: var(--space);
    border-radius: var(--border-radius);
    transform: translateY(calc(var(--space-xl) * -1)) scale(0.9);
    transition: .2s ease-in-out;
    opacity: 0;
    max-height: 80vh;
    overflow: scroll;

    @media screen and (width <= 768px) {
border-radius: 0; 
      min-height: 100vh;
        width: 100%; max-height: 100vh;
    }
  }

&__close{
  position: fixed; top: 1em; right: 1em;
  z-index: 100  ;
}

  &--active {
    .pop-up__background {
      opacity: 1;
    }

    .pop-up__content {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}
</style>