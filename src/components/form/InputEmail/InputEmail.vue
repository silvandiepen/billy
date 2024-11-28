<!-- InputEmail.vue -->
<template>
	<InputBase
		v-if="model !== undefined"
		v-model="model"
		:block="block"
		:label="label"
		:error="allErrors"
		:instructions="instructions"
		type="email"
		@touched="handleTouched"
	>
		<template #control="{ id, value: inputValue, disabled, handleInput, placeholder }">
			<input
				:id="id"
				ref="control"
				:value="inputValue"
				:class="bemm('control')"
				:placeholder="placeholder"
				type="email"
				:disabled="disabled"
				@input="handleInput"
				@blur="handleBlur"
			>
		</template>
	</InputBase>
	<InputBase
		v-else
		:value="value"
		:block="block"
		:label="label"
		:error="allErrors"
		:instructions="instructions"
		type="email"
		@touched="handleTouched"
	>
		<template
			#control="{ id, value: inputValue, disabled, handleInput, placeholder	}"
		>
			<input
				:id="id"
				ref="control"
				:value="inputValue"
				:class="bemm('control')"
				:placeholder="placeholder"
				type="email"
				:disabled="disabled"
				@input="e => {
					handleInput(e);
					debouncedValidation();
					emit('change', (e.target as HTMLInputElement).value);
				}"
				@blur="handleBlur"
			>
		</template>
	</InputBase>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useBemm } from 'bemm';
import InputBase from '../InputBase.vue';
import { isEmail, errors } from '../validation/validation';
import { debounce } from '../Form.utils';

const model = defineModel<string>({
	default: undefined,
});

interface Props {
	required?: boolean;
	value?: string;
	label?: string;
	instructions?: string;
	error?: string[];
	rules?: {
		[key: string]: {
			test: (value: string) => boolean;
			message: string;
		};
	};
}

const isTouched = ref(false);

const props = withDefaults(defineProps<Props>(), {
	value: '',
	label: '',
	instructions: '',
	required: false,
	error: () => [],
	rules: () => ({}),
});

const emit = defineEmits<{
	change: [value: string];
	touched: [value: boolean];
}>();

const block = 'input-email';
const bemm = useBemm(block);
const control = ref();

// Email validation errors
const blockErrors = ref<string[]>([]);
const allErrors = computed(() => {
	return isTouched.value ? [...blockErrors.value, ...(props.error || [])] : [];
});

// const handleInput = (value: string) => {
// 	isTouched.value = true;
// 	checkRules();
// 	emit('change', value);
// };

const handleTouched = (touched: boolean) => {
	isTouched.value = true;
	emit('touched', touched);
};

const debouncedValidation = debounce(() => {
	checkRules();
}, 500);

const handleBlur = () => {
	isTouched.value = true;
	checkRules();
};

const checkRules = () => {
	blockErrors.value = [];
	const value = model.value ?? props.value;

	if (!value && props.required) {
		blockErrors.value.push(errors.EMAIL_REQUIRED);
		return;
	}

	const emailValidation = isEmail(value);
	if (emailValidation.status !== 200) {
		blockErrors.value.push(emailValidation.message);
	}

	if (props.rules) {
		for (const key in props.rules) {
			if (Object.prototype.hasOwnProperty.call(props.rules, key)) {
				const rule = props.rules[key];
				if (rule && !rule.test(value)) {
					blockErrors.value.push(rule.message);
				}
			}
		}
	}
};

// Watch for value changes to validate
watch(
	() => model.value ?? props.value,
	() => checkRules(),
	{ immediate: true },
);
</script>

<style lang="scss">
@use "../Form" as form;

.input-email {
  @include form.inputBase();
}
</style>
