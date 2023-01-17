<template>
  <component :is="tag" :class="bemm()">
    <header :class="bemm('header')">
      <div :class="bemm('header-container')">
        <h3 :class="bemm('subheader')">{{ t(entity) }}</h3>
        <div :class="bemm('actions')">
          <UIButtonGroup>
            <UIButton
              @click="actions.update"
              v-if="showUpdate"
              :size="ButtonSize.SMALL"
              :type="ButtonType.GHOST"
            >
              Update
            </UIButton>
            <UIButton
              @click="actions.add"
              v-if="showAdd"
              :size="ButtonSize.SMALL"
              :type="ButtonType.GHOST"
            >
              Save</UIButton
            >
            <UIButton
              @click="actions.addNew"
              v-if="showAddNew"
              :size="ButtonSize.SMALL"
              :type="ButtonType.GHOST"
            >
              Save as New</UIButton
            >
            <UIButton
              @click="actions.pickEntity"
              :size="ButtonSize.SMALL"
              :type="ButtonType.GHOST"
            >
              {{ t("load") }} {{ t(entity) }}</UIButton
            >
          </UIButtonGroup>
        </div>
      </div>
    </header>
    <div :class="bemm('view')" v-if="!isEditting">
      <InvoiceEntityComponent
        :isForm="true"
        @click="isEditting = true"
        :entity="entity"
      />
    </div>
    <div :class="bemm('form')" v-if="isEditting">
      <UIFormText
        :label="t('label.companyName')"
        v-model="entityData.companyName"
      />
      <UIFormText
        :label="t('label.firstName')"
        v-model="entityData.firstName"
      />
      <UIFormText :label="t('label.lastName')" v-model="entityData.lastName" />
      <UIFormText
        v-if="entityData.companyName"
        :label="t('label.taxId')"
        v-model="entityData.taxId"
      />
      <hr />
      <UIFormText :label="t('label.street')" v-model="entityData.street" />
      <UIFormText :label="t('label.number')" v-model="entityData.number" />
      <UIFormText
        :label="t('label.additional')"
        v-model="entityData.additional"
      />
      <UIFormText
        :label="t('label.postalcode')"
        v-model="entityData.postalcode"
      />
      <UIFormText :label="t('label.city')" v-model="entityData.city" />
      <UIFormText :label="t('label.country')" v-model="entityData.country" />
      <hr />
      <UIFormText :label="t('label.phone')" v-model="entityData.phone" />
      <UIFormText :label="t('label.email')" v-model="entityData.email" />
      <UIFormText :label="t('label.website')" v-model="entityData.website" />
      <hr />
      <UIFormText
        :label="t('label.bankAccount')"
        v-model="entityData.bank.account"
      />
      <UIFormText :label="t('label.bankName')" v-model="entityData.bank.name" />
      <UIFormText
        :label="t('label.bankSwift')"
        v-model="entityData.bank.swift"
      />
      <UIFormText
        :label="t('label.bankBeneficiary')"
        v-model="entityData.bank.beneficiary"
      />
      <UIButton @click="isEditting = !isEditting">{{ t("done") }}</UIButton>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBemm } from "bemm";

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
  ButtonSize,
  ButtonType,
} from "../ui";

import { InvoiceEntityComponent } from "../Invoice";
import { openEntityModal } from "../../services";

export default defineComponent({
  components: {
    UIFormText: FormTextComponent,
    UIFormNumber: FormNumberComponent,
    UIButton: ButtonComponent,
    UIButtonGroup: ButtonGroupComponent,
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
    const bemm = useBemm("invoice-form-entity");

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

    const pickEntity = () => {
      console.log(props.entity);
      openEntityModal(props.entity);
    };

    return {
      bemm,
      t,
      isEditting,
      showUpdate,
      showAdd,
      showAddNew,
      actions: {
        update,
        add,
        addNew,
        pickEntity,
      },
      ButtonSize,
      ButtonType,
    };
  },
});
</script>
<style lang="scss">
.invoice-form-entity {
  &__header {
    color: variable(primary);

    position: relative;
    width: calc(100% + #{variable(space)});

    &-container {
      display: flex;
      justify-content: space-between;
      overflow: scroll;
      gap: variable(space);
      padding: variable(space) variable(space) variable(space) 0;
    }

    &::after {
      content: "";
      display: block;
      z-index: 10;
      position: absolute;
      right: 0;
      top: 0;
      background-image: linear-gradient(
        to right,
        transparent,
        #{variable(foreground)}
      );
      width: #{variable(space)};
      height: 100%;
    }
  }
}
</style>
