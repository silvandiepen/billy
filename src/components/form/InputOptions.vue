<template>
	<div class="input-options">
		<InputCheckbox
			v-for="option in options"
			:id="createCheckboxId()"
			:key="option.value"
			v-model="optionStates[option.value]"
			:label="option.label"
			@update:model-value="(value: boolean) => updateValues(value)"
		/>
	</div>
</template>

<script lang="ts" setup>
import { useId } from '@sil/id';
import { watch, computed, PropType } from 'vue';
import InputCheckbox from './InputCheckboxSwitch.vue';

interface Option {
	label: string;
	value: string | number;
}

const props = defineProps({
	options: {
		type: Array as PropType<Option[]>,
		required: true,
	},
	value: {
		type: Array as PropType<(string | number)[]>,
		required: false,
		default: () => [],
	},
	id: {
		type: String,
		required: false,
		default: '',
	},
});

const emit = defineEmits<{
	'update:modelValue': [(string | number)[]];
	'change': [(string | number)[], Event?];
}>();

const createCheckboxId = () => {
	return props.id ? `${props.id}-${useId()}` : useId();
};

// Create a reactive object to track the state of each checkbox
const optionStates = computed(() => {
	const states: Record<string | number, boolean> = {};
	props.options.forEach((option: Option) => {
		states[option.value] = props.value.includes(option.value);
	});
	return states;
});

// Update the emitted array whenever any checkbox changes
const updateValues = (value:boolean) => {
	const selectedValues = props.options
		.filter((option: Option) => optionStates.value[option.value])
		.map((option:Option) => option.value);

	emit('update:modelValue', selectedValues);
	emit('change', selectedValues, value as unknown as Event);
};

// Watch for external modelValue changes
watch(() => props.value, () => {
	// The computed optionStates will automatically update
}, { deep: true });
</script>

<style lang="scss" scoped>
.input-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
