import { computed } from "vue";

import { InvoiceCurrency, InvoiceItem } from "./Invoice.model";
import { state } from "../../composables/state";

export const discount = (value: number, discount: number) =>
  value - (value / 100) * discount;

export const invoiceNumber = (number: Number) => {
  // console.log(number);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}${mm}${dd}-${`${number}`.padStart(3, "0")}`;
};

export const getInvoiceSum = computed(
  () =>
    state.invoice.current?.data.reduce(
      (acc: number, cur: InvoiceItem) =>
        acc + discount(cur.amount * cur.price, cur.discount ? cur.discount : 0),
      0
    ) || 0
);

export const getInvoiceTax = computed(() => {
  return (getInvoiceSum.value / 100) * state.invoice.settings.tax;
});

export const getInvoiceTotal = computed(() => {
  return getInvoiceSum.value + getInvoiceTax.value;
});

export const currencyCode = computed(
  () => state.invoice.settings.currency || InvoiceCurrency.EUR
);

export const formatNumber = (
  number: number | bigint,
  currency = currencyCode.value
) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(number);
