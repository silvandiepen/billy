<template>
    <div :class="blockClasses" @click="editItem()">
        <h4 :class="bemm('label')" v-if="label">{{ label }}</h4>
        <fieldset :class="bemm('field')">

            <span v-if="entity.companyName" :class="bemm('', 'companyName')">{{ entity.companyName }}</span>
            <span v-if="entity.name" :class="bemm('', 'name')">{{ entity.name }}</span>
            <span v-if="entity.address" :class="bemm('', 'address')">{{ entity.address }}</span>
            <span v-if="entity.zip" :class="bemm('', 'zip')">{{ entity.zip }}</span>
            <span v-if="entity.city" :class="bemm('', 'city')">{{ entity.city }}</span>
            <span v-if="entity.state" :class="bemm('', 'state')">{{ entity.state }}</span>
            <span v-if="entity.country" :class="bemm('', 'country')">{{ entity.country }}</span>
        </fieldset>
        <fieldset :class="bemm('field')" v-if="entity.phone || entity.email || entity.website">
            <span v-if="entity.phone" :class="bemm('', 'phone')">{{ entity.phone }}</span>
            <span v-if="entity.email" :class="bemm('', 'email')">{{ entity.email }}</span>
            <span v-if="entity.website" :class="bemm('', 'website')">{{ entity.website }}</span>

        </fieldset>
        <fieldset :class="bemm('field')" v-if="entity.taxId">
            <span v-if="entity.taxId" :class="bemm('', 'taxId')">{{ entity.taxId }}</span>
        </fieldset>

    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useBemm } from 'bemm';

import { Entity } from '@/types';
import { useRoute } from "vue-router";
import { RouteName } from "@/router";
import { showPopup } from "@/utils";

const bemm = useBemm('show-invoice-entity');
const route = useRoute();

const props = defineProps({
    entity: {
        type: Object as PropType<Entity>,
        required: true
    },
    label: {
        type: String, default: ""
    }
});


const blockClasses = computed(() => {
    return [bemm(), bemm('', route.name as string || '')]
})

const editItem = () => {

    if (route.name === RouteName.EDIT) {


        showPopup({ id: props.entity.id })

    }
}

</script>

<style lang="scss">
.show-invoice-entity {

    position: relative;

    &--edit {
        &:hover {
            outline: 1px dotted var(--primary);
            outline-offset: 1em;
        }
    }

    &--name,
    &--company-name {
        font-weight: bold;

        &~.show-invoice-entity--name {
            font-weight: normal;
        }
    }

    &__field {
        padding: 0;
        border: none;
        display: block;
        display: flex;
        flex-direction: column;

        &+& {
            margin-top: 1em;
        }
    }

    &__label {
        color: var(--primary);
        // position: absolute;
        // bottom: 100%;
        // left: 0;
        margin: 0;
        // line-height: 1;
        // transform: rotate(90deg);
        // transform-origin: 0 100%;
        // font-size: 2em;
        // opacity: .5;
    }
}
</style>