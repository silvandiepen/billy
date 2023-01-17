<template>
  <ul v-if="errors" :class="bemm('errors')">
    <li
      :class="bemm('error')"
      v-for="(error, index) in errors"
      :key="index"
    >
      <strong v-if="error.title">{{ error.title }}</strong
      ><br v-if="error.title" />
      {{ error.description }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useBemm } from "bemm";

import { FormFieldError } from "../Form.model"

export default defineComponent({
  props: {
    errors: {
      type: Array as PropType<FormFieldError[]>,
      default: [],
    },
  },
  setup() {
    const bemm = useBemm("form-field");
    return { bemm };
  },
});
</script>
<style lang="scss">
.form-field {
  &__error {
    background-color: var(--error);
    color: var(--error-text);
    padding: 0.5em 0.75em;
    font-size: 0.85em;
    margin: 0.5em 0;

    border-radius: var(--border-radius);
  }
}
</style>
