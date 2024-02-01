

import { computed, reactive } from 'vue';
import { watchState, retrieveState } from "@sil/storage";
import { Invoice } from '@/types';

const StateKey = 'billy:archive';

import { useId } from '@sil/id';
const newId = useId();

const state = reactive<{
    invoices: Invoice[]
}>(await retrieveState(
    {
        invoices: []
    }, StateKey))

watchState(state, StateKey)

export const useArchive = () => {

    const invoiceExists = (invoice: Invoice) => {
        return state.invoices.findIndex((inv: Invoice) => {
            return inv.id === invoice.id;
        }) > -1;
    }


    const addInvoice = (value: Invoice) => {
        const newInvoice = {
            ...value, id: value.id || newId()
        }
        state.invoices.push(newInvoice);

        return newInvoice;
    };


    const updateInvoice = (value: Invoice) => {
        const index = state.invoices.findIndex((invoice: Invoice) => {
            return invoice.id === value.id;
        })
        if (index) state.invoices[index] = value;
    }

    const getInvoice = (id: string) => {
        return state.invoices.find((invoice: Invoice) => {
            return invoice.id === id;
        });
    }


    const invoiceHasUpdate = (invoice: Invoice): boolean => {
        if (invoiceExists(invoice)) {
            const oldInvoice = getInvoice(invoice.id);
            return JSON.stringify(oldInvoice) !== JSON.stringify(invoice);
        } return false;
    }

    const saveInvoice = (value: Invoice) => {
        if (invoiceExists(value)) {
            updateInvoice(value)
        } else {
            addInvoice(value);
        }
    }

    const removeInvoice = (invoice:Invoice) => {
        const index = state.invoices.findIndex((inv: Invoice) => {
            return inv.id === invoice.id;
        })
        state.invoices.splice(index, 1);
    }


    return {
        saveInvoice,
        invoiceExists,
        invoiceHasUpdate,
        addInvoice,
        updateInvoice,
        getInvoice,
        removeInvoice,
        invoices: computed(() => state.invoices)
    }

}