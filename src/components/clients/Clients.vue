<template>
  <div :class="bem(block)">
    <h2>Clients</h2>
    <ul :class="bem(block, 'list')">
      <Client
        v-for="(client, index) in savedClients"
        :key="index"
        :client="client"
        tag="li"
      />
    </ul>
    <KnoppenBar :align="ButtonAlign.CENTER">
      <Knop :color="ButtonColor.SECONDARY" @click="loadClients">
        Load Clients
      </Knop>
    </KnoppenBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { bem } from "../../composables";

import Button from "../ui/button/Button.vue";
import ButtonGroup from "../ui/button/ButtonGroup.vue";
import ButtonBar from "../ui/button/ButtonBar.vue";
import Client from "./Client.vue";

import { ButtonAlign } from "../ui/button";

import { savedClients, loadClients } from "./Clients.helpers";
import { ButtonColor } from "../ui/button";

export default defineComponent({
  components: {
    Knop: Button,
    Knoppen: ButtonGroup,
    KnoppenBar: ButtonBar,
    Client,
  },
  setup() {
    return {
      block: "clients",
      bem,
      ButtonColor,
      savedClients,
      loadClients,
      ButtonAlign,
    };
  },
});
</script>
<style lang="scss">
.clients {
  width: 320px;
  max-width: 100%;
  padding: calc(var(--space) / 2);
  &__list {
    display: flex;
    flex-direction: column;
  }
}
</style>
