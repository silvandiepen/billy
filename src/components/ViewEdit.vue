<template>
    <div :class="bemm()">
        <Button :icon="Icons.EDIT" @click="showPopup({ id: currentId })"></Button>
        <div :class="bemm('view')">
            <slot name="view"></slot>
        </div>
        <!-- <div :class="bemm('edit')" v-if="mode == 'edit'"> -->
        <PopUp :id="currentId">
            <div :class="bemm('form')">
                <slot name="edit"></slot>
            </div>

        </PopUp>
        <!-- </div> -->
    </div>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';
import { ref } from 'vue';
import { useId } from '@sil/id';

import { Icons } from "@/types"
import { showPopup } from '@/utils';

import Button from "@/components/Button.vue";
import PopUp from '@/components/PopUp.vue';

const id = useId();
const currentId = ref(id());

const bemm = useBemm('view-edit');


</script>

<style lang="scss">
.view-edit {
    border: 1px solid var(--secondary);
    padding: .5em;
    border-radius: var(--border-radius);

    position: relative;
    // z-index: 1;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        display: block;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--secondary);
        opacity: .125;
        z-index: -1;
        border-radius: inherit;
    }

    .button {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    }

    &__view {
        font-size: 0.66em;
    }

    &__form {
        padding: var(--space);
    }
}
</style>