<template>
	<div :class="inputClasses">
		<label
			v-if="label"
			:for="ids.id"
			:class="bemm('label')"
		>
			{{ label }}
		</label>
		<div
			v-if="description"
			:class="bemm('description')"
		>
			{{ description }}
		</div>
		<div :class="bemm('control-container')">
			<slot
				:id="ids.id"
				name="control"
				:value="internalValue"
				:disabled="disabled"
				:handle-input="handleInput"
				:handle-touch="handleTouch"
				:placeholder="placeholder"
			>
				<!-- Default input control -->
				<input
					:id="ids.id"
					ref="control"
					:value="internalValue"
					:class="bemm('control')"
					:placeholder="placeholder"
					:type="type"
					:disabled="disabled"
					@input="handleInput"
					@click="handleTouch"
				>
			</slot>
			<span
				v-if="success"
				:class="bemm('success')"
			>
				<slot name="success-icon">
					<Icon :name="Icons.CIRCLED_CHECK" />
				</slot>
			</span>
		</div>
		<span
			v-if="instructions"
			:id="ids.describedBy"
			:class="bemm('instructions')"
		>
			{{ instructions }}
		</span>
		<div
			v-if="error.length"
			:class="bemm('errors')"
		>
			<div
				v-for="err in displayErrors"
				:key="err"
				:class="bemm('error')"
			>
				{{ err }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup generic="T">
import { useId } from '@sil/id';
import { ref, reactive, onMounted, computed } from 'vue';
import { useBemm } from '@/utils/bemm';
import { eventBus } from '@/utils/eventBus';
import Icon from '../Icon.vue';
import {
	EventAction,
	EventChannel,
	type EventData,
} from '@/utils/eventBus/eventBus.model';
import { Icons, Size } from '@/types';

const model = defineModel<T>();

type Props = {
	value?: T;
	label?: string;
	placeholder?: string;
	id?: string;
	describedBy?: string;
	description?: string;
	instructions?: string;
	disabled?: boolean;
	onKey?: {
		key: string;
		action: (e: KeyboardEvent) => void;
	};
	error?: string[];
	maxErrors?: number;
	size?: Size;
	success?: boolean;
	type?: string;
	block: string;
};

const props = withDefaults(defineProps<Props>(), {
	label: '',
	placeholder: '',
	id: '',
	describedBy: '',
	description: '',
	instructions: '',
	disabled: false,
	onKey: undefined,
	error: () => [],
	maxErrors: 1,
	size: () => Size.MEDIUM,
	success: false,
	type: 'text',
	value: undefined,
});

const emit = defineEmits<{
	change: [value: T];
	touched: [value: boolean];
}>();

const bemm = useBemm(props.block);
const control = ref<HTMLInputElement>();
const touched = ref(false);

const internalValue = computed(() => model.value ?? props.value);

const displayErrors = computed(() => {
	if (!props.maxErrors) return props.error;
	return props.error.slice(0, props.maxErrors);
});

const handleInput = (event: Event) => {
	const newValue = (event.target as HTMLInputElement).value as T;
	if (model.value !== undefined) {
		model.value = newValue;
	}
	emit('change', newValue);
};

const handleTouch = () => {
	touched.value = true;
	emit('touched', touched.value);
};

const ids = reactive({
	id: props.id || `${props.block}-${useId()()}`,
	describedBy: props.describedBy || `${props.block}-${useId()()}-description`,
});

const registerKeyAction = () => {
	if (!control.value || !props.onKey) return;
	control.value.addEventListener('keydown', (e: KeyboardEvent) => {
		if (props.onKey && props.onKey.key) {
			if (e.key === props.onKey.key) props.onKey.action(e);
		}
	});
};

onMounted(() => {
	if (props.onKey) {
		registerKeyAction();
	}

	eventBus.on(EventChannel.FORM, (p) => {
		const { data, action } = p as EventData;
		if (data.id !== ids.id) return;
		if (action == EventAction.FOCUS && control.value) {
			control.value.focus();
		}
	});
});

const inputClasses = computed(() => {
	return [bemm(), bemm('', props.size)];
});
</script>
