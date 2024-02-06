<template>
    <div :class="blockClasses">
        <Card>

            <div :class="bemm('actions')">
                <Button :icon="Icons.EDIT" @click="showPopup({ id: popupId || id() })"></Button>
                <Button v-if="deleteAction" :icon="Icons.CLOSE" @click="deleteAction()"></Button>
                <Button v-if="activeAction" :icon="active ? Icons.VISIBLE : Icons.INVISIBLE" @click="activeAction()"></Button>
            </div>

            <div :class="bemm('view')">
                <slot name="view"></slot>
            </div>
        </Card>

        <!-- <div :class="bemm('edit')" v-if="mode == 'edit'"> -->

        <!-- </div> -->
    </div>
    <PopUp :id="popupId || id()">
        <div :class="bemm('form')">
            <slot name="edit"></slot>
        </div>

    </PopUp>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { useBemm } from 'bemm';
import { useId } from '@sil/id';

import { Icons } from "@/types"
import { showPopup } from '@/utils';

import Button from "@/components/Button.vue";
import PopUp from '@/components/PopUp.vue';
import Card from '@/components/Card.vue';

const id = useId();

const props = defineProps({
    popupId: {
        type: String as PropType<string>,
    },
    deleteAction: {
        type: Function as PropType<() => void>,
        default: null
    },
    activeAction: {
        type: Function as PropType<() => void>,
        default: null
    }, 
    active: {
        type: Boolean, 
        default: true
    }
})


const bemm = useBemm('view-edit');

const blockClasses = computed(()=>{
    return [bemm(), bemm('',props.active ? 'active' : 'inactive')]
})


</script>

<style lang="scss">
.view-edit {


    &__actions {
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(0) translate(50%, -50%);
        transition: transform 0.2s ease-in-out;

    }

    &:hover {
        .view-edit__actions {
            transform: scale(1) translate(50%, -50%);
        }
    }

    &--inactive{
        .view-edit__view{
            opacity: .5;
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