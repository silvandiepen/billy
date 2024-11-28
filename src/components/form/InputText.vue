<!-- TextInput.vue -->
<template>
	<InputBase
		v-if="model !== undefined"
		v-model="model"
		:block="block"
		:label="label"
		@change="$emit('change', $event)"
		@touched="$emit('touched', $event)"
	/>
	<InputBase
		v-else
		:value="value"
		:block="block"
		:label="label"
		@change="$emit('change', $event)"
		@touched="$emit('touched', $event)"
	/>
</template>

<script lang="ts" setup>
import InputBase from './InputBase.vue';

const model = defineModel<string>({
	default: undefined,
});

defineProps({
	value: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
});

defineEmits(['change', 'touched']);

const block = 'input-text';
</script>

<style lang="scss">
@use "Form" as form;

.input-text {
  @include form.inputBase();
}
</style>
