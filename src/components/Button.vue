<template>
    <button :class="blockClasses">
        <span v-if="icon" :class="bemm('icon')">
            <Icon :name="icon"></Icon>
        </span>
        <span v-if="hasSlot" :class="bemm('text')">
            <slot></slot>
        </span>
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
    background-color: var(--secondary);
    color: var(--secondary-text);
    border-radius: var(--border-radius);
    padding: .5em .75em;
    border: none;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    border-radius: 2em;

    &--primary {
        background-color: var(--primary);
        color: var(--primary-text);
    }
    &--secondary{
        background-color: var(--secondary);
        color: var(--secondary-text);
    }
    &--ghost{
        background-color: transparent;
        color: currentColor;
        border: 1px solid currentColor;
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
    }

    &--text-icon {

        padding-left: .25em;
    }

    &__icon {
        font-size: 1em;


        svg {
            width: 1em;
            height: 1em;

            path {
                fill: currentColor;
            }
        }

    }
}
</style>