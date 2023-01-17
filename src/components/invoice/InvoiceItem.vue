<template>
  <div :class="bemm()" @click="loadInvoice">
    <div :class="bemm('title')">
      <p>
        <strong>#{{ invoiceNumber }}</strong
        ><br />
        {{ invoiceName }}
        {{ formatDate(invoice.current.date) }}<br />
        {{ formatNumber(invoice.current.total, invoice.settings.currency)
        }}<br />
        update: {{ formatDate(invoice.current.lastUpdate) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useBemm } from "bemm";

import { Invoice, getInvoiceNumber, formatNumber } from "../Invoice";
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
    const bemm = useBemm("invoice-item");

    const invoiceName = computed(() => {
      return props.invoice.client.companyName
        ? props.invoice.client.companyName
        : `${props.invoice.client.firstName} ${props.invoice.client.lastName}`;
    });

    const loadInvoice = () => {
      setInvoice(props.invoice.current.id);
    };
    return {
      invoiceNumber: getInvoiceNumber(
        props.invoice.current.number,
        props.invoice.current.date
      ),
      bemm,
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
  & + & {
    margin-top: calc(#{v(space)} / 2);
  }
}
</style>
