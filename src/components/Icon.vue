<template>
	<!-- eslint-disable vue/no-v-html -->
	<div
		:class="[bemm(), bemm('', [props.name, props.animation ? 'animated' :''])]"
		v-html="iconData"
	/>
	<!-- eslint-enable -->
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
import { onMounted, ref, watch, type PropType } from 'vue';
import { getIcon } from 'open-icon';
import { type Icons } from '@/types';

const bemm = useBemm('icon');

const props = defineProps({
	name: {
		type: String as PropType<Icons>,
		default: '',
	},
	animation: {
		type: Boolean,
	},
});

const iconData = ref();

onMounted(async () => {
	const iconLoadData = await getIcon(props.name as Icons);
	iconData.value = iconLoadData;
});

watch(
	() => props.name,
	async () => {
		const iconLoadData = await getIcon(props.name as Icons);
		iconData.value = iconLoadData;
	},
);
</script>

<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  display: block;

	--icon-fill: var(--background);

  svg {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;

    path,
    circle,
    rect,
    polygon,
    polyline,
    ellipse,
    line {
      stroke: currentColor;
      fill: currentColor;
    }
  }
}
</style>
