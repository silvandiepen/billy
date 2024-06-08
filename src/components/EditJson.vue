<template>
    <div :class="bemm()">
        <InputCode v-model="insertObjectComputed" />
    </div>
</template>

<script lang="ts" setup>

import { computed, ref, watch } from "vue";
import { useBemm } from 'bemm';
import InputCode from "./form/InputCode.vue";

const bemm = useBemm('edit-json');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object,
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

const insertObject = ref(theModel.value);
const insertObjectComputed = computed({
    get() {
        return JSON.stringify(insertObject.value, null, 2)
    }, set(value) {
        insertObject.value = JSON.parse(value)
    }
});


watch(() => insertObject.value, () => {
    try {
        Object.keys(props.modelValue).forEach(field => {
            if(field == 'id') return;
            theModel.value[field] = insertObject.value[field];
        });
    } catch (error) {
        console.error(error);
    }
});



</script>

<style lang="scss">

.edit-json{
//     textarea{
//         padding: var(--space);
//         background-color: rgba(var(--primary-rgb),.25);
//         color: var(--primary-text);
//         border: none;
// width: 100%; height: 100%;
//     }
}
</style>