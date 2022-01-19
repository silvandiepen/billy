<template>
  <component :is="tag" :class="style.bem()">
    <Knop
      icon="delete"
      :type="ButtonType.ICON"
      :class="style.bem('delete')"
      @click="actions.removeNote(item.id)"
    />

    <FormText :label="t('label.title')" v-model="item.title" />
    <FormTextArea :label="t('label.description')" v-model="item.description" />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { InvoiceNote } from "../Invoice";

import {
  ButtonType,
  ButtonComponent,
  FormTextComponent,
  FormNumberComponent,
  FormTextAreaComponent,
} from "../ui";

import { getInvoice, removeNote } from "../../composables/state";

export default defineComponent({
  components: {
    Knop: ButtonComponent,
    FormText: FormTextComponent,
    FormNumber: FormNumberComponent,
    FormTextArea: FormTextAreaComponent,
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

    const invoice = computed(() => {
      return getInvoice();
    });

    return {
      style,
      t,
      ButtonType,
      actions: {
        removeNote,
      },
      invoice,
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
