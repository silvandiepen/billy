<template>
    <div :class="bemm()">
        <header :class="bemm('heading')">
            <h3>{{ label }}</h3>
        </header>
        <div :class="bemm('item')" v-for="(_, index) in theModel">

            <ViewEdit>
                <template v-slot:edit>
                    <NoteForm v-model="theModel[index]" />
                </template>
                <template v-slot:view>
                    <NoteView :note="theModel[index]" :invoice="invoice" />
                </template>
            </ViewEdit>

        </div>

        <Button size="small" :icon="Icons.PLUS" @click="addNote">Add item</Button>
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

const { invoice } = useInvoice();

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
    theModel.value.push({
        ...BlankNote,
        id: createId()
    })
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
    }

    &__item {
        &+& {
            margin-top: 1em;
        }
    }
}
</style>