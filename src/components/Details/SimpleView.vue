<template>
    <div :class="bemm()">

        <dl v-if="invoice.details.number">
            <dt>number</dt>
            <dd>{{  invoiceNumber(invoice) }}</dd>
        </dl>
        <dl>
            <dt>date</dt>
            <dd>{{  invoice.details.date }}</dd>
        </dl>
        <dl>
            <dt>currency</dt>
            <dd>{{  invoice.details.currency }}</dd>
        </dl>
        <dl>
            <dt>due date</dt>
            <dd>{{  invoice.details.dueDate }}</dd>
        </dl>
        <dl v-if="invoice.details.discount">
            <dt>discount</dt>
            <dd>{{  invoice.details.discount }}</dd>
        </dl>
        <dl v-if="invoice.details.taxRate">
            <dt>taxRate</dt>
            <dd>{{  invoice.details.taxRate }}</dd>
        </dl>
        <dl v-if="invoice.details.shipping">
            <dt>shipping</dt>
            <dd>{{  invoice.details.shipping }}</dd>
        </dl>



    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useBemm } from 'bemm';

import { Invoice } from '@/types';

import { invoiceNumber } from "@/utils";

const bemm = useBemm('details-simple');

defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
});

</script>

<style lang="scss">
.show-invoice-details {
    display: flex;
    justify-content: flex-start;
    gap: 2em;

    &__column {
        display: flex;
        flex-direction: column;

        padding: .5em 2em;

        &+& {
            border-left: 2px dotted var(--primary);

        }

        &:first-child {
            padding-left: 0;
        }
    }

    &__invoice-nr {
        // border: 2px solid var(--primary);
        // border-radius: var(--border-radius);
        // padding: .5em .75em;
    }
}</style>