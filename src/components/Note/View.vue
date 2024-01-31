<template>
    <strong :class="bemm('note-title')">{{ note.title }}</strong>
    <p :class="bemm('note-content')" v-html="enrichContent(note.content, invoice)"></p>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useBemm } from 'bemm';

import { Note, Invoice } from "@/types"
import { enrichContent } from '@/utils';

const bemm = useBemm('note-view');



defineProps({
    invoice: {
        type: Object as PropType<Invoice>,
        required: true
    },
    note: {
        type: Object as PropType<Note>,
        required: true
    }
})
</script>