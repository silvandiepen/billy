<template>
    <div :class="bemm()">

        <div :class="bemm('item')" v-for="(_, index) in theModel">

            <ViewEdit :active="theModel[index].active" :popupId="theModel[index].id" :activeAction="()=>toggleNote(theModel[index].id)" :deleteAction="()=>removeNote(theModel[index].id)">
                <template v-slot:edit>
                    <NoteForm v-model="theModel[index]" />
                </template>
                <template v-slot:view>
                    <NoteView :note="theModel[index]" :invoice="invoice" />
                </template>
            </ViewEdit>
        </div>

        <Button size="small" :icon="Icons.PLUS" @click="addNote">Add Note</Button>
    </div>
</template>
<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';
import { createId } from "@sil/id";

import { BlankNote, Note, Icons } from "@/types";
import { useInvoice } from "@/composables";

import Button from "@/components/Button.vue";
import ViewEdit from "@/components/ViewEdit.vue";
import NoteView from "@/components/Note/View.vue";
import NoteForm from "@/components/Note/Form.vue";

import { showPopup } from "@/utils";

const { invoice, removeNote, toggleNote } = useInvoice();

const bemm = useBemm('note-edit');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Note[]>,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});


const addNote = () => {
    const id = createId();
    theModel.value.push({
        ...BlankNote,
        id
    })
    setTimeout(() => {
        showPopup({ id })
    }, 0)
}


const theModel = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>
<style lang="scss">
.note-edit {

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 1em 0;
    }

    &__arrow {
        width: 1em;
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 1em;
            height: 1em;
        }
    }


    &__item {
        margin-bottom: 1em;
    }
}
</style>