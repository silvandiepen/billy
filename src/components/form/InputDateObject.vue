<!-- InputDateObject.vue -->
<template>
	<InputBase
		:model-value="dateToString(modelValue)"
		:block="block"
		:label="label"
		:error="error"
		@update:model-value="handleChange"
	>
		<template #control="{ id, value: inputValue, disabled }">
			<div :class="bemm('wrapper')">
				<input
					:id="id"
					:value="inputValue"
					type="date"
					:min="minDateString"
					:max="maxDateString"
					:disabled="disabled"
					:class="bemm('control')"
					@input="handleDateInput"
				>
			</div>
		</template>
	</InputBase>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBemm } from 'bemm';
import InputBase from './InputBase.vue';

interface Props {
	modelValue?: Date;
	label?: string;
	error?: string[];
	minDate?: Date;
	maxDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	label: '',
	error: () => [],
	minDate: undefined,
	maxDate: undefined,
});

const emit = defineEmits<{
	'update:modelValue': [value: Date | undefined];
	change: [value: Date | undefined];
}>();

const block = 'input-date-object';
const bemm = useBemm(block);

// Convert Date to YYYY-MM-DD string format for input
const dateToString = (date: Date | undefined): string => {
	if (!date) return '';
	return date.toISOString().split('T')[0];
};

// Convert min/max dates to string format for input
const minDateString = computed(() => dateToString(props.minDate));
const maxDateString = computed(() => dateToString(props.maxDate));

const handleChange = (value: string) => {
	if (!value) {
		emit('update:modelValue', undefined);
		emit('change', undefined);
		return;
	}
	const newDate = new Date(value);
	newDate.setHours(12, 0, 0, 0);
	emit('update:modelValue', newDate);
	emit('change', newDate);
};

const handleDateInput = (event: Event) => {
	const input = event.target as HTMLInputElement;
	handleChange(input.value);
};

</script>

<style lang="scss">
@use "Form" as form;

.input-date-object {
	@include form.inputBase();

	&__wrapper {
		position: relative;
		width: 100%;
	}

	&__control {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-background);
		color: var(--color-text);

		&:focus {
			outline: none;
			border-color: var(--color-primary);
		}
	}
}
</style>
