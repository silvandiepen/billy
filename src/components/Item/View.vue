<template>
    <div :class="bemm()">
        <div :class="[bemm('column'), bemm('column', 'details')]">
            <span :class="bemm('item', 'title')">{{ item.title }}</span>
            <span :class="bemm('item', 'description')">{{ item.description }}</span>
            <span :class="bemm('item', 'tax-rate')" v-if="item.taxRate > -1">{{ item.taxRate }}</span>
        </div>

        <div :class="[bemm('column'), bemm('column', 'quantity')]">
            <span :class="bemm('item', 'quantity')">{{ item.quantity }} {{ item.unit ? item.unit : 'x' }}</span>
        </div>
        <div :class="[bemm('column'), bemm('column', 'price')]">
            <span :class="bemm('item', 'cost')">{{ formatCurrency(item.price) }}</span>
        </div>
        <div :class="[bemm('column'), bemm('column', 'total')]">
            <span
                :class="[bemm('item', 'price'), itemDiscount(item, props.invoice.details).discount > 0 ? bemm('item', 'line-through') : null]">{{
                    formatCurrency(itemPrice(item)) }}</span>
            <span v-if="itemDiscount(item, props.invoice.details).discount" :class="bemm('item', 'discounted')">{{
                formatCurrency(itemDiscount(item, props.invoice.details).price) }}</span>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useBemm } from 'bemm';

import { InvoiceItem, Invoice } from "@/types"

const bemm = useBemm('item-view');

import { itemDiscount, formatCurrency, itemPrice } from '@/utils';

const props = defineProps({
    item: {
        type: Object as PropType<InvoiceItem>,
        required: true
    },
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    }
})
</script>