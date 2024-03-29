<template>
  <component :is="tag" :class="bemm()">
    <UIButton
      icon="delete"
      :size="ButtonSize.SMALL"
      :type="ButtonType.ICON"
      :class="bemm('delete')"
      @click="actions.removeEntryAlert(item.id)"
    />

    <div
      :class="bemm('preview')"
      v-if="!isEditting"
      @click="isEditting = !isEditting"
    >
      <template v-for="key in Object.keys(item)" :key="key">
        <div class="id-label" v-if="key == 'id'">{{ item[key] }}</div>
        <dl v-else :class="[bemm('list'), 'data-list']">
          <dt :class="bemm('title')">{{ t(`label.${key}`) }}</dt>
          <dd :class="bemm('detail')">{{ item[key] }}</dd>
        </dl>
      </template>
    </div>
    <!-- {{ item.title }}
    {{ item.description }}
    {{ item.amount }}}
    {{ item.price }}
    {{ item.discount }}
    {{ item.tax }} -->

    <div :class="bemm('form')" v-if="isEditting">
      <FormText :label="t('label.title')" v-model="item.title" />
      <FormText :label="t('label.description')" v-model="item.description" />
      <FormNumber :label="t('label.amount')" v-model="item.amount" />
      <FormNumber :label="t('label.price')" v-model="item.price" />
      <FormNumber :label="t('label.discount')" v-model="item.discount" />
      <FormNumber
        :label="t('vat')"
        :placeholder="`${invoice.settings.tax}`"
        v-model="item.tax"
      />
      <UIButton @click="isEditting = !isEditting">{{ t("done") }}</UIButton>
    </div>
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useI18n } from "vue-i18n";
import { useBemm } from "bemm";

import { createAlert } from "../ui/Alert";
import { InvoiceItem } from "../Invoice";

import { removeEntry } from "../../composables/state";

import {
  ButtonType,
  ButtonSize,
  ButtonComponent,
  FormTextComponent,
  FormNumberComponent,
} from "../ui";

import { getInvoice } from "../../composables/state";

export default defineComponent({
  components: {
    UIButton: ButtonComponent,
    FormText: FormTextComponent,
    FormNumber: FormNumberComponent,
  },
  props: {
    item: {
      type: Object as PropType<InvoiceItem>,
      default: () => {},
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const { t } = useI18n({});
    const bemm = useBemm("invoice-form-item");

    const isEditting = ref(false);

    // let instance: any = null;

    onMounted(() => {
      // instance = getCurrentInstance();

      if (props.item.title == "" && props.item.description == "") {
        isEditting.value = true;
      }
    });

    const removeEntryAlert = (id: string) => {
      removeEntry(id);

      // createAlert(instance, {
      //   title: "Are you sure?",
      //   description: "You are deleting ",
      //   buttons: [
      //     {
      //       label: "Sure",
      //       action: () => removeEntry(id),
      //     },
      //     {
      //       label: "No",
      //       action: () => {},
      //     },
      //   ],
      // });
    };

    return {
      bemm,
      t,
      ButtonType,
      ButtonSize,
      actions: {
        removeEntryAlert,
      },
      invoice: getInvoice.value,
      isEditting,
    };
  },
});
</script>
<style lang="scss">
// @import "@sil/themer/use";

.invoice-form-item {
  &__delete {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    border-radius: 50%;
    transform: translate(50%, -50%) scale(0);
    transition: transform 0.25s ease-in-out;
  }
  &:hover {
    .invoice-form-item__delete {
      transform: translate(50%, -50%) scale(1);
    }
  }
  &__preview {
    @include displayBlock();
  }
}
</style>
