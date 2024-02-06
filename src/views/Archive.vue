<template>
    <div :class="bemm()">
        <div :class="bemm('container')">
            <ul :class="bemm('list')">
                <li :class="bemm('item')" v-for="invoice in invoices">
                    <InvoiceCard :invoice="invoice" />
                </li>
            </ul>
        </div>
    </div>

    <Navigation></Navigation>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';

import { useArchive } from '@/composables';

import InvoiceCard from '@/components/Invoice/Card.vue';
import Navigation from '@/components/Navigation.vue';

const bemm = useBemm('archive');
const { invoices } = useArchive();



</script>

<style lang="scss">
.archive {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &__container {
        padding: var(--space-xl);

        max-width: 540px;
        margin: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        justify-content: center;
        align-items: center;
    }

    &__list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: var(--space);
        flex-direction: column;
    }

    &__item {
        // &+& {
        //     margin-top: var(--space)
        // }
    }
}
</style>