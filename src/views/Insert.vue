<template>
    <div :class="bemm()">
        <div :class="bemm('json')">
            <pre>
        {{ invoice }}
    </pre>
        </div>
        <div :class="bemm('edit')">
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
.edit-invoice-data {
    display: flex;
    width: 100%;
    padding: var(--spacing);
    display: flex;
    gap: var(--space);
    height: 100vh;

    &__json,
    &__edit {
        padding: var(--spacing);
        border: 1px solid rgba(var(--foreground-rgb),.25);
        border-radius: var(--border-radius);
    }

    &__json {
        width: 50%;
        overflow: scroll;
    }

    &__edit {
        width: 50%;
        overflow: scroll;
    }
}
</style>