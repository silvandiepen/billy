<template>
    <div :class="bemm()">
        <header :class="bemm('heading')">
            <h3>{{ label }}</h3>
        </header>

        <ViewEdit>
            <template v-slot:edit>
                <DetailsForm v-model="theModel" />
            </template>
            <template v-slot:view>
                <DetailsSimpleView :invoice="invoice"></DetailsSimpleView>
            </template>
        </ViewEdit>

    </div>
</template>
<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';

import DetailsForm from "@/components/Details/Form.vue";
import DetailsSimpleView from "@/components/Details/SimpleView.vue";
import ViewEdit from "@/components/ViewEdit.vue";

import { Invoice } from '@/types';
import { useInvoice } from "@/composables";


const bemm = useBemm('edit-invoice-details');

const { invoice } = useInvoice();

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Invoice['details']>,
        required: true
    },
    label: {
        type: String,
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
<style lang="scss">
.edit-invoice-details {

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>