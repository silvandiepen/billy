<template>
    <InputText label="name" v-model="theModel.name" :class="bemm('name')" placeholder="Name" />
    <InputText label="company name" v-model="theModel.companyName" :class="bemm('companyName')"
        placeholder="Company Name" />
    <InputText label="address" v-model="theModel.address" :class="bemm('address')" placeholder="Address" />
    <InputText label="city" v-model="theModel.city" :class="bemm('city')" placeholder="City" />
    <InputText label="state" v-model="theModel.state" :class="bemm('state')" placeholder="State" />
    <InputText label="zip" v-model="theModel.zip" :class="bemm('zip')" placeholder="Zip" />
    <InputText label="country" v-model="theModel.country" :class="bemm('country')" placeholder="Country" />
    <InputText label="phone" v-model="theModel.phone" :class="bemm('phone')" placeholder="Phone" />
    <InputText label="email" v-model="theModel.email" :class="bemm('email')" placeholder="Email" />
    <InputText label="website" v-model="theModel.website" :class="bemm('website')" placeholder="Website" />
    <InputText label="taxId" v-model="theModel.taxId" :class="bemm('tax-id')" placeholder="Tax ID" />
    <InputText label="Iban" v-model="theModel.iban" :class="bemm('iban')" placeholder="Iban" />
    <InputText label="BIC" v-model="theModel.bic" :class="bemm('bic')" placeholder="BIC" />
    <InputText label="Beneficiary" v-model="theModel.beneficiary" :class="bemm('beneficiary')" placeholder="Tax ID" />
</template>

<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed } from "vue";
import { InputText } from "@/components/form";
import { Entity } from '@/types';


const bemm = useBemm('entity-form');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Entity>,
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
