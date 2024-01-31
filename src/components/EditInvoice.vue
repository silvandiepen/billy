<template>
    <div :class="bemm()">
        <DetailsEdit label="Details" v-model="invoice.details" />
        <EntityEdit label="Sender" v-model="invoice.sender" />
        <EntityEdit label="Receiver" v-model="invoice.receiver" />
        <ItemEdit label="Items" v-model="invoice.items" />
        <NoteEdit label="Notes" v-model="invoice.notes" />
    </div>
</template>
<script lang="ts" setup>



import DetailsEdit from '@/components/Details/Edit.vue';
import EntityEdit from '@/components/Entity/Edit.vue';
import ItemEdit from '@/components/Item/Edit.vue';
import NoteEdit from '@/components/Note/Edit.vue';

import { useInvoice } from '@/composables';
import { useBemm } from 'bemm';
const bemm = useBemm('edit-invoice');

const { invoice } = useInvoice();
</script>