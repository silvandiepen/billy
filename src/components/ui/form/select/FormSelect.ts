import { defineComponent, ref, PropType } from "vue";
import { useInputValidator } from "../form.helpers";
import { bem } from "../../../../composables";
import FormError from "../error/FormError.vue";

interface FormSelectOption {
  label: string;
  value: string;
}

export default defineComponent({
  components: { FormError },
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
    options: {
      type: Array as PropType<FormSelectOption[]>,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const validators = ref<Function[]>([]);

    const { input, errors } = useInputValidator(
      props.value,
      validators.value,
      (value: string) => emit("update:modelValue", value)
    );

    return {
      block: "form-select",
      input,
      errors,
      bem,
    };
  },
});
