import { defineComponent, ref } from "vue";
import { useInputValidator, minLength, maxLength } from "../form.helpers";
import FormErrors from "../error/FormError.vue";
import { bem } from "../../../../composables";

export default defineComponent({
  components: {
    FormErrors,
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
    const validators = ref<Function[]>([]);

    if (props.minLength > 0) validators.value.push(minLength(props.minLength));
    if (props.maxLength > 0) validators.value.push(maxLength(props.maxLength));

    const { input, errors } = useInputValidator(
      props.value,
      validators.value,
      (value: string) => emit("update:modelValue", value)
    );

    return {
      block: "form-text",
      input,
      errors,
      bem,
    };
  },
});
