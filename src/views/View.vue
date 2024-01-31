<template>
    <Preview v-if="invoiceData" :invoice="invoiceData"></Preview>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import CryptoJS from 'crypto-js';

import Preview from "@/components/Preview.vue";

import { useRoute } from "vue-router";
import { Invoice } from "@/types";


const route = useRoute();


const invoiceData = ref<Invoice | null>(null);

const decode = (data: string, key: string) => {
    const bytes = CryptoJS.AES.decrypt(data, key);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(originalData);
}

onMounted(() => {
    if (route.params.data) {
        invoiceData.value = decode(route.params.data as string, 'your-secret-key');

    }
})





</script>