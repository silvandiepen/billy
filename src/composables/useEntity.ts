

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";
import { Entity } from '@/types';

const StateKey = 'billy:entity';

import { useId } from '@sil/id';

const state = reactive<{
    entity: Entity[]
}>(await retrieveState(
    {
        entity: []
    }, StateKey))

watchState(state, StateKey)

export const useEntity = () => {


    return {
        addEntity: (value: Entity) => {
            state.entity.push(value);
        },
        updateEntity: (value: Entity) => {
            state.entity = state.entity.map((entity: Entity) => {
                if (entity.id === value.id) {
                    return value;
                }
                return entity;
            })
        },
        saveAsNewEntity: (value: Entity) => {
            const id = useId();
            const newEntity = { ...value, id: id() };
            state.entity.push(newEntity);

            return newEntity;
        },
        hasEntityId: (value: string) => {
            return state.entity.some((entity: Entity) => {
                return entity.id === value;
            });
        },
        hasEntity: (value: Entity) => {
            return state.entity.some((entity: Entity) => {
                return Object.keys(entity).every((key) => {
                    return entity[key] === value[key];
                });
            });
        },
        entities: computed(() => state.entity )
    }

}