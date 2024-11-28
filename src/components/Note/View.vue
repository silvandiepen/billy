<template>
    <strong :class="bemm('note-title')">{{ note.title }}</strong>
    <div  :class="bemm('note-content')" v-html="renderedNote"></div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useBemm } from 'bemm';
import { Marked } from "@ts-stack/markdown";

import { Note, Invoice } from "@/types"
import { enrichContent } from '@/utils';

const bemm = useBemm('note-view');


const props = defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
    note: {
        type: Object as PropType<Note>,
        required: true
    }
})
const renderedNote = computed(()=>{
    return Marked.parse(enrichContent(props.note.content, props.invoice))
});



</script>
