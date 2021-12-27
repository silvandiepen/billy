<template>
  <div :class="bem(block)" @click="loadInvoice">
    <div :class="bem(block, 'title')">
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
import { Invoice } from "./invoice.model";
import { bem } from "../../composables";
import { invoiceNumber, formatNumber, formatDate } from "./Invoice.helpers";
import { setInvoice } from "../../composables/state";

export default defineComponent({
  props: {
    invoice: {
      type: Object as PropType<Invoice>,
      default: () => {},
    },
  },
  setup(props) {
    const invoiceName = computed(() => {
      return props.invoice.client.companyName
        ? props.invoice.client.companyName
        : `${props.invoice.client.firstName} ${props.invoice.client.lastName}`;
    });

    const loadInvoice = () => {
      setInvoice(props.invoice.current.id);
    };
    return {
      invoiceNumber: invoiceNumber(props.invoice.current.number),
      block: "invoice-item",
      bem,
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
  border-radius: var(--border-radius);
  background-color: var(--foreground-75);
  padding: calc(var(--space) / 2);
  margin: 0 calc(var(--space) / 2 * -1);

  &:hover {
    cursor: pointer;
    background-color: var(--primary);
  }
}
</style>
