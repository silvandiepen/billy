<template>
    <div :class="bemm()">

        <div :class="bemm('column')">
        </div>

        <div :class="bemm('column')">
            <div :class="[bemm('subtotal'), bemm('subtotal', 'label'), bemm('label')]">Subtotal</div>
            <div :class="[bemm('tax'), bemm('tax', 'label'), bemm('label')]" v-for="tax in taxRates">Tax {{ tax.percentage
            }}%</div>
            <div :class="[bemm('shipping'), bemm('shipping', 'label'), bemm('label')]" v-if="shipping">
                shipping</div>
            <div :class="[bemm('total'), bemm('total', 'label'), bemm('label')]">Total</div>
        </div>

        <div :class="bemm('column')">
            <div :class="[bemm('subtotal'), bemm('subtotal', 'value'), bemm('value')]">{{ formatCurrency(subTotal) }}</div>
            <div :class="[bemm('tax'), bemm('tax', 'value'), bemm('value')]" v-for="tax in taxRates">{{
                formatCurrency(tax.amount) }}</div>

            <div :class="[bemm('shipping'), bemm('shipping', 'value'), bemm('value')]" v-if="shipping">{{
                formatCurrency(shipping) }}</div>
            <div :class="[bemm('total'), bemm('total', 'value'), bemm('value')]">{{ formatCurrency(total) }}</div>
        </div>


    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useBemm } from 'bemm';
import { formatCurrency, getTotal, getTotalShipping, getSubTotal, getTaxRates } from '@/utils';
import { Invoice } from '@/types';

const bemm = useBemm('show-total');

const props = defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    }
});

const shipping = computed(() => {
    return getTotalShipping(props.invoice)
})
const subTotal = computed(() => {
    return getSubTotal(props.invoice)
})
const total = computed(() => {
    return getTotal(props.invoice)
})

const taxRates = computed(() => {
    return getTaxRates(props.invoice)
})



</script>

<style lang="scss">
.show-total {
    display: flex;
    gap: 2em;
    // border-top: 2px solid var(--primary);

    &__column {
        width: fit-content;
        white-space: nowrap;
        padding: 1em 0;
        display: flex;
        flex-direction: column;
        gap: .5em;

        &:nth-child(1) {
            width: 100%
        }
    }
    &__subtotal,
    &__shipping,
    &__tax{
       opacity: .5;
    }

    &__value {
        text-align: right;
    }

    &__label {
        text-align: right;
    }

    &__total {
        font-weight: bold;
        font-size: 1.2em;

        padding: .5em .75em;

        &--value {
            color: var(--primary);
            background-color: var(--primary);
            color: var(--primary-text, black);
            border-radius: var(--border-radius);
        }
    }
}
</style>