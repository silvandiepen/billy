<template>
  <component :is="tag" :class="style.bem()">
    <Knop
      icon="delete"
      :type="ButtonType.ICON"
      :class="style.bem('delete')"
      @click="actions.removeEntry(item.id)"
    />

    <FormText :label="t('label.title')" v-model="item.title" />
    <FormText :label="t('label.description')" v-model="item.description" />
    <FormNumber :label="t('label.amount')" v-model="item.amount" />
    <FormNumber :label="t('label.price')" v-model="item.price" />
    <FormNumber :label="t('label.discount')" v-model="item.discount" />
    <FormNumber
      :label="t('vat')"
      :placeholder="`${invoice.settings.tax}`"
      v-model="item.tax"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { InvoiceItem } from "../Invoice";

import { removeEntry } from "../../composables/state";

import {
  ButtonType,
  ButtonComponent,
  FormTextComponent,
  FormNumberComponent,
} from "../ui";

import { getInvoice } from "../../composables/state";

export default defineComponent({
  components: {
    Knop: ButtonComponent,
    FormText: FormTextComponent,
    FormNumber: FormNumberComponent,
  },
  props: {
    item: {
      type: Object as PropType<InvoiceItem>,
      default: () => {},
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup() {
    const { t } = useI18n({});
    const style = new Style("invoice-form-item");

    const invoice = computed(() => {
      return getInvoice();
    });

    return {
      style,
      t,
      ButtonType,
      actions: {
        removeEntry,
      },
      invoice,
    };
  },
});
</script>
<style lang="scss">
.invoice-form-item {
  &__delete {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
}
</style>
