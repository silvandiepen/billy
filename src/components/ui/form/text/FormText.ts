import { useBemm } from "bemm";
import { defineComponent, ref, computed, watchEffect } from "vue";

import { useInputValidator, minLength, maxLength } from "../Form.helpers";
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
    const bemm = useBemm("form-text");

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
      bemm(),
      "form-field",
      hasValue.value ? bemm("", "has-value") : "",
    ]);

    return {
      bemm,
      input,
      errors,
      mainClasses,
    };
  },
});
