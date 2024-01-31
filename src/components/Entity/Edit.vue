<template>
    <div :class="bemm()">
        <header :class="bemm('heading')" @click="folded = !folded">
            <div :class="bemm('titles')">
                <h4 :class="bemm('label')">{{ label }}</h4>
                <h5 :class="bemm('entity-name')" v-if="folded">{{ modelValue.companyName || modelValue.name }}</h5>
            </div>
            <div :class="bemm('arrow')">
                <Icon :class="bemm('arrow')" :name="folded ? Icons.CHEVRON_DOWN : Icons.CHEVRON_UP" />
            </div>
        </header>

        <ViewEdit v-if="!folded">
            <template v-slot:edit>
                <EntityForm v-model="theModel"></EntityForm>

            </template>
            <template v-slot:view>
                <EntityView :entity="modelValue"></EntityView>
            </template>
        </ViewEdit>

        <PopUp :id="panelId">

            <div :class="bemm('load-list')">
                <EntityView :class="[bemm('load-item'), isCurrent(entity, theModel) && bemm('load-item', 'current')]"
                    v-for="entity in entities" :key="entity.id" :entity="entity" @click="setCurrentEntity(entity)">
                </EntityView>
            </div>

        </PopUp>

        <div :class="bemm('status')">

            <ButtonGroup type="stack" direction="vertical">
                <Button :icon="Icons.USER_ADD" type="ghost" size="small" v-if="!entityExists"
                    @click="saveCurrentEntity()">Save Entity</Button>
                <Button :icon="Icons.USER_ADD" type="ghost" size="small" v-if="!entitySaved && entityExists"
                    @click="updateCurrentEntity()">Update
                    Entity</Button>
                <Button :icon="Icons.USER_ADD" type="ghost" size="small" v-if="!entitySaved && entityExists"
                    @click="saveCurrentEntityAsNew()">Save
                    as new Entity</Button>
                <Button :icon="Icons.USER_TEAM" @click="loadEntities()" type="ghost" size="small">
                    Load Entity
                </Button>
            </ButtonGroup>
        </div>


    </div>
</template>
<script lang="ts" setup>
import { PropType, computed, ref } from "vue";
import { useBemm } from 'bemm';
import { Entity, Icons } from '@/types';

import EntityView from "@/components/Entity/View.vue";
import EntityForm from "@/components/Entity/Form.vue";
import ViewEdit from "@/components/ViewEdit.vue";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";

import PopUp from "@/components/PopUp.vue";

import { useEntity } from "@/composables";
import { showPopup } from "@/utils";


import { useId } from "@sil/id";

const id = useId();

const panelId = ref(id());


const {
    hasEntity,
    hasEntityId, saveAsNewEntity, updateEntity,
    entities

} = useEntity();



const bemm = useBemm('entity-edit');


const folded = ref(false);

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
    modelValue: {
        type: Object as PropType<Entity>,
        required: true
    }, label: {
        type: String,
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

const updateCurrentEntity = () => {
    updateEntity(theModel.value);
}
const saveCurrentEntity = () => {

    const entity = saveAsNewEntity(theModel.value);

    theModel.value = entity;
}

const saveCurrentEntityAsNew = () => {
    const entity = saveAsNewEntity(theModel.value);
    theModel.value = entity;
}

const entityExists = computed(() => {
    return hasEntityId(theModel.value.id)
})

const entitySaved = computed(() => {
    return hasEntity(theModel.value)
})

const loadEntities = () => {
    showPopup({ id: panelId.value })
}

const setCurrentEntity = (entity: Entity) => {
    theModel.value = entity;
}

const isCurrent = (entity: Entity, current: Entity) => {
    return entity.id === current.id;
}

</script>

<style lang="scss">
.entity-edit {

    &__heading {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 1em 0;
    }

    &__titles {
        * {
            margin: 0;
        }

    }

    &__entity-name {
        background-color: var(--secondary);
        color: var(--secondary-text);
        padding: var(--space-s);
        border-radius: var(--border-radius);
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


    &__load-list {
        display: flex;
        gap: var(--space);
    }

    &__load-item {
        border: 1px solid transparent;
        border-radius: var(--border-radius);
        padding: var(--space);

        &:hover {
            border: 1px solid var(--secondary);
        }

        &--current {
            background-color: var(--primary);
            color: var(--primary-text);
        }
    }

}</style>