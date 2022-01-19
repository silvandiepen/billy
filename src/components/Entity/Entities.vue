<template>
  <div :class="style.bem()">
    <h2>{{ t(entity) }}</h2>
    <ul :class="style.bem('list')">
      <Entity
        :class="style.bem('item')"
        v-for="(data, index) in entities"
        :key="index"
        :entityData="data"
        tag="li"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Style } from "@sil/tools";
import { useI18n } from "vue-i18n";

import {
  ButtonComponent,
  ButtonGroupComponent,
  ButtonBarComponent,
  ButtonAlign,
  ButtonColor,
} from "../ui";

import EntityComponent from "./Entity.vue";
import { getSavedClients, getSavedSellers, loadEntity } from "./Entity.helpers";
import { Entity } from "./Entity.model";

export default defineComponent({
  props: {
    entity: {
      type: String as PropType<Entity>,
      default: "",
      required: true,
    },
  },
  components: {
    Knop: ButtonComponent,
    Knoppen: ButtonGroupComponent,
    KnoppenBar: ButtonBarComponent,
    Entity: EntityComponent,
  },

  setup(props) {
    const { t } = useI18n({});

    const style = new Style("entities");

    const entities = computed(() => {
      return props.entity === Entity.CLIENT
        ? getSavedClients.value
        : getSavedSellers.value;
    });

    return {
      t,
      Entity,
      style,
      ButtonColor,
      entities,
      loadClients: loadEntity(props.entity),
      ButtonAlign,
    };
  },
});
</script>
<style lang="scss">
@import "@sil/themer/use";

.entities {
  background-color: variable(foreground);
  color: variable(foregroundText);
  // width: calc(100% - calc(320px));
  padding: calc(var(--space) / 2);
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__item {
    padding: 0;
    margin-top: 1em;
    align-items: flex-start;
  }
}
</style>
