<template>
  <div :class="style.bem()" @click="loadInvoice">
    <div :class="style.bem('title')">
      <p>
        <strong>#{{ invoiceNumber }}</strong
        ><br />
        {{ invoiceName }}
        {{ formatDate(invoice.current.date) }}<br />
        {{ formatNumber(invoice.current.total, invoice.settings.currency) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Style } from "@sil/tools";

import { Invoice } from "./Invoice.model";
import { getInvoiceNumber, formatNumber } from "./Invoice.helpers";
import { setInvoice } from "../../composables/state";
import { formatDate } from "../../composables";

export default defineComponent({
  props: {
    invoice: {
      type: Object as PropType<Invoice>,
      default: () => {},
    },
  },
  setup(props) {
    const style = new Style("invoice-item");

    const invoiceName = computed(() => {
      return props.invoice.client.companyName
        ? props.invoice.client.companyName
        : `${props.invoice.client.firstName} ${props.invoice.client.lastName}`;
    });

    const loadInvoice = () => {
      console.log("set invoice:", props.invoice.current.id);
      setInvoice(props.invoice.current.id);
    };
    return {
      invoiceNumber: getInvoiceNumber(props.invoice.current.number),
      style,
      formatNumber,
      formatDate,
      invoiceName,
      loadInvoice,
    };
  },
});
</script>
<style lang="scss">
.invoice-item {
  @include displayBlock();

  & + & {
    margin-top: variable(space);
  }
}
</style>
