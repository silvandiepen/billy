<template>
  <div :class="bem(block)">
    <div :class="bem(block, 'title')">
      <strong>#{{ invoiceNumber }}</strong
      ><br />
      {{ invoice.current.date }}
      {{ invoice.current.total }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Invoice } from "./invoice.model";
import { bem } from "../../composables";
import { invoiceNumber } from "./Invoice.helpers";

export default defineComponent({
  props: {
    invoice: {
      type: Object as PropType<Invoice>,
      default: () => {},
    },
  },
  setup(props) {
    return {
      invoiceNumber: invoiceNumber(props.invoice.current.number),
      block: "invoice-item",
      bem,
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
}
</style>
