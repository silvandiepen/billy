<template>
  <div :class="bem(block, 'name')" v-if="entity.companyName">
    <strong>{{ entity.companyName }}</strong>
  </div>
  <div :class="bem(block, 'street')" v-if="entity.street">
    <span :class="bem(block, 'street-name')">{{ entity.street }}</span>
    <span :class="bem(block, 'street-number')">{{ entity.number }}</span>
  </div>
  <br />
  <div :class="bem(block, 'additional')" v-if="entity.additional">
    {{ entity.additional }}
  </div>
  <div :class="bem(block, 'postalcode')" v-if="entity.postalcode">
    {{ entity.postalcode }}
  </div>
  <div :class="bem(block, 'city')" v-if="entity.city">{{ entity.city }}</div>
  <div :class="bem(block, 'country')" v-if="entity.country">
    {{ entity.country }}
  </div>
  <div :class="bem(block, 'email')" v-if="entity.phone">
    {{ entity.phone }}
  </div>
  <div :class="bem(block, 'email')" v-if="entity.fax">
    {{ entity.fax }}
  </div>
  <div :class="bem(block, 'email')" v-if="entity.email">
    {{ entity.email }}
  </div>
  <div :class="bem(block, 'website')" v-if="entity.website">
    {{ entity.website }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { InvoiceEntity } from "./invoice.model";
import { bem } from "../../composables";

export default defineComponent({
  props: {
    entity: {
      type: Object as PropType<InvoiceEntity>,
      default: () => {},
    },
  },
  setup() {
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

    return { block: "client-entity", bem, format };
  },
});
</script>
