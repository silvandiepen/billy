<template>
    <div :class="bemm()">
        <DetailsEdit label="Details" v-model="invoice.details" />
        <EntityEdit label="Sender" v-model="invoice.sender" />
        <EntityEdit label="Receiver" v-model="invoice.receiver" />
        <ItemEdit label="Items" v-model="invoice.items" />
        <NoteEdit label="Notes" v-model="invoice.notes" />

        <Button @click="viewInvoice()">View</Button>
    </div>
</template>
<script lang="ts" setup>

import CryptoJS from 'crypto-js';


import DetailsEdit from '@/components/Details/Edit.vue';
import EntityEdit from '@/components/Entity/Edit.vue';
import ItemEdit from '@/components/Item/Edit.vue';
import NoteEdit from '@/components/Note/Edit.vue';

import Button from "@/components/Button.vue";
import { useInvoice } from '@/composables';
import { useBemm } from 'bemm';
const bemm = useBemm('edit-invoice');

const { invoice } = useInvoice();

import { useRouter } from 'vue-router';

const router = useRouter();

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