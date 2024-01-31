<template>
    <div :class="bemm()">
        <ul :class="[bemm('list'), bemm('list', numberToWords(invoice.notes.length))]">
            <li :class="bemm('item')" v-for="note in invoice.notes">
                <div :class="bemm('note')">
                    <NoteView :note="note" :invoice="invoice" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useBemm } from 'bemm';

import { Invoice } from '@/types';
import { numberToWords } from "@/utils";

import NoteView from '@/components/Note/View.vue';

const bemm = useBemm('note-view');


defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
});



</script>

<style lang="scss">
.note-view {



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