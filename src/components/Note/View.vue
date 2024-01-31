<template>
    <strong :class="bemm('note-title')">{{ note.title }}</strong>
    <p :class="bemm('note-content')" v-html="enrichContent(note.content, invoice)"></p>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useBemm } from 'bemm';

import { Note } from "@/types"
import { enrichContent } from '@/utils';
import { useInvoice } from '@/composables';

const bemm = useBemm('note-view');

const { invoice } = useInvoice();


defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true
    }
})
</script>