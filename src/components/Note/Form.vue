<template>
    
    <InputText label="Title" v-model="theModel.title" :class="bemm('title')" placeholder="Title" />
    <InputTextArea label="Content" v-model="theModel.content" :class="bemm('content')" placeholder="Content" />
</template>


<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed } from "vue";
import { InputText, InputTextArea } from "@/components/form";
import { Note } from '@/types';




const bemm = useBemm('item-form');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Note>,
        required: true
    }
});

const theModel = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value)
    }
})


</script>
