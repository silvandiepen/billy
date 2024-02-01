<template>
    <button :class="blockClasses">
        <div :class="bemm('container')">
            <span v-if="icon" :class="bemm('icon')">
                <Icon :name="icon"></Icon>
            </span>
            <span v-if="hasSlot" :class="bemm('text')">
                <slot></slot>
            </span>
        </div>
    </button>
</template>

<script lang="ts" setup>
import { PropType, computed, useSlots } from "vue";
import Icon from '@/components/Icon.vue';
import { useBemm } from 'bemm';

import { Icons } from "@/types";

const bemm = useBemm('button');

const slots = useSlots();


const props = defineProps({
    icon: {
        type: String as PropType<Icons>
    },
    size: {
        type: String as PropType<'small' | 'medium' | 'large'>,
        default: 'medium'
    },
    type: {
        type: String as PropType<'primary' | 'secondary' | 'ghost'>,
        default: 'primary'
    }
})

const blockClasses = computed(() => {

    const classes = [bemm()];

    if (props.icon) {
        classes.push(bemm('', 'has-icon'));
    }
    classes.push(bemm('', props.size))
    classes.push(bemm('', props.type))

    if (!hasSlot.value && props.icon) {
        classes.push(bemm('', 'icon-only'));
    }
    if (hasSlot.value && props.icon) {
        classes.push(bemm('', 'text-icon'));
    }

    return classes;
})

const hasSlot = computed(() => {
    return !!slots.default;
})

</script>

<style lang="scss">
.button {
    // background-color: var(--secondary);
    color: var(--secondary-text);
    border-radius: var(--border-radius);
    padding: 1em 1.25em;
    border: none;

    border-radius: 2em;
    border: none;
    background-color: var(--background);
    position: relative;


    --background-opacity-from: .75;
    --background-opacity-to: .25;

    &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        content: "";
        border-radius: inherit;
        background-color: var(--background);
        background-image: linear-gradient(var(--button-background-direction, to right bottom), rgba(var(--background-color, var(--primary-rgb)), var(--background-opacity-from, 0.75)), rgba(var(--background-color, var(--primary-rgb)), var(--background-opacity-to, 0.75)));
        z-index: 2;
        transition: background-image .3s ease-in-out;

    }

    &::after {
        z-index: 1;
        position: absolute;
        left: -1px;
        top: -1px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        content: "";
        border-radius: inherit;
        background-image: linear-gradient(var(--button-border-direction, to left top), rgba(var(--background-color, var(--primary-rgb)), var(--background-opacity-to, 0.75)), rgba(var(--background-color, var(--primary-rgb)), var(--background-opacity-from, 0.25)));
        transition: background-image .3s ease-in-out;
    }


    &:hover{
        .button__container {
            transform: scale(1.05);
        }
    }


    &__container {
        position: relative;
        z-index: 3;
        display: flex;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        transition: transform .3s ease-in-out;
    }


    &--primary {
        --background-color: var(--primary-rgb);
        color: var(--primary-text);
    }

    &--secondary {
        --background-color: var(--secondary--rgb);
        color: var(--secondary-text);
    }

    &--ghost {
        // background-color: transparent;


        --background-opacity-from: 0.125;
        --background-opacity-to: 0;
        color: currentColor;

    }


    &--small {
        font-size: .75em;
    }

    &--medium {
        font-size: 1em;
    }

    &--large {
        font-size: 1.25em;
    }

    &--icon-only {
        padding: 0;
        font-size: 1.25em;
        aspect-ratio: 1/1;
        padding: .25em;
        display: flex;
        align-items: center;
        justify-content: center;

        .button__icon {
            font-size: 1em;
            margin: 0;
            width: 1em;
            height: 1em;
        }
    }

    &--text-icon {

        // padding-left: .25em;
    }

    &__icon {
        width: 1em;
        height: 1em;
        font-size: 1.5em;
        margin-right: .5em;



        svg {
            width: 1em;
            height: 1em;

            filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .5));

            path {
                fill: currentColor;
            }
        }

    }
}
</style>