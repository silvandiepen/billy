import { computed } from "vue";
import { format, parseISO } from "date-fns";
import { InvoiceCurrency, InvoiceItem } from "./Invoice.model";
import { getCurrency, getInvoice, getTax } from "../../composables/state";

export const discount = (value: number, discount: number) =>
  value - (value / 100) * discount;

export const getInvoiceNumber = (number: Number, date: Date) => {
  const dateStr = format(parseISO(`${date}`), "yyyyMMdd");

  return `${dateStr}-${`${number}`.padStart(3, "0")}`;
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
