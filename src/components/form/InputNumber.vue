<!-- InputNumber.vue -->
<template>
	<InputBase
		v-if="model !== undefined"
		v-model="model"
		:block="block"
		:label="label"
		type="number"
		:min="min"
		:max="max"
		:step="step"
		@change="$emit('change', $event)"
		@touched="$emit('touched', $event)"
	/>
	<InputBase
		v-else
		:value="value"
		:block="block"
		:label="label"
		type="number"
		:min="min"
		:max="max"
		:step="step"
		@change="$emit('change', $event)"
		@touched="$emit('touched', $event)"
	/>
</template>

<script lang="ts" setup>
import InputBase from './InputBase.vue';

const model = defineModel<number>({
	default: undefined,
});

interface Props {
	value?: number;
	label?: string;
	min?: number;
	max?: number;
	step?: number;
}

withDefaults(defineProps<Props>(), {
	value: undefined,
	label: '',
	min: undefined,
	max: undefined,
	step: 1,
});

defineEmits<{
	change: [value: number];
	touched: [value: boolean];
}>();

const block = 'input-number';
</script>

<style lang="scss">
@use "Form" as form;

.input-number {
  @include form.inputBase();
}
</style>
