<template>
    <article @mousemove="addMousePosition" :class="bemm()"
        :style="`--mouse-x: ${block.x}px; --mouse-y: ${block.y}px; --block-width: ${block.width}px; --block-height: ${block.height}px`">
        <div :class="bemm('container')">
            <slot></slot>
        </div>
    </article>
</template>


<script lang="ts" setup>
import { useBemm } from 'bemm';
import { ref } from 'vue';
const bemm = useBemm('card');


const block = ref({ x: 0, y: 0, width: 0, height: 0 });

const addMousePosition = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    block.value.x = Math.round((e.clientX - rect.left));
    block.value.y = Math.round((e.clientY - rect.top));
    block.value.width = rect.width;
    block.value.height = rect.height;
}

</script>

<style lang="scss">
.card {
    border: 1px solid var(--primary);
    border-radius: var(--border-radius);
    position: relative;

    --primary-opacity-25: rgba(var(--primary-rgb), .25);
    --primary-opacity-10: rgba(var(--primary-rgb), .1);

    --shadow-x:  calc((var(--mouse-x) - (var(--block-width) / 2)) / 4);
    --shadow-y:  calc((var(--mouse-y) - (var(--block-height) / 2)) / 4) ;

    box-shadow: var(--shadow-x) var(--shadow-y) 100px 0px var(--primary-opacity-10);

    &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
        background-image: radial-gradient(circle  at var(--mouse-x) var(--mouse-y), var(--primary-opacity-10) 0%, var(--dark) 100%);
        content: "";
        display: block;
        z-index: 2;
        pointer-events: none;
    }

    &::after {
        position: absolute;
        left: -1px;
        top: -1px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        border-radius: calc(var(--border-radius) - 1px);
        background-image: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--dark) 0%, var(--primary-opacity-25) 100%);
        content: "";
        z-index: 1;
        display: block;
        pointer-events: none;
    }

    &__container {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: var(--space);
        padding: 1em;
    }
}
</style>