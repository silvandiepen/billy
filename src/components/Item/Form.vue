<template>
    <Form>

        <InputText label="Title" v-model="theModel.title" :class="bemm('title')" placeholder="Title" />
        <InputTextArea label="Description" v-model="theModel.description" :class="bemm('description')"
            placeholder="Description" />
        <InputText label="SKU" v-model="theModel.sku" :class="bemm('sku')" placeholder="SKU" />
        <InputNumber label="Quantity" type="number" v-model="theModel.quantity" :class="bemm('quantity')"
            placeholder="Quantity" />
        <InputNumber label="Price" v-model="theModel.price" :class="bemm('price')" placeholder="Price" />
        <InputText label="Unit" v-model="theModel.unit" :class="bemm('unit')" placeholder="Unit" />
        <InputNumber label="Discount" v-model="theModel.discount" :class="bemm('discount')" placeholder="Discount" />
        <InputNumber label="Tax rate" v-model="theModel.taxRate" :class="bemm('tax-rate')" placeholder="Custom Tax Rate" />
    </Form>
</template>


<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed } from "vue";
import { InputText, InputNumber, InputTextArea, Form } from "@/components/form";
import { InvoiceItem } from '@/types';




const bemm = useBemm('item-form');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<InvoiceItem>,
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
