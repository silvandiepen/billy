<template>
  <component :is="tag" v-if="client" :class="bemm()">
    <div :class="bemm('container')">
      <div :class="bemm('column')">
        <h4 :class="bemm('name')">
          {{ getName(client) }}
        </h4>
        <div class="label">{{ client.id }}</div>
      </div>
      <div :class="bemm('column')">
        <div :class="bemm('details')">
          <template v-for="(key, index) in Object.keys(client)" :key="index">
            <dl :class="bemm('detail')" v-if="client[key]">
              <dt :class="bemm('title')">{{ t(`label.${key}`) }}</dt>
              <dd :class="bemm('description')">{{ client[key] }}</dd>
            </dl>
          </template>
        </div>
      </div>
      <div :class="bemm('column')">
        <Knoppen :align="ButtonAlign.RIGHT">
          <Knop @click="setClientToState(client?.id || '')">Use</Knop>
          <Knop icon="delete" @click="removeClient(client?.id || '')"
            >Delete</Knop
          >
        </Knoppen>
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useBemm } from "bemm";
import { useI18n } from "vue-i18n";

import { getName } from "../../composables";
import { removeEntity, setEntityToState } from "./Entity.helpers";
import { Entity } from "./Entity.model";

import {
  ButtonType,
  ButtonSize,
  ButtonAlign,
  ButtonComponent,
  ButtonGroupComponent,
} from "../ui";
import { InvoiceEntity } from "../Invoice";
import { closeEntityModal } from "../../services";

export default defineComponent({
  components: {
    Knop: ButtonComponent,
    Knoppen: ButtonGroupComponent,
  },
  props: {
    entity: {
      type: String as PropType<Entity>,
      required: true,
    },
    entityData: {
      type: Object as PropType<InvoiceEntity>,
      required: true,
    },
    tag: {
      type: String,
      default: "div",
    },
  },

  setup(props) {
    const { t } = useI18n({});

    const bemm = useBemm("entity");
    const showDetails = ref(false);

    const removeClient = (id: string) => {
      removeEntity(props.entity, id);
    };

    const setClientToState = (id: string) => {
      setEntityToState(props.entity, id);
      closeEntityModal(props.entity);
    };

    return {
      t,
      bemm,
      client: props.entityData,
      removeClient,
      ButtonType,
      ButtonSize,
      ButtonAlign,
      setClientToState,
      showDetails,
      getName,
    };
  },
});
</script>

<style lang="scss">
// @import "@sil/themer/use";
.entity {
  position: relative;
  padding: calc(#{variable(space)} / 2);
  background-color: variable(foreground90);
  color: variable(foreground90Text);
  border-radius: variable(borderRadius);
  width: 100%;

  & + & {
    margin-top: 1em;
  }
  &:hover {
    box-shadow: 0 0 0 2px variable(foreground50) inset;
    background-color: transparent;
  }
  &__container {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__name {
    font-size: 1.5em;
  }
  &__delete {
    position: absolute;
    right: 0;
    top: 0;
    margin: calc(var(--space) / 2);
    transform: translate(50%, -50%) scale(0);
    transition: transform 0.25s ease-in-out;
  }
  &:hover {
    .entity__delete {
      transform: translate(50%, -50%) scale(1);
    }
  }
  &__details {
    flex-wrap: nowrap;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    gap: 1em;
    max-height: 100px;
  }
  &__detail {
    // border: 1px solid red;
  }
  &__title {
    font-weight: bold;
    font-size: 0.65em;
    opacity: 0.5;
    text-transform: uppercase;
  }
  &__title,
  &__description {
    white-space: nowrap;
  }
  &__description {
    padding-top: 0;
  }
  &__column {
    padding: 1em;
    width: 33.33%;
  }
}
</style>
