import { defineComponent, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { state, getInvoiceID } from "../../composables/state";
import {
  discount,
  invoiceNumber,
  getInvoiceSum,
  getInvoiceTax,
  getInvoiceTotal,
  formatNumber,
} from "./Invoice.helpers";

import InvoiceItem from "./InvoiceItem.vue";
import InvoiceEntity from "./InvoiceEntity.vue";

export default defineComponent({
  components: {
    InvoiceEntity,
    InvoiceItem,
  },
  setup() {
    const { t } = useI18n({});

    const style = new Style("invoice");

    const invoice = computed(() => {
      return state.invoice;
    });
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

    const replaceValues = computed(() => ({
      "bank.account": invoice.value.seller.bank.account,
      "bank.swift": invoice.value.seller.bank.swift,
      "bank.name": invoice.value.seller.bank.name,
      "bank.beneficiary": invoice.value.seller.bank.beneficiary,
      email: invoice.value.seller.email,
      phone: invoice.value.seller.phone,
      total: total.value,
      "invoice.number": invoiceId.value,
    }));

    const templator = (str: string) => {
      const re = new RegExp(
        Object.keys(replaceValues.value)
          .map((s) => (s = `{${s}}`))
          .join("|"),
        "gi"
      );

      return str.replace(
        re,
        (matched) =>
          replaceValues.value[
            Object.keys(replaceValues.value).find(
              (key) => key === matched.replace("{", "").replace("}", "")
            )
          ] || `[Couldn't find ${matched}]`
      );
    };

    return {
      t,
      style,
      invoice,
      total,
      tax: getInvoiceTax,
      sum: getInvoiceSum,
      currentData,
      invoiceNumber,
      formatNumber,
      discount,
      templator,
    };
  },
});
