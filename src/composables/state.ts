import { reactive, ref } from "vue";
import { newId } from "./helpers";

import {
  defaultInvoice,
  Invoice,
  InvoiceItem,
} from "../components/invoice/invoice.model";
import { getInvoiceTotal } from "../components/invoice/Invoice.helpers";

interface State {
  invoice: Invoice;
}

export const state: State = reactive({
  invoice: defaultInvoice,
});

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

export const removeEntry = (id: string): void => {
  state.invoice.current.data = state.invoice.current.data.filter(
    (item) => item.id !== id
  );
};

export const savedInvoices = ref<Invoice[]>([]);

export const loadInvoices = () => {
  const invoices = JSON.parse(localStorage.getItem("billy:invoices") || "[]");
  savedInvoices.value = invoices;
};
export const getInvoices = () => {
  const invoices = JSON.parse(localStorage.getItem("billy:invoices") || "[]");
  savedInvoices.value = invoices;
  return invoices.value;
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
    tempInvoices.push(tempInvoice);

    localStorage.setItem("billy:invoices", JSON.stringify(tempInvoices));
  } else {
    const currentIndex = tempInvoices.findIndex(
      (inv: Invoice) => inv.current.id == tempInvoice.current.id
    );
    tempInvoices[currentIndex] = tempInvoice;
    localStorage.setItem("billy:invoices", JSON.stringify(tempInvoices));
  }

  loadInvoices();
};
