<template>
    <div :class="blockClasses" @click="editDetails()">

        <div :class="[bemm('column'), bemm('invoice-nr')]" v-if="invoice.details.number">
            <strong>Invoice Nr.</strong>
            {{ invoiceNumber(invoice) }}
        </div>

        <div :class="[bemm('column'), bemm('date')]">
            <strong>Date</strong>
            {{ date.day_nth }} {{ date.month_name }} {{ date.year }}
        </div>

        <div :class="[bemm('column'), bemm('due')]" v-if="dueDate">
            <strong>Due date</strong>
            {{ dueDate.day_nth }} {{ dueDate.month_name }} {{ dueDate.year }}
        </div>



    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';

import { invoiceNumber, showPopup } from "@/utils";
import { Invoice } from '@/types';
import { getDateObject } from "@sil/format";
import { useRoute } from "vue-router";
import { RouteName } from "@/router";

const bemm = useBemm('show-invoice-details');
const route = useRoute();

const props = defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
});

const date = computed(() => {

    const myDate = new Date(props.invoice.details.date);

    return getDateObject(myDate);
})

const dueDate = computed(() => {



    if (!props.invoice.details.dueDate || props.invoice.details.dueDate === props.invoice.details.date) {
        return null;
    }


    const myDate = new Date(props.invoice.details.dueDate);

    return getDateObject(myDate);
})

const editDetails = () => {
    if (route.name === RouteName.EDIT) {
        showPopup({ id: 'details' })
    }
}


const blockClasses = computed(() => {
    return [bemm(), bemm('', route.name as string || '')]
})

</script>

<style lang="scss">
.show-invoice-details {
    display: flex;
    justify-content: flex-start;
    gap: 2em;

    &--edit {
        &:hover {
            outline: 1px dotted var(--primary);
            outline-offset: 1em;
        }
    }

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
}
</style>