<template>
  <div :class="style.bem()">
    <div :class="style.bem('company-name')" v-if="entityData.companyName">
      <strong>{{ entityData.companyName }}</strong>
    </div>
    <div
      :class="style.bem('name')"
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
    <div :class="style.bem('street')" v-if="entityData.street">
      <span :class="style.bem('street-name')">{{ entityData.street }}</span>
      <span :class="style.bem('street-number')"> {{ entityData.number }}</span>
    </div>
    <div :class="style.bem('additional')" v-if="entityData.additional">
      {{ entityData.additional }}
    </div>
    <div :class="style.bem('postalcode')" v-if="entityData.postalcode">
      {{ entityData.postalcode }}
    </div>
    <div :class="style.bem('city')" v-if="entityData.city">
      {{ entityData.city }}
    </div>
    <div :class="style.bem('country')" v-if="entityData.country">
      {{ entityData.country }}
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
      {{ entityData.bank.name }}
    </div>
    <div :class="style.bem('bank-swift')" v-if="entity.bank.swift">
      {{ entityData.bank.swift }}
    </div>
    <div :class="style.bem('bank-account')" v-if="entity.bank.account">
      {{ entityData.bank.account }}
    </div>
    <div :class="style.bem('bank-beneficiary')" v-if="entity.bank.beneficiary">
      {{ entityData.bank.beneficiary }}
    </div>
    <div :class="style.bem('tax-id')" v-if="entity.taxId">
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

    <div :class="style.bem('phone')" v-if="entityData.phone">
      {{ entityData.phone }}
    </div>
    <div :class="style.bem('fax')" v-if="entityData.fax">
      {{ entityData.fax }}
    </div>
    <div :class="style.bem('email')" v-if="entityData.email">
      {{ entityData.email }}
    </div>
    <div :class="style.bem('website')" v-if="entityData.website">
      {{ entityData.website }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Style } from "@sil/tools";

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
  },
  setup(props) {
    const entityData = computed<InvoiceEntity>(() => {
      return props.entity === Entity.CLIENT
        ? getInvoiceClient()
        : getInvoiceSeller();
    });

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

    return { style, format, entityData };
  },
});
</script>
