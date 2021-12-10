export interface FormFieldError {
  title?: string;
  description: string;
}

export type FormValidatorOutput = (input: string) => null | FormFieldError;
