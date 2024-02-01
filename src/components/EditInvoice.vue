<template>
    <div :class="bemm()">

        <span> id: {{ invoice.id }}</span>
        <DetailsEdit label="Details" v-model="invoice.details" />
        <EntityEdit label="Sender" v-model="invoice.sender" />
        <EntityEdit label="Receiver" v-model="invoice.receiver" />
        <ItemEdit label="Items" v-model="invoice.items" />
        <NoteEdit label="Notes" v-model="invoice.notes" />

        <Button @click="viewInvoice()">View</Button>

        {{ isArchived ? 'is archive' : 'not in archive' }}
        {{ hasUpdate ? 'has update' : 'no update' }}

        <Button v-if="!isArchived" @click="saveToArchive()">Save</Button>
        <Button v-if="isArchived && hasUpdate" @click="saveToArchive()">Update</Button>

        {{ invoices.length }}


    </div>
</template>
<script lang="ts" setup>


import { computed } from "vue";

import CryptoJS from 'crypto-js';


import DetailsEdit from '@/components/Details/Edit.vue';
import EntityEdit from '@/components/Entity/Edit.vue';
import ItemEdit from '@/components/Item/Edit.vue';
import NoteEdit from '@/components/Note/Edit.vue';

import Button from "@/components/Button.vue";
import { useInvoice, useArchive } from '@/composables';
import { useBemm } from 'bemm';
const bemm = useBemm('edit-invoice');

const { invoice, setId } = useInvoice();
const { addInvoice, invoiceExists, invoiceHasUpdate, invoices } = useArchive();

import { useRouter } from 'vue-router';

const router = useRouter();


const saveToArchive = () => {
    const newInvoice = addInvoice(invoice.value);
    setId(newInvoice.id);
}

const isArchived = computed(() => {
    return invoiceExists(invoice.value);
})

const hasUpdate = computed(() => {
    return invoiceHasUpdate(invoice.value);
})

const viewInvoice = () => {

    const invoiceData = JSON.stringify(invoice.value);
    // const hash = CryptoJS.SHA256(invoiceData).toString(CryptoJS.enc.Hex);

    const secretKey = 'your-secret-key';
    const data = CryptoJS.AES.encrypt(invoiceData, secretKey).toString();




    console.log(data);
    router.push({
        name: 'view',
        params: {
            data: data
        }
    })



}

</script>