<template>
  <component :is="tag" :class="bemm()">
    <UIButton
      icon="delete"
      :size="ButtonSize.SMALL"
      :type="ButtonType.ICON"
      :class="bemm('delete')"
      @click="actions.removeNote(item.id)"
    />
    <div
      :class="bemm('preview')"
      v-if="!isEditting"
      @click="isEditting = !isEditting"
    >
      <strong>{{ item.title }}</strong
      ><br />
      <div v-html="description"></div>
    </div>
    <div :class="bemm('form')" v-if="isEditting">
      <FormText :label="t('label.title')" v-model="item.title" />
      <FormTextArea
        :label="t('label.description')"
        v-model="item.description"
      />
      <UIButton @click="isEditting = !isEditting">{{ t("done") }}</UIButton>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useBemm } from "bemm";

import { InvoiceNote } from "../Invoice";

import {
  ButtonType,
  ButtonSize,
  ButtonComponent,
  FormTextComponent,
  FormNumberComponent,
  FormTextAreaComponent,
} from "../ui";

import { getInvoice, removeNote } from "../../composables/state";
import { renderMarkdown } from "../../services";

export default defineComponent({
  components: {
    UIButton: ButtonComponent,
    FormText: FormTextComponent,
    FormNumber: FormNumberComponent,
    FormTextArea: FormTextAreaComponent,
  },
  props: {
    item: {
      type: Object as PropType<InvoiceNote>,
      default: () => {},
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const { t } = useI18n({});
    const bemm = useBemm("invoice-form-note");
    const isEditting = ref(false);

    onMounted(() => {
      if (props.item.title == "" && props.item.description == "") {
        isEditting.value = true;
      }
    });

    const description = computed(() => {
      return renderMarkdown(props.item.description);
    });

    return {
      bemm,
      t,
      description,
      ButtonType,
      ButtonSize,
      actions: {
        removeNote,
      },
      invoice: getInvoice.value,
      isEditting,
    };
  },
});
</script>
<style lang="scss">
.invoice-form-note {
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
    .invoice-form-note__delete {
      transform: translate(50%, -50%) scale(1);
    }
  }
  &__preview {
    @include displayBlock();
  }
}
</style>
