<template>
    <div :class="bemm()">
        <div :class="bemm('column')">

            <InputText label="Title" v-model="theModel.title" :class="bemm('title')" placeholder="Title" />
            <InputTextArea label="Content" v-model="theModel.content" :class="bemm('content')" placeholder="Content" />
        </div>


        <div :class="bemm('column')">
            <fieldset :class="bemm('preview')">
                <legend :class="bemm('legend')">preview</legend>
                <div :class="bemm('content')" v-html="enrichContent(theModel.content, invoice)"></div>
            </fieldset>


            <fieldset :class="bemm('help')">

                <legend :class="bemm('legend')">help</legend>
                <div :class="bemm('content')">
                    <dl>
                        <dt>[phone]</dt>
                        <dd>{{ enrichContent('[phone]', invoice) }}</dd>
                    </dl>
                    <dl>
                        <dt>[email]</dt>
                        <dd>{{ enrichContent('[email]', invoice) }}</dd>
                    </dl>
                    <dl>
                        <dt>[amount]</dt>
                        <dd>{{ enrichContent('[amount]', invoice) }}</dd>
                    </dl>
                    <dl>
                        <dt>[beneficiary]</dt>
                        <dd>{{ enrichContent('[beneficiary]', invoice) }}</dd>
                    </dl>
                    <dl>
                        <dt>[iban]</dt>
                        <dd>{{ enrichContent('[iban]', invoice) }}</dd>
                    </dl>
                    <dl>
                        <dt>[bic]</dt>
                        <dd>{{ enrichContent('[bic]', invoice) }}</dd>
                    </dl>
                    <dl>
                        <dt>[invoiceNumber]</dt>
                        <dd>{{ enrichContent('[invoiceNumber]', invoice) }}</dd>
                    </dl>
                </div>


            </fieldset>

        </div>
    </div>
</template>


<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed } from "vue";
import { InputText, InputTextArea } from "@/components/form";
import { Note } from '@/types';
import { enrichContent } from "@/utils";

import { useInvoice } from "@/composables";
const { invoice } = useInvoice();



const bemm = useBemm('note-form');

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Note>,
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
.note-form {

    display: flex;
    gap: var(--space);

    &__column {
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: var(--space);
    }

    &__preview {
        border: 1px solid #ccc;
        padding: var(--space);
        border-radius: var(--border-radius);

        .note-form__content {
            font-size: .75em;
        }
    }

    &__legend {
        padding: 0 var(--space-s);
    }

    &__help {
        border-radius: var(--border-radius);
        background-color: #f7f7f7;
        border: 1px solid #ccc;
        padding: var(--space);

        .note-form__content {
            font-size: .75em;
        }

        dl {
            display: flex;
            margin: 0;
            flex-direction: row;
            gap: var(--space);
        }
    }
}
</style>