import { reactive, ref, watch, computed } from "vue";
import { newId } from "./helpers";

import {
  defaultInvoice,
  Invoice,
  InvoiceEntity,
  InvoiceItem,
  InvoiceNote,
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

const isPristine = ref(true);

export const invoiceStatus = reactive({
  isNew: false,
  isChanged: false,
});

export const getInvoiceStatus = computed(() => {
  return invoiceStatus;
});

watch(
  () => state.invoice,
  () => {
    invoiceStatus.isChanged = isInvoiceChanged();
    invoiceStatus.isNew = isInvoiceNew();
    console.log("state has changed");
    console.log(invoiceStatus);
  },
  { deep: true }
);

/*

  Keep the state

*/

watch(
  () => state.invoice,
  () => {
    saveState();
    isPristine.value = false;
  },
  { deep: true }
);

const saveState = () => {
  localStorage.setItem(store.STATE, JSON.stringify(state.invoice));
};

export const resetState = () => {
  isPristine.value = true;
  state.invoice = defaultInvoice;
};

/*

  Actions

  */

export const newEntry = (): void => {
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

export const isPristineInvoice = (): boolean => {
  return isPristine.value;
};

export const getInvoice = computed<State["invoice"]>(() => {
  return state.invoice;
});

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
  return getInvoiceNumber(
    state.invoice.current.number,
    state.invoice.current.date
  );
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
export const getInvoiceIndexByID = (id: string): number => {
  const tempInvoices: Invoice[] = savedInvoices.value || [];

  const findInvoiceIndex = tempInvoices.findIndex(
    (inv) => inv.current.id === id
  );
  return findInvoiceIndex > -1 ? findInvoiceIndex : -1;
};

export const isInvoiceNew = (): boolean => {
  return !invoiceIDExists(state.invoice.current.id);
};

const setLastUpdate = () => {
  console.log(state.invoice.current.lastUpdate);
  state.invoice.current.lastUpdate = new Date();
};

export const saveInvoice = (): void => {
  setLastUpdate();

  if (invoiceStatus.isNew) {
    savedInvoices.value.push(getInvoice.value);
  } else {
    updateInvoice();
  }
  saveToLocalStorage();
};

export const isInvoiceChanged = (): boolean => {
  if (invoiceStatus.isNew) return false;

  const newData = JSON.stringify(state.invoice);
  const existingData = JSON.stringify(getInvoiceById(state.invoice.current.id));

  if (!newData || !existingData) {
    return true;
  }
  const sameLength = newData.length === existingData.length;
  const sameString = newData === existingData;

  let isChanged = false;
  if (!sameLength) isChanged = true;
  if (!sameString) isChanged = true;

  return isChanged;
};

export const updateInvoice = (): void => {
  setLastUpdate();

  let currentIndex = getInvoiceIndexByID(getInvoice.value.current.id);
  console.log(currentIndex, getInvoice.value.current.id);
  if (currentIndex > -1) {
    console.log("is actually gonna update it");
    savedInvoices.value[currentIndex] = getInvoice.value;
    saveToLocalStorage();
  }
};

export const saveToLocalStorage = () => {
  const invoices = JSON.stringify(savedInvoices.value);
  localStorage.setItem(store.INVOICES, invoices);
};
