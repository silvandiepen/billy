

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";
import { Invoice, BlankInvoice } from '../types';

import { useId } from '@sil/id';
import { flattenAndExcludeId } from '@/utils';
import { getDateObject } from '@sil/format';
const newId = useId();


const StateKey = 'billy:invoice';


const invoiceState = reactive<Invoice>(await retrieveState(
    BlankInvoice, StateKey))

watchState(invoiceState, StateKey)

const getLastNumber = (): number => {
    return 0;
}

const createBlankInvoice = (): Invoice => {
const today = new Date();
const dateObject = getDateObject(today,{
    padded: true
});

const todayString = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;

    return {
        ...BlankInvoice,
        id: newId(),
        details: {
            ...BlankInvoice.details,
            number: `${getLastNumber() + 1}`,
            date: todayString as unknown as Date,
            dueDate: todayString as unknown as Date,
        },
        sender: {
            ...BlankInvoice.sender,
            id: newId()
        },
        receiver: {
            ...BlankInvoice.receiver,
            id: newId()
        },
    }
}

export const useInvoice = () => {


    const setData = (value: Invoice) => {
        console.log('setData', value)
    }
    const setInvoice = (value: Invoice) => {
        invoiceState.id = value.id
        invoiceState.details = value.details
        invoiceState.items = value.items
        invoiceState.notes = value.notes
        invoiceState.sender = value.sender
        invoiceState.receiver = value.receiver
    }

    const removeItem = (id: string) => {
        invoiceState.items = invoiceState.items.filter((item) => {
            return item.id !== id;
        })
    }

    const removeNote = (id: string) => {
        invoiceState.notes = invoiceState.notes.filter((note) => {
            return note.id !== id;
        })
    }

    const toggleItem = (id: string) => {    
        invoiceState.items = invoiceState.items.map((item) => {
            if (item.id === id) {
                item.active = !item.active;
            }
            return item;
        })
    }
    const toggleNote = (id: string) => {
        invoiceState.notes = invoiceState.notes.map((note) => {
            if (note.id === id) {
                note.active = !note.active;
            }
            return note;
        })
    }
    

    return {
        newInvoice: () => {
            setInvoice(createBlankInvoice())
        },
        setInvoice,

        isBlank: computed(() => {
            return JSON.stringify(flattenAndExcludeId(invoiceState)) === JSON.stringify(flattenAndExcludeId(BlankInvoice));
        }),

        setId: (id: string) => {
            invoiceState.id = id
        },
        invoice: computed({
            get() {
                return invoiceState
            }, set(value) {
                return setData(value)
            }
        }),
        removeItem,
        removeNote,
        toggleItem,
        toggleNote
    }

}