
<template>
    <div :class="bemm()">
        <ul :class="bemm('list')">
            <li :class="bemm('item')" v-for="item in invoice.items">
                <ItemView :item="item" :invoice="invoice" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useBemm } from 'bemm';

import { Invoice } from '@/types';

import ItemView from "@/components/Item/View.vue";


const bemm = useBemm('item-list');

defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
})



</script>

<style lang="scss">
.item-list {
    position: relative;
    z-index: 2;

    padding: 2em 0;

    &::before {
        background-color: var(--primary);
        opacity: .125;
        z-index: -1;
        position: absolute;
        top: 0;
        left: -2em;
        content: "";
        width: calc(100% + 4em);
        height: 100%;
    }

    &__list {
        padding: 0;
        margin: 0;
    }

    &__item {

        &+& {
            margin-top: var(--space)
        }
    }


    .item-view {


        display: flex;
        gap: var(--space);

        &__item {
            display: flex;
            flex-direction: row;
            gap: 1em;
            justify-content: stretch;
            align-items: flex-end;
            padding: 1em 0;

            &--title {
                font-weight: bold;
            }

            &--quantity {
                white-space: nowrap;
            }

            &--line-through {
                opacity: 0.5;
                text-decoration: line-through;
            }

            &+& {
                // border-top: 2px solid var(--primary);
            }


        }

        &__column {
            display: flex;
            width: fit-content;
            flex-shrink: 1;
            justify-content: flex-end;
            flex-direction: column;
            width: 25%;

            &--details {
                width: 100%;
                flex-direction: column;
            }

            &--quantity {
                opacity: .5;
            }

            &--price {
                opacity: .5;
            }

            &--total {
                gap: .5em;
            }
        }
    }
}
</style>