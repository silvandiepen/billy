<template>
    <div :class="bemm()">
        <div :class="bemm('column')">

            <Form>

                <InputText label="Title" v-model="theModel.title" :class="bemm('title')" placeholder="Title" />
                <InputTextArea label="Content" v-model="theModel.content" :class="bemm('content')" placeholder="Content" />
            </Form>
        </div>


        <div :class="bemm('column')">
            <fieldset :class="bemm('preview')">
                <legend :class="bemm('legend')">preview</legend>
                <div :class="bemm('content')" v-html="enrichContent(theModel.content, invoice)"></div>
            </fieldset>


            <Card :class="bemm('help')">

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


            </Card>

        </div>
    </div>
</template>


<script lang="ts" setup>
import { useBemm } from "bemm";

import { PropType, computed } from "vue";
import { InputText, InputTextArea, Form } from "@/components/form";
import Card from "@/components/Card.vue";
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
    gap: var(--space-xl);

    &__column {
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: var(--space);
    }

    &__preview {
        border: none;
        background-color: var(--light);
        color: var(--dark);
        padding: var(--space);
        border-radius: var(--border-radius);

        legend {
            background-color: var(--dark);
            border: 1px solid var(--light);
            font-size: .75em;
            padding: .5em .75em;
            color: var(--light);
            border-radius: var(--border-radius);
        }
    }


    &__help {
        border: none;
        background-color: var(--dark);
        color: var(--dark);
        border: 1px solid var(--light);
        color: var(--light);
        padding: var(--space);
        border-radius: var(--border-radius);
font-size: .875em;

        dl {
            margin: 0;

            &+dl {
                margin-top: .5em;
            }
        }

        legend {
            background-color: var(--dark);
            border: 1px solid var(--light);
            font-size: .75em;
            padding: .5em .75em;
            color: var(--light);
            border-radius: var(--border-radius);

        }
    }
}</style>