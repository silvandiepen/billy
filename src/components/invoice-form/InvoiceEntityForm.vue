<template>
  <component :is="tag" :class="bem(block)">
    <FormText :label="t('label.companyName')" v-model="entity.companyName" />
    <FormText :label="t('label.firstName')" v-model="entity.firstName" />
    <FormText :label="t('label.lastName')" v-model="entity.lastName" />
    <FormText
      v-if="entity.companyName"
      :label="t('label.taxId')"
      v-model="entity.taxId"
    />
    <hr />
    <FormText :label="t('label.street')" v-model="entity.street" />
    <FormText :label="t('label.number')" v-model="entity.number" />
    <FormText :label="t('label.additional')" v-model="entity.additional" />
    <FormText :label="t('label.postalcode')" v-model="entity.postalcode" />
    <FormText :label="t('label.city')" v-model="entity.city" />
    <FormText :label="t('label.country')" v-model="entity.country" />
    <hr />
    <FormText :label="t('label.phone')" v-model="entity.phone" />
    <FormText :label="t('label.email')" v-model="entity.email" />
    <FormText :label="t('label.website')" v-model="entity.website" />
    <hr />
    <FormText :label="t('label.bankAccount')" v-model="entity.bankAccount" />
    <FormText :label="t('label.bankName')" v-model="entity.bankName" />
    <FormText :label="t('label.bankSwift')" v-model="entity.bankSwift" />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

import { bem } from "../../composables";
import { InvoiceEntity } from "../invoice/invoice.model";

import FormText from "../ui/form/text/FormText.vue";
import FormNumber from "../ui/form/number/FormNumber.vue";

export default defineComponent({
  components: {
    FormText,
    FormNumber,
  },
  props: {
    entity: {
      type: Object as PropType<InvoiceEntity>,
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
      block: "invoice-form-entity",
      bem,
      t,
    };
  },
});
</script>
