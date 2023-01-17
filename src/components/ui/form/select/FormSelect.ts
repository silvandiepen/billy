import { useBemm } from "bemm";
import { defineComponent, ref, PropType, computed } from "vue";
import { useInputValidator } from "../form.helpers";
import FormError from "../error/FormError.vue";

interface FormSelectOption {
  label: string;
  value: string;
}

export default defineComponent({
  components: { FormError },
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
    options: {
      type: Array as PropType<FormSelectOption[]>,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const bemm = useBemm("form-select");
    const validators = ref<Function[]>([]);

    const { input, errors } = useInputValidator(
      props.modelValue,
      validators.value,
      (value: string) => emit("update:modelValue", value)
    );

    const hasValue = computed(() => input.value.length > 0);

    const mainClasses = computed(() => [
      bemm(),
      "form-field",
      hasValue && bemm("", "has-value"),
    ]);

    return {
      mainClasses,
      input,
      errors,
      bemm,
    };
  },
});
