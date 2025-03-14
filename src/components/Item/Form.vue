<template>
    <Form :class="bemm()">

        <InputText label="Title" v-model="theModel.title" :class="bemm('title')" placeholder="Title" />
        <InputTextArea label="Description" v-model="theModel.description" :class="bemm('description')"
            placeholder="Description" />
        <InputText label="SKU" v-model="theModel.sku" :class="bemm('sku')" placeholder="SKU" />
        <InputNumber label="Quantity" type="number" v-model="theModel.quantity" :class="bemm('quantity')"
            placeholder="Quantity" />
        <InputNumber label="Price" v-model="theModel.price" :class="bemm('price')" placeholder="Price" />
        <InputText label="Unit" v-model="theModel.unit" :class="bemm('unit')" placeholder="Unit" />
        <InputNumber label="Discount" v-model="theModel.discount" :class="bemm('discount')" placeholder="Discount" />
        <InputNumber label="Tax rate" v-model="theModel.taxRate" :class="bemm('tax-rate')"
            placeholder="Custom Tax Rate" />


        <div :class="bemm('days')">
            <h5>Select{{ tempDays.length ? 'ed' :'' }} days {{ tempDays.length ? ` (${tempDays.length})`: ''}}</h5>

            <ul :class="bemm('days-list')" v-if="tempDays.length">
                <li :class="bemm('days-item')" v-for="day in tempDays" @click="removeDay(day)">
                    {{ formatDate({ dateString: day.toDateString(), displayFormat: 'long'}) }}
                </li>
            </ul>

            <InputDateObject v-model="tempStart" @change="setEnd"></InputDateObject>
            <InputDateObject v-model="tempEnd"></InputDateObject>
            <Button :disabled="!addRangeActive" @click="addRange()">Add</Button>

        </div>



        <EditJson v-model="theModel" />

    </Form>
</template>


<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed, ref } from "vue";
import InputDateObject from "@/components/form/InputDateObject.vue";
import InputText from "@/components/form/InputText.vue";
import InputNumber from "@/components/form/InputNumber.vue";
import InputTextArea from "@/components/form/InputTextArea.vue";
import Form from "@/components/form/Form.vue";
import { InvoiceItem } from '@/types';
import EditJson from "@/components/EditJson.vue";
import Button from "@/components/Button/Button.vue";

import { formatDate } from "../form/Form.utils";


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



// Days



const tempStart = ref<Date>();
const tempEnd = ref<Date>();

const tempDays = ref<Date[]>(theModel.value.days || []);

const fixDates = ()=>{
    // Order the dates and remove doubles
    tempDays.value = tempDays.value
    .sort((a: Date, b: Date) => a.getTime() - b.getTime())
    .filter((date, index, self) =>
      index === self.findIndex((d) => d.getTime() === date.getTime())
    );
}

const updateDates = () => {
    theModel.value.days = tempDays.value;
    theModel.value.quantity = tempDays.value?.length;
}


const addRangeActive = computed(() => {
    return tempStart.value;
})

const setEnd = () => {
    if (!tempStart.value || (tempEnd.value && tempEnd.value > tempStart.value)) return;
    tempEnd.value = tempStart.value;
}

const addRange = () => {
    if (!tempStart.value) return;

    const toDate = (date: Date | string) => (date instanceof Date ? date : new Date(date));

    const start = toDate(tempStart.value);
    const end = tempEnd.value ? toDate(tempEnd.value) : null;

// console.log(start,end)

    if (end && end !== start) {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            console.log(`adding ${d}`);
            tempDays.value.push(new Date(d));
        }
    } else {
        console.log(`adding ${start}`);

       tempDays.value.push(new Date(start));
    }

    console.log('add range', tempStart.value, tempEnd.value);
    tempStart.value = undefined;
    tempEnd.value = undefined;
    fixDates();
    updateDates()
};

const removeDay = (day: Date) => {
    tempDays.value = tempDays.value.filter((d) => d !== day);
    fixDates();
    updateDates()
};

</script>


<style lang="scss">

.item-form{
    &__days-list{
        gap: 3px;
 display: flex; flex-direction: column;
    }
    &__days-item{

        padding: 1em; background-color: var(--accent);
        border-radius: var(--border-radius);
        font-size: .75em;
    }
}
</style>
