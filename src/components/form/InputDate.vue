<!-- InputDate.vue -->
<template>
	<InputBase v-if="model !== undefined" v-model="model" :block="block" :label="label" :error="allErrors"
		@change="handleChange" @touched="$emit('touched', $event)">
		<template #control="{ id, value: inputValue, disabled, handleInput }">
			<div :class="bemm('wrapper')">
				<input :id="`${id}-hidden`" ref="hiddenInput" :value="inputValue" type="date" :min="minDate" :max="maxDate"
					:disabled="disabled" class="visually-hidden" @input="handleInput">
				<input :id="id" ref="displayInput"
					:value="formatDate({ dateString: inputValue || '', displayFormat: displayFormat, customFormat: customFormat })"
					:class="bemm('control')" type="text" :disabled="disabled" readonly @click="openDatePicker">
			</div>
		</template>
	</InputBase>
	<InputBase v-else :value="value" :block="block" :label="label" :error="allErrors" @change="handleChange"
		@touched="$emit('touched', $event)">
		<template #control="{ id, value: inputValue, disabled, handleInput }">
			<div :class="bemm('wrapper')">
				<input :id="`${id}-hidden`" ref="hiddenInput" :value="inputValue" type="date" :min="minDate" :max="maxDate"
					:disabled="disabled" class="visually-hidden" @input="(e) => {
						handleInput(e);
						emit('change', (e.target as HTMLInputElement).value);
					}">
				<input :id="id" ref="displayInput" :value="formatDate({
					dateString: inputValue || '',
					displayFormat: displayFormat,
					customFormat: customFormat
				})" :class="bemm('control')" type="text" :disabled="disabled" readonly @click="openDatePicker">
			</div>
		</template>
	</InputBase>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useBemm } from 'bemm';
import InputBase from './InputBase.vue';

import { formatDate } from "./Form.utils";

const model = defineModel<string>({
	default: undefined,
});

interface Props {
	value?: string;
	label?: string;
	error?: string[];
	minDate?: string | Date;
	maxDate?: string | Date;
	disallowPastDates?: boolean;
	disallowFutureDates?: boolean;
	displayFormat?: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'dd-mm-yyyy' | 'mm-dd-yyyy' | 'yyyy-mm-dd' | 'long' | 'short' | 'medium';
	customFormat?: string;
}

const props = withDefaults(defineProps<Props>(), {
	value: '',
	label: '',
	error: () => [],
	minDate: undefined,
	maxDate: undefined,
	disallowPastDates: false,
	disallowFutureDates: false,
	displayFormat: 'yyyy-mm-dd',
	customFormat: undefined,
});

const emit = defineEmits<{
	change: [value: string];
	touched: [value: boolean];
}>();

const block = 'input-date';
const bemm = useBemm(block);
const hiddenInput = ref<HTMLInputElement>();
const displayInput = ref<HTMLInputElement>();

const minDate = computed(() => {
	if (props.minDate) {
		return props.minDate instanceof Date
			? props.minDate.toISOString().split('T')[0]
			: props.minDate;
	}
	if (props.disallowPastDates) {
		return new Date().toISOString().split('T')[0];
	}
	return undefined;
});

const maxDate = computed(() => {
	if (props.maxDate) {
		return props.maxDate instanceof Date
			? props.maxDate.toISOString().split('T')[0]
			: props.maxDate;
	}
	if (props.disallowFutureDates) {
		return new Date().toISOString().split('T')[0];
	}
	return undefined;
});

const blockErrors = ref<string[]>([]);
const allErrors = computed(() => {
	return [...blockErrors.value, ...(props.error || [])];
});

const validateDate = (value: string) => {
	blockErrors.value = [];

	if (!value) return;

	const selectedDate = new Date(value);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	if (props.disallowPastDates && selectedDate < today) {
		blockErrors.value.push('Please select a future date');
	}

	if (props.disallowFutureDates && selectedDate > today) {
		blockErrors.value.push('Please select a past date');
	}

	if (props.minDate && new Date(value) < new Date(props.minDate)) {
		blockErrors.value.push(`Date must be after ${formatDate({
			dateString: props.minDate.toString(),
			customFormat: props.customFormat,
			displayFormat: props.displayFormat,
		})}`);
	}

	if (props.maxDate && new Date(value) > new Date(props.maxDate)) {
		blockErrors.value.push(`Date must be before ${formatDate({
			dateString: props.maxDate.toString(),
			customFormat: props.customFormat,
			displayFormat: props.displayFormat,
		})}`);
	}
};

const handleChange = (value: string) => {
	validateDate(value);
	emit('change', value);
};

const openDatePicker = () => {
	hiddenInput.value?.showPicker();
};

watch(
	() => model.value ?? props.value,
	(newValue) => {
		if (newValue) validateDate(newValue);
	},
);
</script>

<style lang="scss">
@use "Form" as form;

.input-date {
	@include form.inputBase();

	&__wrapper {
		position: relative;
		width: 100%;
	}

	&__control {
		width: 100%;
		cursor: pointer;
	}
}

.visually-hidden {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}
</style>
