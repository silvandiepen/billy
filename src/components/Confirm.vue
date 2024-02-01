<template>
    <div :class="bemm()">

        <PopUp :id="currentId">
            <h4>{{ title }}</h4>
            <p> {{ message }}</p>
        </PopUp>
    </div>
</template>


<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { useBemm } from 'bemm';
import { useId } from '@sil/id';
const newId = useId();


const currentId = ref(newId());

import PopUp from './PopUp.vue';
const bemm = useBemm('confirm');

defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    confirmAction: {
        type: Function as PropType<() => {}>,
        default: () => { }
    },
    denyAction: {
        type: Function as PropType<() => {}>,
        default: () => { }
    }
})  
</script>