import { ref, watch } from "vue";
import { FormFieldError, FormValidatorOutput } from "./form.model";

export const minLength = (min: number): FormValidatorOutput => {
  return (input: string) =>
    input.length < min
      ? { description: `Value must be at least ${min} characters` }
      : null;
};
export const maxLength = (max: number): FormValidatorOutput => {
  return (input: string) =>
    input.length > max
      ? { description: `Value shouldn't be longer than ${max} characters` }
      : null;
};

export const isEmail = (): FormValidatorOutput => {
  const re = /\S+@\S+\.\S+/;
  return (input: string) =>
    re.test(input) ? null : { description: "Must be a valid email address" };
};

export const useInputValidator = (
  startVal: string,
  validators: Function[],
  onValidate: Function
) => {
  const input = ref(startVal);
  const errors = ref<string[]>([]);

  watch(input, (value) => {
    errors.value = validators.map((validator) => validator(value));
    onValidate(value);
  });

  return {
    input,
    errors,
  };
};
