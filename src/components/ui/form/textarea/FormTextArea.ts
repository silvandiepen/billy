import { Style } from "@sil/tools";
import { defineComponent, ref, computed, watchEffect } from "vue";

import { useInputValidator, minLength, maxLength } from "../form.helpers";
import FormErrors from "../error/FormError.vue";

export default defineComponent({
  components: {
    FormErrors,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
      default: 0,
    },
  },

  setup(props, { emit }) {
    const style = new Style("form-text-area");

    const validators = ref<Function[]>([]);

    if (props.minLength > 0) validators.value.push(minLength(props.minLength));
    if (props.maxLength > 0) validators.value.push(maxLength(props.maxLength));

    const { input, errors } = useInputValidator(
      props.modelValue,
      validators.value,
      (value: string) => emit("update:modelValue", value)
    );

    const hasValue = ref(false);

    watchEffect(() => {
      hasValue.value = input.value.length > 0;
    });

    const mainClasses = computed(() => [
      style.bem(),
      "form-field",
      hasValue.value ? style.bem("", "has-value") : "",
    ]);

    return {
      style,
      input,
      errors,
      mainClasses,
    };
  },
});
