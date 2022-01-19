<template>
  <component :is="tag" :class="style.bem()">
    <div :class="style.bem('view')" v-if="!isEditting">
      <InvoiceEntityComponent @click="isEditting = true" :entity="entity" />
    </div>
    <div :class="style.bem('form')" v-if="isEditting">
      <FormText
        :label="t('label.companyName')"
        v-model="entityData.companyName"
      />
      <FormText :label="t('label.firstName')" v-model="entityData.firstName" />
      <FormText :label="t('label.lastName')" v-model="entityData.lastName" />
      <FormText
        v-if="entityData.companyName"
        :label="t('label.taxId')"
        v-model="entityData.taxId"
      />
      <hr />
      <FormText :label="t('label.street')" v-model="entityData.street" />
      <FormText :label="t('label.number')" v-model="entityData.number" />
      <FormText
        :label="t('label.additional')"
        v-model="entityData.additional"
      />
      <FormText
        :label="t('label.postalcode')"
        v-model="entityData.postalcode"
      />
      <FormText :label="t('label.city')" v-model="entityData.city" />
      <FormText :label="t('label.country')" v-model="entityData.country" />
      <hr />
      <FormText :label="t('label.phone')" v-model="entityData.phone" />
      <FormText :label="t('label.email')" v-model="entityData.email" />
      <FormText :label="t('label.website')" v-model="entityData.website" />
      <hr />
      <FormText
        :label="t('label.bankAccount')"
        v-model="entityData.bank.account"
      />
      <FormText :label="t('label.bankName')" v-model="entityData.bank.name" />
      <FormText :label="t('label.bankSwift')" v-model="entityData.bank.swift" />
      <FormText
        :label="t('label.bankBeneficiary')"
        v-model="entityData.bank.beneficiary"
      />
      <KnoppenGroup> </KnoppenGroup>
    </div>
    <div :class="style.bem('actions')">
      <KnoppenGroup>
        <Knop @click="isEditting = !isEditting">
          {{ isEditting ? "Stop Edit" : "Edit" }}
        </Knop>
        <Knop @click="actions.update" v-if="showUpdate"> Update </Knop>
        <Knop @click="actions.add" v-if="showAdd"> Save</Knop>
        <Knop @click="actions.addNew" v-if="showAddNew"> Save as New</Knop>
      </KnoppenGroup>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Style } from "@sil/tools";

import { InvoiceEntity } from "../Invoice";
import {
  Entity,
  updateEntity,
  addEntity,
  entityIDExists,
  isEntityChanged,
  addAsNewEntity,
} from "../Entity";

import { getInvoiceSeller, getInvoiceClient } from "../../composables/state";

import {
  ButtonComponent,
  ButtonGroupComponent,
  FormTextComponent,
  FormNumberComponent,
} from "../ui";

import { InvoiceEntityComponent } from "../Invoice";

export default defineComponent({
  components: {
    FormText: FormTextComponent,
    FormNumber: FormNumberComponent,
    Knop: ButtonComponent,
    KnoppenGroup: ButtonGroupComponent,
    InvoiceEntityComponent,
  },
  props: {
    entity: {
      type: String as PropType<Entity>,
      default: "",
      required: true,
    },
    entityData: {
      type: Object as PropType<InvoiceEntity>,
      default: () => {},
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const { t } = useI18n({});
    const style = new Style("invoice-form-entity");

    const isEditting = ref<Boolean>(false);

    const currentState = computed(() => {
      return props.entity == Entity.CLIENT
        ? getInvoiceClient()
        : getInvoiceSeller();
    });

    const showUpdate = computed(() => {
      // Does exist and is changed
      const exist = entityIDExists(props.entity, currentState.value.id);
      const changed = isEntityChanged(props.entity, currentState.value.id);

      return exist && changed;
    });

    const showAdd = computed(() => {
      // Does not exists.
      const exist = entityIDExists(props.entity, currentState.value.id);

      return !exist;
    });

    const showAddNew = computed(() => {
      // Exists And Changed

      const exist = entityIDExists(props.entity, currentState.value.id);
      const changed = isEntityChanged(props.entity, currentState.value.id);

      return exist && changed;
    });

    const update = () => {
      updateEntity(props.entity);
    };

    const add = () => {
      addEntity(props.entity);
    };

    const addNew = () => {
      addAsNewEntity(props.entity);
    };

    return {
      style,
      t,
      isEditting,
      showUpdate,
      showAdd,
      showAddNew,
      actions: {
        update,
        add,
        addNew,
      },
    };
  },
});
</script>
