<template>
    <div :class="bemm()">
        <div>
            <pre>
        {{ invoice }}
    </pre>
        </div>
        <div>
            <EditJson v-model="invoice"></EditJson>

        </div>

    </div>
    <Navigation />
</template>

<script lang="ts" setup>
import { useBemm } from "bemm";

import EditJson from "@/components/EditJson.vue";
import { useInvoice } from "@/composables";
import Navigation from "@/components/Navigation.vue";

const bemm = useBemm('edit-invoice-data');
const { invoice } = useInvoice();


</script>

<style lang="scss">
.edit-invoice-data{
    display: flex;
    width: 100%;
    padding: var(--spacing);
}
</style>