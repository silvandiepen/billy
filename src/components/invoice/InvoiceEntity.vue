<template>
  <div :class="style.bem()">
    <div :class="style.bem('company-name')" v-if="entity.companyName">
      <strong>{{ entity.companyName }}</strong>
    </div>
    <div :class="style.bem('name')" v-if="entity.firstName || entity.lastName">
      <component
        :is="entity.companyName ? 'span' : 'strong'"
        v-if="entity.firstName && entity.lastName"
        >{{ entity.firstName }} {{ entity.lastName }}</component
      >
      <component
        :is="entity.companyName ? 'span' : 'strong'"
        v-else-if="entity.firstName"
        >{{ entity.firstName }}</component
      >
      <component
        :is="entity.companyName ? 'span' : 'strong'"
        v-else-if="entity.lastName"
        >{{ entity.lastName }}</component
      >
    </div>
    <div :class="style.bem('street')" v-if="entity.street">
      <span :class="style.bem('street-name')">{{ entity.street }}</span>
      <span :class="style.bem('street-number')"> {{ entity.number }}</span>
    </div>
    <div :class="style.bem('additional')" v-if="entity.additional">
      {{ entity.additional }}
    </div>
    <div :class="style.bem('postalcode')" v-if="entity.postalcode">
      {{ entity.postalcode }}
    </div>
    <div :class="style.bem('city')" v-if="entity.city">{{ entity.city }}</div>
    <div :class="style.bem('country')" v-if="entity.country">
      {{ entity.country }}
    </div>

    <!-- <br
      v-if="
        entity.bankName ||
        entity.bankSwift ||
        entity.bankAccount ||
        entity.taxId
      "
    /> -->

    <!-- <div :class="style.bem('bank-name')" v-if="entity.bank.name">
      {{ entity.bank.name }}
    </div>
    <div :class="style.bem('bank-swift')" v-if="entity.bank.swift">
      {{ entity.bank.swift }}
    </div>
    <div :class="style.bem('bank-account')" v-if="entity.bank.account">
      {{ entity.bank.account }}
    </div>
    <div :class="style.bem('bank-beneficiary')" v-if="entity.bank.beneficiary">
      {{ entity.bank.beneficiary }}
    </div>
    <div :class="style.bem('tax-id')" v-if="entity.taxId">
      {{ entity.taxId }}
    </div> -->

    <br v-if="entity.phone || entity.fax || entity.email || entity.website" />

    <div :class="style.bem('phone')" v-if="entity.phone">
      {{ entity.phone }}
    </div>
    <div :class="style.bem('fax')" v-if="entity.fax">
      {{ entity.fax }}
    </div>
    <div :class="style.bem('email')" v-if="entity.email">
      {{ entity.email }}
    </div>
    <div :class="style.bem('website')" v-if="entity.website">
      {{ entity.website }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Style } from "@sil/tools";

import { InvoiceEntity } from "./invoice.model";

export default defineComponent({
  props: {
    entity: {
      type: Object as PropType<InvoiceEntity>,
      default: () => {},
    },
  },
  setup() {
    const style = new Style("client-entity");

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

    return { style, format };
  },
});
</script>
