<template>
    <div :class="bemm()">
        <Card>

            <Button :icon="Icons.EDIT" @click="showPopup({ id: currentId })"></Button>
            <div :class="bemm('view')">
                <slot name="view"></slot>
            </div>
        </Card>

        <!-- <div :class="bemm('edit')" v-if="mode == 'edit'"> -->

        <!-- </div> -->
    </div>
    <PopUp :id="currentId">
        <div :class="bemm('form')">
            <slot name="edit"></slot>
        </div>

    </PopUp>
</template>

<script lang="ts" setup>

import { useBemm } from 'bemm';
import { ref } from 'vue';
import { useId } from '@sil/id';

import { Icons } from "@/types"
import { showPopup } from '@/utils';

import Button from "@/components/Button.vue";
import PopUp from '@/components/PopUp.vue';
import Card from '@/components/Card.vue';

const id = useId();
const currentId = ref(id());

const bemm = useBemm('view-edit');


</script>

<style lang="scss">
.view-edit {



    .button {
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(0) translate(50%, -50%);
        transition: transform 0.2s ease-in-out;

        &:hover {
            transform: scale(1) translate(50%, -50%);
        }
    }

    &:hover {
        .button {
            transform: scale(1) translate(50%, -50%);
        }
    }

    &__view {
        font-size: 0.66em;
    }

    &__form {
        padding: var(--space);
    }
}
</style>