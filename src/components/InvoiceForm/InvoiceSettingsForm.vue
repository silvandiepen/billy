<template>
  <component :is="tag" :class="bemm()">
    <div
      :class="bemm('preview')"
      v-if="!isEditting"
      @click="isEditting = !isEditting"
    >
      <dl :class="[bemm('list'), 'data-list']">
        <dt>{{ t("label.number") }}</dt>
        <dl>{{ invoice.current.number }}</dl>
      </dl>
      <dl :class="[bemm('list'), 'data-list']">
        <dt>{{ t("label.date") }}</dt>
        <dl>{{ invoice.current.date }}</dl>
      </dl>
      <dl :class="[bemm('list'), 'data-list']">
        <dt>{{ t("label.tax") }}</dt>
        <dl>{{ invoice.settings.tax }}</dl>
      </dl>
      <dl :class="[bemm('list'), 'data-list']">
        <dt>{{ t("label.currency") }}</dt>
        <dl>{{ invoice.settings.currency }}</dl>
      </dl>
      <dl :class="[bemm('list'), 'data-list']">
        <dt>{{ t("label.logo") }}</dt>
        <dl>
          <div
            :class="bemm('logo')"
            v-if="invoice.settings.logo"
            v-html="invoice.settings.logo"
          ></div>
        </dl>
      </dl>
    </div>
    <div :class="bemm('form')" v-if="isEditting">
      <FormNumber
        :label="`${t('invoice')} #`"
        v-model="invoice.current.number"
      />
      <FormNumber :label="t('vat')" v-model="invoice.settings.tax" />
      <FormDate :label="t('date')" v-model="invoice.current.date" />
      <FormSelect
        :label="t('currency')"
        :options="currencyOptions"
        v-model="invoice.settings.currency"
      />
      <FormText
        :label="t('logo')"
        v-model="invoice.settings.logo"
        v-if="invoice.settings.logo.length < 100"
      />
      <FormTextArea
        :label="t('logo')"
        v-model="invoice.settings.logo"
        v-if="invoice.settings.logo.length > 100"
      />
      <Knop @click="isEditting = !isEditting">{{ t("done") }}</Knop>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBemm } from "bemm";

import { InvoiceNote } from "../Invoice";
import {
  ButtonType,
  ButtonComponent,
  FormTextComponent,
  FormDateComponent,
  FormNumberComponent,
  FormTextAreaComponent,
  FormSelectComponent,
} from "../ui";
import { getInvoice, removeNote } from "../../composables/state";

export default defineComponent({
  components: {
    Knop: ButtonComponent,
    FormText: FormTextComponent,
    FormDate: FormDateComponent,
    FormNumber: FormNumberComponent,
    FormTextArea: FormTextAreaComponent,
    FormSelect: FormSelectComponent,
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
    const bemm = useBemm("invoice-form-settings");
    const isEditting = ref(false);

    const currencyOptions = [
      { value: "EUR", label: t("currency.eur") },
      { value: "USD", label: t("currency.usd") },
    ];

    return {
      bemm,
      t,
      ButtonType,
      actions: {
        removeNote,
      },
      invoice: getInvoice.value,
      isEditting,
      currencyOptions,
    };
  },
});
</script>
<style lang="scss">
.invoice-form-settings {
  &__preview {
    @include displayBlock();
  }
  &__logo,
  &__logo svg {
    max-width: 3em;
    max-height: 3em;
  }
}
</style>
