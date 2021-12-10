<template>
  <ul v-if="errors" :class="bem(block, 'errors')">
    <li
      :class="bem(block, 'error')"
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

import { bem } from "../../../../composables";
import { FormFieldError } from "../form.model";

export default defineComponent({
  props: {
    errors: {
      type: Array as PropType<FormFieldError[]>,
      default: [],
    },
  },
  setup() {
    return { block: "form-field", bem };
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
