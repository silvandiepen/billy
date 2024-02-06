<template>
    <nav :class="bemm()">

        <div :class="bemm('container')">

            <ButtonGroup type="stack" v-if="name == 'archive'">
                <Button :icon="Icons.DOCUMENT_ADD" @click="createNewInvoice()"></Button>
            </ButtonGroup>

            <ButtonGroup type="stack" v-if="name == 'view'">
                <Button :icon="Icons.ARROW_LEFT" @click="goToEdit()"></Button>
            </ButtonGroup>

            <ButtonGroup type="stack" v-if="name == 'edit'">
                <Button :icon="Icons.ARROW_LEFT" @click="goToArchive()"></Button>
                <Button :icon="Icons.VISIBLE" v-if="!isBlank" @click="viewInvoice()"></Button>
                <Button :icon="Icons.FLOPPY_DISK" v-if="!isBlank && !isArchived" @click="saveToArchive()"></Button>
                <Button :icon="Icons.FLOPPY_DISK" v-if="!isBlank && isArchived && hasUpdate"
                    @click="saveToArchive()"></Button>
            </ButtonGroup>
        </div>


    </nav>
</template>

<script lang="ts" setup>

import { computed } from "vue";
import { useBemm } from 'bemm';
import { useRouter, useRoute } from 'vue-router';

import { Icons } from "@/types";
import { useInvoice, useArchive } from '@/composables';
import { encodeInvoice } from "@/utils";

import Button from "@/components/Button.vue";
import ButtonGroup from '@/components/ButtonGroup.vue';

const { bemm } = useBemm('navigation');
const { push } = useRouter();
const { name } = useRoute();
const { invoice, setId, isBlank, newInvoice } = useInvoice();
const { addInvoice, invoiceExists, invoiceHasUpdate } = useArchive();

const goToArchive = () => push({ name: 'archive' });
const goToEdit = () => push({ name: 'edit' });

const createNewInvoice = () => {
    newInvoice();
    push('/edit');
}


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

    const data = encodeInvoice(invoice.value, 'secret-key');

    push({
        name: 'view',
        params: {
            data: data
        }
    })
}

</script>

<style lang="scss">
.navigation {
    position: fixed;
    bottom: 0;
    left: 50%;
    padding: var(--space);
    background-color: var(--dark);
    border-radius: 4em;
    margin: var(--space);

    &__container {

        gap: var(--space);
        display: flex;
    }

}
</style>