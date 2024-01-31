<template>
    <InputText label="number" v-model="theModel.number" :class="bemm('number')" placeholder="Invoice number" />
    <InputDate label="date" v-model="theModel.date" :class="bemm('date')" placeholder="Invoice date" />
    <InputDate label="Due Date" v-model="theModel.dueDate" :class="bemm('dueDate')" placeholder="Due date" />
    <InputSelect label="Currency" v-model="theModel.currency" :class="bemm('currency')" placeholder="Currency" :options="Object.values(Currency)" />
    <InputSelect label="Locale" v-model="theModel.locale" :class="bemm('locale')" placeholder="Locale" :options="Object.values(Locales)" />
    <InputText label="terms" v-model="theModel.terms" :class="bemm('terms')" placeholder="Terms" />
    <InputNumber label="tax Rate" v-model="theModel.taxRate" :class="bemm('taxRate')" placeholder="Tax Rate" />
    <InputNumber label="discount" v-model="theModel.discount" :class="bemm('discount')" placeholder="Discount" />
    <InputNumber label="shipping" v-model="theModel.shipping" :class="bemm('shippping')" placeholder="Shipping" />
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';


import { InputNumber, InputText, InputDate, InputSelect } from "@/components/form";
import { Currency, Invoice, Locales } from '@/types';


const bemm = useBemm('edit-invoice-details');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Invoice['details']>,
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