<template>
    <div :class="bemm()">
        <div :class="bemm('container')">
            <ul :class="bemm('list')">
                <li :class="bemm('item')" v-for="invoice in invoices">
                    <InvoiceCard  :invoice="invoice" />
                </li>
            </ul>
            <Button :icon="Icons.DOCUMENT_ADD" @click="createNewInvoice()">New Invoice</Button>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';

import InvoiceCard from '@/components/Invoice/Card.vue';
import Button from '@/components/Button.vue';
import { useArchive, useInvoice } from '@/composables';
import { useRouter } from 'vue-router';
import { Icons } from '@/types';

const bemm = useBemm('archive');
const { invoices } = useArchive();
const { newInvoice } = useInvoice();

const router = useRouter();

const createNewInvoice = () => {
    newInvoice();
    router.push('/edit');
}


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
}</style>