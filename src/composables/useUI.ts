

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";

const StateKey = 'billy:ui';


const uiState = reactive<{
    mobile: boolean,
    sidepanelWidth: number,
    previewSize: number
}>(await retrieveState(
    {
        mobile: false,
        sidepanelWidth: 240,
        previewSize: 0.5
    }, StateKey))

watchState(uiState, StateKey)

const initCheckMobile = () => {
    window && uiState.mobile === window.innerWidth < 768;
    window && window.addEventListener('resize', () => {
        uiState.mobile = window.innerWidth < 768
    })
}

export const useUI = () => {

    return {
        initCheckMobile,
        isMobile: computed(() => uiState.mobile),
        sidepanelWidth: computed({
            get() {
                return uiState.sidepanelWidth
            },
            set(value: number) {
                uiState.sidepanelWidth = value
            }
        }),
        previewSize: computed({
            get() {
                return uiState.previewSize
            },
            set(value: number) {
                uiState.previewSize = value
            }
        })
    }

}