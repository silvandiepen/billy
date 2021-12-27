import { defineComponent, ref, computed } from "vue";
import { useInputValidator, minLength, maxLength } from "../form.helpers";
import FormError from "../error/FormError.vue";
import { bem } from "../../../../composables";

export default defineComponent({
  components: {
    FormError,
  },
  props: {
    value: {
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
    const block = "form-number";
    const validators = ref<Function[]>([]);

    if (props.minLength > 0) validators.value.push(minLength(props.minLength));
    if (props.maxLength > 0) validators.value.push(maxLength(props.maxLength));

    const { input, errors } = useInputValidator(
      props.value,
      validators.value,
      (value: string) => emit("update:modelValue", value)
    );

    const hasValue = computed(() => input.value.length > 0);

    const mainClasses = computed(() => [
      bem(block),
      "form-field",
      hasValue && bem(block, "", "has-value"),
    ]);

    return {
      block,
      mainClasses,
      input,
      errors,
      bem,
    };
  },
});
