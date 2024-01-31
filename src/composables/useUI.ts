

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";

const StateKey = 'billy:invoice';


const state = reactive<{
    sidepanelWidth: number,
    previewSize: number
}>(await retrieveState(
    {
        sidepanelWidth: 240,
        previewSize: 0.5
    }, StateKey))

watchState(state, StateKey)

export const useUI = () => {


    return {
        sidepanelWidth: computed({
            get() {
                return state.sidepanelWidth
            }, 
            set(value: number) {
                state.sidepanelWidth = value
            }
        }),
        previewSize: computed({
            get() {
                return state.previewSize
            }, 
            set(value: number) {
                state.previewSize = value
            }
        })
    }

}