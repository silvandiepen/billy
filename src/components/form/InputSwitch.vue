<template>
	<div :class="inputClasses">
		<div :class="bemm('control-container')">
			<Button
				v-for="(v, idx) in formattedValues"
				:key="idx"
				:class="bemm('option', ['', v.label])"
				:size="ButtonSettings.Size.SMALL"
				:color="internalValue === v.value ? ButtonSettings.Color.PRIMARY : ButtonSettings.Color.ACCENT"
				:icon="v.icon"
				@click="handleClick(v.value)"
			>
				{{ v.label }}

				<span
					v-if="v.count"
					:class="bemm('option-count')"
				>
					{{ v.count }}
				</span>
			</Button>
		</div>
		<label
			v-if="label"
			for="test"
			:class="bemm('label')"
		>
			{{ label }}
		</label>
	</div>
</template>

<script lang="ts" setup>
import { type PropType, computed, onMounted, ref, watch } from 'vue';
import { useBemm } from 'bemm';

import { ButtonSettings } from '@/components/Button/Button.model';
import { type SwitchOption } from './InputSwitch.model';
import { Size } from '@/types';

const bemm = useBemm('input-switch');

const props = defineProps({
	label: {
		type: String,
		default: '',
	},
	options: {
		type: Array as PropType<string[] | SwitchOption[]>,
		default: () => [],
	},
	value: {
		type: String as PropType<string | number | boolean>,
		default: '',
	},
	size: {
		type: String as PropType<Size>,
		default: Size.MEDIUM,
	},
});

onMounted(() => {
	if (props.options.length === 0) {
		console.warn('InputSwitch: No options provided');
	}
});

const modelValue = defineModel({
	type: String as PropType<string | number | boolean>,
});
const emit = defineEmits(['update:modelValue', 'change']);
const internalValue = ref(props.value || modelValue.value);
const emitChange = () => {
	emit('change', internalValue.value);
	emit('update:modelValue', internalValue.value);
};

watch(() => props.value, (newValue) => {
	internalValue.value = newValue;
});

watch(() => modelValue.value, (newValue) => {
	internalValue.value = newValue;
});

const formattedValues = computed<SwitchOption[]>(() => {
	if (typeof props.options[0] == 'string') {
		return props.options.map((v) => {
			return {
				label: v,
				value: v,
				icon: null,
			} as SwitchOption;
		});
	}
	else if (typeof props.options[0] == 'object' && props.options[0].value && props.options[0].label) {
		return props.options as SwitchOption[];
	}
	else {
		return [];
	}
});

const handleClick = (value: string) => {
	internalValue.value = value;
	emit('update:modelValue', value);
	emitChange();
};

const inputClasses = computed(() => {
	return [
		bemm(),
		bemm('', props.size),
	];
});
</script>

<style lang="scss" src="./Form.scss"></style>
