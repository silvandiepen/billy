

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";
import { Invoice, BlankInvoice } from '../types';

import { useId } from '@sil/id';
const newId = useId();


const StateKey = 'billy:invoice';


const state = reactive<Invoice>(await retrieveState(
    BlankInvoice, StateKey))

watchState(state, StateKey)

export const useInvoice = () => {


    const setData = (value: Invoice) => {
        console.log('setData', value)
    }
    const setInvoice = (value: Invoice) => {
        state.id = value.id
        state.details = value.details
        state.items = value.items
        state.notes = value.notes
        state.sender = value.sender
        state.receiver = value.receiver
    }

    return {
        newInvoice: () => {
            const newInv = {
                ...BlankInvoice,
                id: newId()
            }
            setInvoice(newInv)
        },
        setInvoice,

        setId: (id: string) => {
            state.id = id
        },
        invoice: computed({
            get() {
                return state
            }, set(value) {
                return setData(value)
            }
        })
    }

}