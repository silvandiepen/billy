import { computed } from "vue";

import { InvoiceCurrency, InvoiceItem } from "./Invoice.model";
import { getCurrency, getInvoice, getTax } from "../../composables/state";

export const discount = (value: number, discount: number) =>
  value - (value / 100) * discount;

export const getInvoiceNumber = (number: Number) => {
  // console.log(number);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}${mm}${dd}-${`${number}`.padStart(3, "0")}`;
};

export const getInvoiceSum = computed(
  () =>
    getInvoice.value.current?.data.reduce(
      (acc: number, cur: InvoiceItem) =>
        acc + discount(cur.amount * cur.price, cur.discount ? cur.discount : 0),
      0
    ) || 0
);

export const getInvoiceTax = computed(() => {
  return (getInvoiceSum.value / 100) * getTax();
});

export const getInvoiceTotal = computed(() => {
  return getInvoiceSum.value + getInvoiceTax.value;
});

export const currencyCode = computed(
  () => getCurrency() || InvoiceCurrency.EUR
);

export const formatNumber = (
  number: number | bigint,
  currency = currencyCode.value
) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(number);
