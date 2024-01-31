<template>
    <div :class="blockClasses">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";

import { useBemm } from 'bemm';


const bemm = useBemm('button-group');



const props = defineProps({

    align: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    direction: {
        type: String as PropType<'horizontal' | 'vertical'>,
        default: 'horizontal'
    },
    type: {
        type: String as PropType<'stack' | 'normal'>,
        default: 'normal'
    }

})

const blockClasses = computed(() => {

    const classes = [bemm()];


    classes.push(bemm('', props.align))
    classes.push(bemm('', props.direction))
    classes.push(bemm('', props.type))

    return classes;
})


</script>

<style lang="scss">
.button-group {
    display: flex;
    gap: var(--space-s);

    &--horizontal {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;


        &.button-group--stack {
            gap: 0;

            .button {
                border-radius: 0;
            }

            .button:first-child {
                border-bottom-left-radius: var(--space-l);
                border-top-left-radius: var(--space-l);
            }

            .button:last-child {
                border-bottom-right-radius: var(--space-l);
                border-top-right-radius: var(--space-l);
            }
        }
    }

    &--vertical {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        &.button-group--stack {
            gap: 0;

            .button {
                width: 100%;
                border-radius: 0;
            }

            .button:first-child {
                border-top-left-radius: var(--space);
                border-top-right-radius: var(--space);
            }

            .button:last-child {
                border-bottom-right-radius: var(--space);
                border-bottom-left-radius: var(--space);
            }
        }
    }

    &--left {
        justify-content: flex-start;
    }

    &--center {
        justify-content: center;
    }

    &--right {
        justify-content: flex-end;
    }


}
</style>