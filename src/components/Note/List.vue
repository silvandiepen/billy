<template>
    <div :class="blockClasses">
        <ul :class="[bemm('list'), bemm('list', numberToWords(invoice.notes.length))]">
            <li :class="bemm('item')" v-for="note in invoiceNotes" @click="editItem(note.id)">
                <div :class="bemm('note')">
                    <NoteView :note="note" :invoice="invoice" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';

import { Invoice } from '@/types';
import { numberToWords, showPopup } from "@/utils";

import NoteView from '@/components/Note/View.vue';
import { useRoute } from "vue-router";
import { RouteName } from "@/router";

const bemm = useBemm('note-view');

const route = useRoute();

const props = defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
});
const blockClasses = computed(() => {
    return [bemm(), bemm('', route.name as string || '')]
})

const editItem = (id: string) => {
    if (route.name === RouteName.EDIT) {
        showPopup({ id })
    }
}


const invoiceNotes = computed(() => {
    return props.invoice.notes.filter((note) => note.active);
})




</script>

<style lang="scss">
.note-view {


    &--edit {
        .note-view__item {
            &:hover {
                outline: 1px dotted var(--primary);
                outline-offset: 1em;
            }

        }
    }


    &__list {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
        gap: 2em;
        justify-content: space-evenly;

        &--one .show-invoice-notes__item {
            width: 100%;
        }

        &--two .show-invoice-notes__item {
            width: 50%;
        }

        &--three .show-invoice-notes__item {
            width: 33.3333%;
        }

        &--four .show-invoice-notes__item {
            width: 25%;
        }

        &--five .show-invoice-notes__item {
            width: 20%;
        }

    }


    .note-view {

        &__note-title {
            font-weight: bold;
            color: var(--primary);
            // padding: .5em .75em; 
            // border-radius: var(--border-radius);
            // border: 2px solid var(--primary);
        }

        &__note-content {

            font-size: .75em;
            line-height: 1.75em;
            opacity: .5;
        }
    }

}
</style>