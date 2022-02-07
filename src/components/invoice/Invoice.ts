import { defineComponent, computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

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

export default defineComponent({
  components: {
    InvoiceEntity,
    InvoiceItem,
  },
  setup() {
    const { t } = useI18n({});

    const style = new Style("invoice");

    const currentData = computed(() =>
      invoice.value.current.data.filter(
        (item) => item.title || item.description
      )
    );

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

    return {
      t,
      Entity,
      style,
      invoice,
      total,
      tax: getInvoiceTax,
      sum: getInvoiceSum,
      currentData,
      invoiceNumber: getInvoiceNumber(
        invoice.value.current.number,
        invoice.value.current.date
      ),
      formatNumber,
      discount,
      templator,
    };
  },
});
