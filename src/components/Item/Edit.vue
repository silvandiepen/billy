<template>
    <div :class="bemm()">

        <div :class="bemm('item')" v-for="(_, index) in theModel">

            <ViewEdit :active="theModel[index].active" :popupId="theModel[index].id" :activeAction="()=>toggleItem(theModel[index].id)"  :deleteAction="()=>removeItem(theModel[index].id)">
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
import { showPopup } from "@/utils";

const { invoice, removeItem, toggleItem } = useInvoice();

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
    const id = createId();
    theModel.value.push({
        ...BlankItem,
        id
    })
    setTimeout(() => {
        showPopup({ id })
    }, 0)
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

        padding: 1em 0;
    }

    &__arrow {
        width: 1em;
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 1em;
            height: 1em;
        }
    }

    &__item {
        margin-bottom: 1em;
    }

}
</style>