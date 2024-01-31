

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";
import { Invoice, BlankInvoice } from '../types';

const StateKey = 'billy:invoice';


const state = reactive<Invoice>(await retrieveState(
    BlankInvoice, StateKey))

watchState(state, StateKey)

export const useInvoice = () => {


    const setData = (value: Invoice) => {
        console.log('setData', value)
    }

    return {
        invoice: computed({
            get() {
                return state
            }, set(value) {
                return setData(value)
            }
        })
    }

}