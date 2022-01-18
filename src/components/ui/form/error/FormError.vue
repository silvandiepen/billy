<template>
  <ul v-if="errors" :class="style.bem('errors')">
    <li
      :class="style.bem('error')"
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
import { Style } from "@sil/tools";

import { FormFieldError } from "../form.model";

export default defineComponent({
  props: {
    errors: {
      type: Array as PropType<FormFieldError[]>,
      default: [],
    },
  },
  setup() {
    const style = new Style("form-field");
    return { style };
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
