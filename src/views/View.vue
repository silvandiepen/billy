<template>
    <Preview v-if="invoiceData" :invoice="invoiceData"></Preview>
    <Navigation v-if="!isBlank"></Navigation>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Preview from "@/components/Preview.vue";
import Navigation from "@/components/Navigation.vue";

import { useRoute } from "vue-router";
import { Invoice } from "@/types";
import { decodeInvoice } from "@/utils";
import { useInvoice } from "@/composables";

const { isBlank } = useInvoice();

const route = useRoute();


const invoiceData = ref<Invoice | null>(null);




onMounted(() => {
    if (route.params.data) {
        invoiceData.value = decodeInvoice(route.params.data as string, 'secret-key')
    }
})





</script>