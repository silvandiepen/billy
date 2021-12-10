<template>
  <component :is="tag" v-if="client" :class="bem(block)">
    <div
      :class="bem(block, 'container')"
      @click="setClientToState(client?.id || '')"
    >
      <h4 :class="bem(block, 'name')">
        {{ client.name }}
      </h4>

      <div v-if="showDetails" :class="bem(block, 'details')">
        <dl :class="bem(block, 'detail')">
          <dt :class="bem(block, 'title')">ID</dt>
          <dd :class="bem(block, 'description')">{{ client.id }}</dd>
        </dl>
        <dl :class="bem(block, 'detail')">
          <dt :class="bem(block, 'title')">street</dt>
          <dd :class="bem(block, 'description')">{{ client.street }}</dd>
        </dl>
        <dl>
          <dt :class="bem(block, 'title')">number</dt>
          <dd :class="bem(block, 'description')">{{ client.number }}</dd>
        </dl>
        <dl>
          <dt :class="bem(block, 'title')">postalcode</dt>
          <dd :class="bem(block, 'description')">{{ client.postalcode }}</dd>
        </dl>
        <dl>
          <dt :class="bem(block, 'title')">city</dt>
          <dd :class="bem(block, 'description')">{{ client.city }}</dd>
        </dl>
        <dl>
          <dt :class="bem(block, 'title')">country</dt>
          <dd :class="bem(block, 'description')">{{ client.country }}</dd>
        </dl>
      </div>
      <Knoppen :align="ButtonAlign.CENTER">
        <Knop
          v-if="showDetails"
          @click="showDetails = !showDetails"
          icon="arrow-up"
          :size="ButtonSize.SMALL"
          :type="ButtonType.GHOST"
          >hide details</Knop
        >
        <Knop
          v-else
          @click="showDetails = !showDetails"
          icon="arrow-down"
          :size="ButtonSize.SMALL"
          :type="ButtonType.GHOST"
          >show details</Knop
        >
      </Knoppen>

      <Knop
        :class="bem(block, 'delete')"
        :type="ButtonType.ICON"
        icon="delete"
        @click="removeClient(client?.id || '')"
      />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import { bem } from "../../composables";
import { removeClient, setClientToState } from "./Clients.helpers";

import Button from "../ui/button/Button.vue";
import ButtonGroup from "../ui/button/ButtonGroup.vue";
import { ButtonType, ButtonSize, ButtonAlign } from "../ui/button";
import { InvoiceEntity } from "../invoice/invoice.model";

export default defineComponent({
  components: {
    Knop: Button,
    Knoppen: ButtonGroup,
  },
  props: {
    client: {
      type: Object as PropType<InvoiceEntity>,
    },
    tag: {
      type: String,
      default: "div",
    },
  },

  setup() {
    const showDetails = ref(false);

    return {
      block: "client",
      bem,
      removeClient,
      ButtonType,
      ButtonSize,
      ButtonAlign,
      setClientToState,
      showDetails,
    };
  },
});
</script>

<style lang="scss">
.client {
  position: relative;
  padding: calc(var(--space) / 2);
  background-color: var(--primary-25);
  color: var(--primary-25-text);
  border-radius: var(--border-radius);
  & + & {
    margin-top: 1em;
  }
  &:hover {
    box-shadow: 0 0 0 2px var(--primary-25) inset;
    background-color: transparent;
  }
  &__name {
    font-size: 1.5em;
  }
  &__delete {
    position: absolute;
    right: 0;
    top: 0;
    margin: calc(var(--space) / 2);
  }
  &__details {
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    gap: 1em;
    margin-top: 1em;
  }
  &__title {
    font-weight: bold;
    font-size: 0.65em;
    opacity: 0.5;
    text-transform: uppercase;
  }
  &__title,
  &__description {
    // padding: 0.5rem;
    white-space: nowrap;
  }
  &__description {
    padding-top: 0;
  }
}
</style>
