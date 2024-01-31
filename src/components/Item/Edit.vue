<template>
    <div :class="bemm()">
        <header :class="bemm('heading')">
            <h3>{{ label }}</h3>
        </header>
        <div :class="bemm('item')" v-for="(_, index) in theModel">

            <ViewEdit>
                <template v-slot:edit>
                    <ItemForm v-model="theModel[index]" />
                </template>
                <template v-slot:view>
                    <ItemView :item="theModel[index]" :invoice="invoice" />
                </template>
            </ViewEdit>

        </div>

        <Button size="small" :icon="Icons.PLUS" @click="addItem">Add item</Button>
    </div>
</template>
<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';
import { createId } from "@sil/id";

// @ts-ignore
// import { Icon } from "open-icon";
import { BlankItem, InvoiceItem, Icons } from "@/types";

import Button from "@/components/Button.vue";
import ViewEdit from "@/components/ViewEdit.vue";
import ItemView from "@/components/Item/View.vue";
import ItemForm from "@/components/Item/Form.vue";

import { useInvoice } from "@/composables";
const { invoice } = useInvoice();

const bemm = useBemm('item-edit');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<InvoiceItem[]>,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});


const addItem = () => {
    theModel.value.push({
        ...BlankItem,
        id: createId()
    })
}

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
.item-edit {

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__item{
        &+&{
            margin-top: 1em;
        }
    }

}
</style>