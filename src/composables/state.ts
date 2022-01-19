import { reactive, ref, watch, computed } from "vue";
import { newId } from "./helpers";

import {
  defaultInvoice,
  Invoice,
  InvoiceEntity,
  InvoiceItem,
  InvoiceNote,
  getInvoiceTotal,
  getInvoiceNumber,
  InvoiceCurrency,
} from "../components/Invoice";

import { store } from ".";
import { Entity } from "../components/Entity";

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

const state: State = reactive({
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

/**
 * Entities
 */

export const getInvoiceClient = (): InvoiceEntity => {
  return state.invoice.client;
};
export const getInvoiceSeller = (): InvoiceEntity => {
  return state.invoice.seller;
};

/*

  Invoices

  */

export const getInvoice = (): State["invoice"] => {
  return state.invoice;
};

export const getTax = (): number => {
  return state.invoice.settings.tax;
};
export const getCurrency = (): InvoiceCurrency => {
  return state.invoice.settings.currency;
};

export const savedInvoices = ref<Invoice[]>([]);

export const loadSavedInvoices = () => {
  const invoices = JSON.parse(localStorage.getItem(store.INVOICES) || "[]");
  savedInvoices.value = invoices;
};

export const getInvoices = computed(() => {
  return savedInvoices;
});

export const getInvoiceById = (id: string): unknown => {
  const invoice = savedInvoices.value.filter(
    (inv: Invoice) => inv.current.id == id
  );
  if (invoice) return invoice[0];
};

export const isInvoice = (data: Invoice): data is Invoice => {
  return (<Invoice>data).current !== undefined;
};
export const setInvoiceData = (data: Invoice): void => {
  if (isInvoice(data)) {
    state.invoice = data;
  }
};

export const setInvoice = (id: string) => {
  const currentInvoice = getInvoiceById(id) as Invoice;

  if (currentInvoice) {
    state.invoice = currentInvoice;
  }
};
export const getInvoiceID = () => {
  return getInvoiceNumber(state.invoice.current.number);
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
  const hasItems = state.invoice.current.data.length > 0;
  const hasClient =
    state.invoice.client.companyName || state.invoice.client.firstName;
  const hasSeller =
    state.invoice.seller.companyName || state.invoice.seller.firstName;
  const hasNumber = state.invoice.current.number;

  return !!hasItems || !!hasClient || !!hasSeller || !!hasNumber;
};

export const getCurrentInvoiceData = (): string => {
  return JSON.stringify(state.invoice);
};

export const invoiceIDExists = (id: string) => {
  const tempInvoices: Invoice[] = savedInvoices.value || [];
  return !!tempInvoices.find((inv) => inv.current.id == id);
};

export const getInvoiceByID = (id: string): Invoice | undefined => {
  const tempInvoices: Invoice[] = savedInvoices.value || [];
  return tempInvoices.find((inv) => inv.current.id == id);
};
export const getInvoiceIndexByID = (id: string): number | undefined => {
  const tempInvoices: Invoice[] = savedInvoices.value || [];
  return tempInvoices.findIndex((inv) => inv.current.id === id);
};

export const saveInvoice = (): void => {
  savedInvoices.value.push(getInvoice());
  saveToLocalStorage();
};

export const updateInvoice = (): void => {
  let currentIndex = getInvoiceIndexByID(getInvoice().current.id);
  if (currentIndex && currentIndex > -1) {
    savedInvoices.value[currentIndex] = getInvoice();
  } else {
    saveInvoice();
  }
  saveToLocalStorage();
};

export const saveToLocalStorage = () => {
  const invoices = JSON.stringify(savedInvoices.value);
  localStorage.setItem(store.INVOICES, invoices);
};
