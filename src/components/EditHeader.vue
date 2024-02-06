<template>
    <header :class="bemm('heading')" @click="value = !value">
        <div :class="bemm('titles')">
            <h4 :class="bemm('label')">{{ label }}</h4>
        </div>
        <div :class="bemm('arrow')">
            <Icon :class="bemm('arrow')" :name="value ? Icons.CHEVRON_DOWN : Icons.CHEVRON_UP" />
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';

import Icon from "@/components/Icon.vue";
import { Icons } from "@/types";
const { bemm } = useBemm('edit-header');

defineProps({
    label: {
        type: String,
        required: true
    },
    folded: {
        type: Boolean,
        default: false
    }
})

const value = defineModel()

</script>

<style lang="scss">
.edit-header {
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
    &__label{
        margin: 0; 
    }
}
</style>