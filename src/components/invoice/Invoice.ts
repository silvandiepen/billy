import { defineComponent, computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import { bem } from "../../composables";
import { state } from "../../composables/state";
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

    const invoice = ref(state.invoice);

    return {
      t,
      block: "invoice",
      bem,
      invoice,
      total: getInvoiceTotal,
      tax: getInvoiceTax,
      sum: getInvoiceSum,
      invoiceNumber,
      formatNumber,
      discount,
    };
  },
});
