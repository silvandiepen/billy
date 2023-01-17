import { useBemm } from "bemm";
import { defineComponent, ref, computed } from "vue";
import { useInputValidator, minLength, maxLength } from "../form.helpers";
import FormError from "../error/FormError.vue";

export default defineComponent({
  components: {
    FormError,
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
    const bemm = useBemm("form-number");
    const validators = ref<Function[]>([]);

    if (props.minLength > 0) validators.value.push(minLength(props.minLength));
    if (props.maxLength > 0) validators.value.push(maxLength(props.maxLength));

    const { input, errors } = useInputValidator(
      `${props.modelValue}`,
      validators.value,
      (value: string) => {
        emit("update:modelValue", parseFloat(value));
      }
    );

    const hasValue = computed(() => input.value.length > 0);

    const mainClasses = computed(() => [
      bemm(),
      "form-field",
      hasValue && bemm("", "has-value"),
    ]);

    return {
      bemm,
      mainClasses,
      input,
      errors,
    };
  },
});
