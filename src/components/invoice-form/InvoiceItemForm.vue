<template>
  <component :is="tag" :class="bem(block)">
    <Knop
      icon="delete"
      :type="ButtonType.ICON"
      :class="bem(block, 'delete')"
      @click="actions.removeEntry(item.id)"
    />
    <!-- <div class="label">{{ item.id }}</div> -->

    <FormText :label="t('label.title')" v-model="item.title" />
    <FormText :label="t('label.description')" v-model="item.description" />
    <FormNumber :label="t('label.amount')" v-model="item.amount" />
    <FormNumber :label="t('label.price')" v-model="item.price" />
    <FormNumber :label="t('label.discount')" v-model="item.discount" />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

import { bem } from "../../composables";
import { InvoiceItem } from "../invoice/invoice.model";
import { ButtonType } from "../ui/button/Button.model";
import { removeEntry } from "../../composables/state";

import Button from "../ui/button/Button.vue";
import FormText from "../ui/form/text/FormText.vue";
import FormNumber from "../ui/form/number/FormNumber.vue";

export default defineComponent({
  components: {
    Knop: Button,
    FormText,
    FormNumber,
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
    return {
      block: "invoice-form-item",
      bem,
      t,
      ButtonType,
      actions: {
        removeEntry,
      },
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
