<template>
    <div :class="bemm()">
        <div :class="bemm('column')">
            <Form>
                <InputText label="name" v-model="theModel.name" :class="bemm('name')" placeholder="Name" />
                <InputText label="company name" v-model="theModel.companyName" :class="bemm('companyName')"
                    placeholder="Company Name" />
                <hr />
                <InputText label="address" v-model="theModel.address" :class="bemm('address')" placeholder="Address" />
                <InputText label="city" v-model="theModel.city" :class="bemm('city')" placeholder="City" />
                <InputText label="state" v-model="theModel.state" :class="bemm('state')" placeholder="State" />
                <InputText label="zip" v-model="theModel.zip" :class="bemm('zip')" placeholder="Zip" />
                <InputText label="country" v-model="theModel.country" :class="bemm('country')" placeholder="Country" />

            </Form>

        </div>
        <div :class="bemm('column')">
            <Form>
                <InputText label="phone" v-model="theModel.phone" :class="bemm('phone')" placeholder="Phone" />
                <InputText label="email" v-model="theModel.email" :class="bemm('email')" placeholder="Email" />
                <InputText label="website" v-model="theModel.website" :class="bemm('website')" placeholder="Website" />
                <hr />
                <InputText label="taxId" v-model="theModel.taxId" :class="bemm('tax-id')" placeholder="Tax ID" />
                <InputText label="Iban" v-model="theModel.iban" :class="bemm('iban')" placeholder="Iban" />
                <InputText label="BIC" v-model="theModel.bic" :class="bemm('bic')" placeholder="BIC" />
                <InputText label="Beneficiary" v-model="theModel.beneficiary" :class="bemm('beneficiary')"
                    placeholder="Tax ID" />

            </Form>

        </div>
        <div :class="bemm('column')">

            <fieldset :class="bemm('preview')">
                <legend :class="bemm('legend')">Preview</legend>
                <EntityView :entity="theModel" />
            </fieldset>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed } from "vue";
import { InputText, Form } from "@/components/form";
import { Entity } from '@/types';
import EntityView from "@/components/Entity/View.vue";


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

<style lang="scss">
.entity-form {
    hr {
        margin: var(--space-l) 0;
        border: none;
        background-color: var(--primary);
        height: 1px;
        color: var(--primary)
    }

    display: flex;
    gap: var(--space-l);

    &__column {
        display: flex;
        flex-direction: column;
        gap: var(--space);
    }
}
</style>