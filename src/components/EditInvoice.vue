<template>
    <div :class="bemm()">
        <ul :class="bemm('list')">
            <li :class="[bemm('item'), bemm('item', folded.details ? 'folded' : 'open')]">
                <EditHeader label="Details" v-model="folded.details"></EditHeader>
                <DetailsEdit v-show="!folded.details" label="Details" v-model="invoice.details" />
            </li>

            <li :class="[bemm('item'), bemm('item', folded.sender ? 'folded' : 'open')]">
                <EditHeader label="From" v-model="folded.sender"></EditHeader>
                <EntityEdit v-show="!folded.sender" label="Sender" v-model="invoice.sender" />
            </li>

            <li :class="[bemm('item'), bemm('item', folded.receiver ? 'folded' : 'open')]">
                <EditHeader label="To" v-model="folded.receiver"></EditHeader>
                <EntityEdit v-show="!folded.receiver" label="Receiver" v-model="invoice.receiver" />
            </li>

            <li :class="[bemm('item'), bemm('item', folded.items ? 'folded' : 'open')]">
                <EditHeader label="Items" v-model="folded.items"></EditHeader>
                <ItemEdit v-show="!folded.items" label="Items" v-model="invoice.items" />
            </li>

            <li :class="[bemm('item'), bemm('item', folded.notes ? 'folded' : 'open')]">
                <EditHeader label="Notes" v-model="folded.notes"></EditHeader>
                <NoteEdit v-show="!folded.notes" label="Notes" v-model="invoice.notes" />
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>



import { useBemm } from 'bemm';
import { ref } from "vue";


import DetailsEdit from '@/components/Details/Edit.vue';
import EntityEdit from '@/components/Entity/Edit.vue';
import ItemEdit from '@/components/Item/Edit.vue';
import NoteEdit from '@/components/Note/Edit.vue'
import EditHeader from '@/components/EditHeader.vue';

import { useInvoice } from '@/composables';

const { bemm } = useBemm('edit-invoice');
const { invoice } = useInvoice();

const folded = ref({
    details: false,
    sender: false,
    receiver: false,
    items: false,
    notes: false
});



</script>

<style lang="scss">
.edit-invoice {

    &__item {
        &+& {
            border-top: 1px solid rgba(255, 255, 255, .25);

        }

        &--open {

            &+.edit-invoice__item {
                border-top: none
            }
        }
    }
}
</style>