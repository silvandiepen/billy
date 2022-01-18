import { reactive, ref, watch } from "vue";
import { newId } from "./helpers";

import {
  defaultInvoice,
  Invoice,
  InvoiceEntity,
  InvoiceItem,
  InvoiceNote,
} from "../components/invoice/Invoice.model";

import {
  getInvoiceTotal,
  invoiceNumber,
} from "../components/invoice/Invoice.helpers";
import { store } from ".";
import { Entity } from "../components/clients/Clients.helpers";

interface State {
  invoice: Invoice;
}

/*

  State

  */
const getState = (): Invoice => {
  const localState = localStorage.getItem(store.STATE);
  return localState ? (JSON.parse(localState) as Invoice) : defaultInvoice;
};

export const state: State = reactive({
  invoice: getState(),
});
/*

  Keep the state

*/

watch(
  () => state.invoice,
  () => {
    console.log("Saved state");
    saveState();
  },
  { deep: true }
);

const saveState = () => {
  localStorage.setItem(store.STATE, JSON.stringify(state.invoice));
};

export const resetState = () => {
  state.invoice = defaultInvoice;
};

/*

  Actions

  */

export const newEntry = (): void => {
  console.log("adding new entry");

  const entry: InvoiceItem = {
    id: newId(),
    title: "",
    description: "",
    amount: 1,
    price: 0,
    discount: 0,
  };

  state.invoice.current.data.push(entry);
};
export const newNote = (): void => {
  console.log("adding new note");

  const note: InvoiceNote = {
    id: newId(),
    title: "",
    description: "",
  };

  state.invoice.settings.notes.push(note);
};

export const removeEntry = (id: string): void => {
  state.invoice.current.data = state.invoice.current.data.filter(
    (item) => item.id !== id
  );
};

export const removeNote = (id: string): void => {
  state.invoice.settings.notes = state.invoice.settings.notes.filter(
    (item) => item.id !== id
  );
};

/*

  Invoices

  */
export const savedInvoices = ref<Invoice[]>([]);

export const loadSavedInvoices = () => {
  const invoices = JSON.parse(localStorage.getItem(store.INVOICES) || "[]");
  savedInvoices.value = invoices;
};

export const getInvoices = () => {
  const invoices = JSON.parse(localStorage.getItem(store.INVOICES) || "[]");
  savedInvoices.value = invoices;
  return invoices.value;
};

export const getInvoice = (id: string): unknown => {
  const invoice = savedInvoices.value.filter(
    (inv: Invoice) => inv.current.id == id
  );
  if (invoice) return invoice[0];
};
export const setInvoice = (id: string) => {
  const currentInvoice = getInvoice(id) as Invoice;

  if (currentInvoice) {
    state.invoice = currentInvoice;
  }
};
export const getInvoiceID = () => {
  return invoiceNumber(state.invoice.current.number);
};

export const setInvoiceEntity = (entity: Entity, data: InvoiceEntity) => {
  switch (entity) {
    case Entity.CLIENT:
      state.invoice.client = data;
      break;
    case Entity.SELLER:
      state.invoice.seller = data;
      break;
  }
};

export const hasCurrentInvoice = (): boolean => {
  console.log(state.invoice.current);
  return !!state.invoice.current?.number;
};

export const getCurrentInvoiceData = (): string => {
  return JSON.stringify(state.invoice);
};

export const invoiceIDExists = (id: string) => {
  const tempInvoices: Invoice[] = getInvoices() || [];
  return !!tempInvoices.find((inv) => inv.current.id == id);
};

export const getInvoiceByID = (id: string): Invoice | undefined => {
  const tempInvoices: Invoice[] = getInvoices() || [];
  return tempInvoices.find((inv) => inv.current.id == id);
};

export const saveInvoiceToStore = (): void => {
  const tempInvoices: Invoice[] = getInvoices() || [];
  const tempInvoice: Invoice = JSON.parse(JSON.stringify(state.invoice));

  tempInvoice.current.total = getInvoiceTotal.value;

  const isNew = Object.keys(savedInvoices.value)
    ? true
    : invoiceIDExists(tempInvoice.current.id);

  if (isNew) {
    console.log(tempInvoices.length, tempInvoices);
    tempInvoices.push(tempInvoice);

    localStorage.setItem(store.INVOICES, JSON.stringify(tempInvoices));
    console.log(tempInvoices.length, tempInvoices);
  } else {
    const currentIndex = tempInvoices.findIndex(
      (inv: Invoice) => inv.current.id == tempInvoice.current.id
    );
    tempInvoices[currentIndex] = tempInvoice;
    localStorage.setItem(store.INVOICES, JSON.stringify(tempInvoices));
  }

  loadSavedInvoices();
};
