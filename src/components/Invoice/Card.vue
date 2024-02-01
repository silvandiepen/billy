
<template>
    <Card :class="bemm()">

        <Icon :class="bemm('icon')" :name="Icons.DOCUMENT" />
        <div :class="bemm('details')">
            <dl :class="bemm('item')">
                <dt :class="bemm('label')">Number</dt>
                <dd :class="bemm('value')">{{ invoiceNumber(invoice) }}</dd>
            </dl>
            <dl :class="bemm('item')">
                <dt :class="bemm('label')">Date</dt>
                <dd :class="bemm('value')">{{ invoice.details.date }}</dd>
            </dl>
            <dl>
                <dt :class="bemm('label')">Total</dt>
                <dd :class="bemm('value')">{{ formatCurrency(getTotal(invoice)) }}</dd>
            </dl>
        </div>


        <div :class="bemm('actions')">

            <Button :icon="Icons.EDIT" @click="editInvoice(invoice)"></Button>
            <Button :icon="Icons.CLOSE" @click="deleteInvoice(invoice)"></Button>

        </div>
    </Card>
</template>
<script lang="ts" setup>
import { useBemm } from 'bemm';
import { PropType } from 'vue';
import { useRouter } from 'vue-router';

import { Invoice, Icons } from '@/types';
import { invoiceNumber, getTotal, formatCurrency } from '@/utils';
import { useArchive, useInvoice } from '@/composables';

import Icon from '@/components/Icon.vue';
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";


const { removeInvoice } = useArchive();
const { setInvoice } = useInvoice();
const { push } = useRouter();
const { bemm } = useBemm('invoice-card');

defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    }
})


const deleteInvoice = (invoice: Invoice) => {
    console.log('remove invoice', invoice);
    if (confirm('Are you sure you want to delete this invoice?')) {
        removeInvoice(invoice);
    }
    // showPopup({ id: 'remove-invoice', invoice })
}
const editInvoice = (invoice: Invoice) => {
    setInvoice(invoice)
    push(`/edit`);

}

</script>

<style lang="scss">
.invoice-card {

    &__details {
        display: flex;
        gap: var(--space);
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }

    &__icon {
        width: 3em;
        height: 3em;
        display: block;
        color: var(--primary);

    }

    &__actions {
        padding: .5em;
        border-radius: 4em;
        background-color: black;
        display: flex;
        gap: .5em;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(.75);
        opacity: 0;
        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

    }

    &:hover {
        .invoice-card__actions {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }



}
</style>
