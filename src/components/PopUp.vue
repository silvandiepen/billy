<template>
  <div :class="[bemm(), bemm('', active ? 'active' : 'inactive')]" v-if="active">
    <div :class="bemm('background')" @click="active = !active">
    </div>
    <div :class="bemm('content')">
      <slot></slot>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { EventChannel, EventType, eventBus } from '@/utils';
import { useBemm } from 'bemm';
import { onMounted, ref } from 'vue';

const active = ref(false);
const bemm = useBemm('pop-up');

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(() => {
  eventBus.on(EventChannel.UI, (data: any) => {
    console.log(data);
    if (data.type === EventType.POPUP && data.id === props.id) {
      active.value = !active.value;
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

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .25);
    backdrop-filter: blur(2px);
    opacity: 0;
    transition: .3s ease-in-out;
  }

  &__content {
    position: relative;
    z-index: 2;
    background-color: white;
    color: black;
    padding: var(--space);
    border-radius: var(--border-radius);
  }

  &--active {
    .pop-up__background {
      opacity: 1;
    }
  }
}</style>