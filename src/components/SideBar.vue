<template>
    <aside :class="[bemm(), bemm('', isVisible ? 'visible' : 'hidden')]" :style="`--side-width: ${getColumnWidth}px`">
        <div :class="bemm('toggle')" @click="isVisible = !isVisible">
            <Icon :name="Icons.CHEVRON_LEFT" v-if="isVisible"></Icon>
            <Icon :name="Icons.CHEVRON_RIGHT" v-else></Icon>
        </div>
        <div :class="bemm('resizer')"></div>
        <div :class="bemm('container')">
            <slot></slot>

        </div>
    </aside>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useBemm } from "bemm";

import { Icons } from "@/types";
import Icon from "@/components/Icon.vue";

const bemm = useBemm('sidebar');


const isVisible = ref(true);
const resizing = ref(false);
const startX = ref(0);
const startWidth = ref(0);

const columnWidth = ref(240);


const getColumnWidth = computed(() => {
    // if (!isVisible.value) return 0;
    return columnWidth.value;

})

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
.sidebar {
    transform: translateX(0);
    transition: all .3s ease-in-out;
    width: var(--side-width);

    &--hidden {
        transform: translateX(calc(var(--side-width) * -1));
        width: 0;

        .sidebar__toggle {

            transform: translateX(calc(var(--side-width) + 1em));
        }
    }

    &__container {
        width: var(--side-width);
        max-height: 100vh;
        overflow: scroll;
        padding: 2em;

    }

    &__toggle {
        position: absolute;
        top: 1em;
        left: 100%;
        width: 2em;
        height: 2em;
        border-radius: 50%;
        transform: translateX(calc(-100% + 50%));
        transition: all .3s ease-in-out;
        background-color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            width: 1em;
            height: 1em;
            color: var(--primary-text);
            font-size: 1em;
        }
    }

    &__resizer {
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
}</style>