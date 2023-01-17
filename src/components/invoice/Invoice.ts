import { defineComponent, computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { useBemm } from "bemm";
// import {format, parseISO} from 'date-fns/fp'
// import { eo } from 'date-fns/locale'

import { getInvoiceID, getInvoice as invoice } from "../../composables/state";
import {
  discount,
  getInvoiceNumber,
  getInvoiceSum,
  getInvoiceTax,
  getInvoiceTotal,
  formatNumber,
} from "./Invoice.helpers";

import InvoiceItem from "./InvoiceItem.vue";
import InvoiceEntity from "./InvoiceEntity.vue";
import { Entity } from "../Entity";
import { Replacers, replaceStrings } from "../../composables";

import { renderMarkdown } from "../../services";
import { formatISO, format, parseISO } from "date-fns";

export default defineComponent({
  components: {
    InvoiceEntity,
    InvoiceItem,
  },
  setup() {
    const { t } = useI18n({});

    const bemm = useBemm("invoice");

    const currentData = computed(() =>
      invoice.value.current.data.filter(
        (item) => item.title || item.description
      )
    );

    const formatDate = (date: string, template = "MMMM do, yyyy"): string => {
      const isoDate = parseISO(date);
      return format(isoDate, template);
    };


    const total = computed(() => {
      return getInvoiceTotal.value;
    });

    const invoiceId = computed(() => {
      return getInvoiceID();
    });

    const replaceValues: ComputedRef<Replacers> = computed(
      (): Replacers => ({
        "bank.account": invoice.value.seller.bank.account,
        "bank.swift": invoice.value.seller.bank.swift,
        "bank.name": invoice.value.seller.bank.name,
        "bank.beneficiary": invoice.value.seller.bank.beneficiary,
        email: invoice.value.seller.email,
        phone: invoice.value.seller.phone,
        total: formatNumber(total.value),
        "invoice.number": invoiceId.value,
      })
    );
    const templator = (str: string) =>
      renderMarkdown(replaceStrings(str, replaceValues.value));

    const invoiceNumber = computed(() => {
      if (invoice.value.current) {
        return getInvoiceNumber(
          invoice.value.current.number,
          invoice.value.current.date
        );
      } else {
        return "";
      }
    });

    return {
      t,
      Entity,
      bemm,
      invoice,
      total,
      tax: getInvoiceTax,
      sum: getInvoiceSum,
      currentData,
      invoiceNumber,
      formatDate,
      formatNumber,
      discount,
      templator,
    };
  },
});

