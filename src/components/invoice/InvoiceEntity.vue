<template>
  <div :class="[bemm(), isForm && bemm('', 'is-form')]">
    <div class="id-label">
      {{ entityData.id }}
    </div>
    <div :class="bemm('company-name')" v-if="entityData.companyName">
      <strong>{{ entityData.companyName }}</strong>
    </div>
    <div
      :class="bemm('name')"
      v-if="entityData.firstName || entityData.lastName"
    >
      <component
        :is="entity.companyName ? 'span' : 'strong'"
        v-if="entityData.firstName && entityData.lastName"
        >{{ entityData.firstName }} {{ entityData.lastName }}</component
      >
      <component
        :is="entity.companyName ? 'span' : 'strong'"
        v-else-if="entity.firstName"
        >{{ entityData.firstName }}</component
      >
      <component
        :is="entity.companyName ? 'span' : 'strong'"
        v-else-if="entity.lastName"
        >{{ entityData.lastName }}</component
      >
    </div>
    <div :class="bemm('street')" v-if="entityData.street">
      <span :class="bemm('street-name')">{{ entityData.street }}</span>
      <span :class="bemm('street-number')"> {{ entityData.number }}</span>
    </div>
    <div :class="bemm('additional')" v-if="entityData.additional">
      {{ entityData.additional }}
    </div>
    <div :class="bemm('postalcode')" v-if="entityData.postalcode">
      {{ entityData.postalcode }}
    </div>
    <div :class="bemm('city')" v-if="entityData.city">
      {{ entityData.city }}
    </div>
    <div :class="bemm('country')" v-if="entityData.country">
      {{ entityData.country }}
    </div>

    <div :class="bemm('tax-id')" v-if="entityData.taxId">
      {{ t("taxId", { msg: entityData.taxId }) }}
    </div>

    <!-- <br
      v-if="
        entity.bankName ||
        entity.bankSwift ||
        entity.bankAccount ||
        entity.taxId
      "
    /> -->

    <!-- <div :class="bemm('bank-name')" v-if="entity.bank.name">
      {{ entityData.bank.name }}
    </div>
    <div :class="bemm('bank-swift')" v-if="entity.bank.swift">
      {{ entityData.bank.swift }}
    </div>
    <div :class="bemm('bank-account')" v-if="entity.bank.account">
      {{ entityData.bank.account }}
    </div>
    <div :class="bemm('bank-beneficiary')" v-if="entity.bank.beneficiary">
      {{ entityData.bank.beneficiary }}
    </div>
    <div :class="bemm('tax-id')" v-if="entity.taxId">
      {{ entityData.taxId }}
    </div> -->

    <br
      v-if="
        entityData.phone ||
        entityData.fax ||
        entityData.email ||
        entityData.website
      "
    />

    <div :class="bemm('phone')" v-if="entityData.phone">
      {{ entityData.phone }}
    </div>
    <div :class="bemm('fax')" v-if="entityData.fax">
      {{ entityData.fax }}
    </div>
    <div :class="bemm('email')" v-if="entityData.email">
      {{ entityData.email }}
    </div>
    <div :class="bemm('website')" v-if="entityData.website">
      {{ entityData.website }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useBemm } from "bemm";
import { useI18n } from "vue-i18n";
import { Entity } from "../Entity";

import { getInvoiceClient, getInvoiceSeller } from "../../composables/state";
import { InvoiceEntity } from "../Invoice";

export default defineComponent({
  props: {
    entity: {
      type: String as PropType<Entity>,
      default: "",
      required: true,
    },
    isForm: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { t } = useI18n({});

    const entityData = computed<InvoiceEntity>(() => {
      return props.entity === Entity.CLIENT
        ? getInvoiceClient()
        : getInvoiceSeller();
    });

    const bemm = useBemm("invoice-entity");

    let format = {
      en: [
        ["companyName"],
        ["firstName", "lastName"],
        ["number", "street"],
        ["additional"],
        ["city", "postalcode"],
        ["country"],
        ["break"],
        ["phone"],
        ["fax"],
        ["email"],
        ["website"],
      ],
      nl: [
        ["companyName"],
        ["firstName", "lastName"],
        ["street", "number"],
        ["additional"],
        ["postalcode", "city"],
        ["country"],
        ["break"],
        ["phone"],
        ["fax"],
        ["email"],
        ["website"],
      ],
    };

    return { t, bemm, format, entityData };
  },
});
</script>
<style lang="scss">
.invoice-entity {
  .id-label {
    display: none;
  }
  &--is-form {
    .id-label {
      display: block;
    }
    @include displayBlock();
  }
}
</style>
