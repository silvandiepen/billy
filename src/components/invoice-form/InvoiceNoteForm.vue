<template>
  <component :is="tag" :class="style.bem()">
    <Knop
      icon="delete"
      :type="ButtonType.ICON"
      :class="style.bem('delete')"
      @click="actions.removeEntry(item.id)"
    />
    <!-- <div class="label">{{ item.id }}</div> -->

    <FormText :label="t('label.title')" v-model="item.title" />
    <FormTextArea :label="t('label.description')" v-model="item.description" />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { InvoiceNote } from "../invoice/invoice.model";
import { ButtonType } from "../ui/button/Button.model";
import { removeNote } from "../../composables/state";

import Button from "../ui/button/Button.vue";
import FormText from "../ui/form/text/FormText.vue";
import FormNumber from "../ui/form/number/FormNumber.vue";
import FormTextArea from "../ui/form/textarea/FormTextArea.vue";

import { state } from "../../composables/state";

export default defineComponent({
  components: {
    Knop: Button,
    FormText,
    FormNumber,
    FormTextArea,
  },
  props: {
    item: {
      type: Object as PropType<InvoiceNote>,
      default: () => {},
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup() {
    const { t } = useI18n({});
    const style = new Style("invoice-form-note");

    return {
      style,
      t,
      ButtonType,
      actions: {
        removeNote,
      },
      invoice: state.invoice,
    };
  },
});
</script>
<style lang="scss">
.invoice-form-note {
  &__delete {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
}
</style>
