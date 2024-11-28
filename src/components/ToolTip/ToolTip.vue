<template>
	<div :class="blockClasses">
		<div :class="bemm('text')">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
import { computed, PropType, ref, useSlots, watch } from 'vue';
import { ToolTipPosition } from './ToolTip.model';

const bemm = useBemm('tool-tip');
const slots = useSlots();

const props = defineProps({
	position: {
		type: String as PropType<ToolTipPosition>,
		default: ToolTipPosition.BOTTOM,
	},
	delay: {
		type: Number,
		default: 0.5,
	},
});

const isLarge = ref(false);

watch(() => slots, () => {
	if (slots.default) {
		isLarge.value = !!(slots.default.length > 50);
	}
}, {
	immediate: true,
});

const blockClasses = computed(() => {
	return [bemm(), bemm('', props.position)];
});
</script>

<style lang="scss">
[tooltip] {
  &:hover .tool-tip--bottom {
    animation: showTooltip__bottom 0.3s calc(v-bind(delay) * 1s) forwards;
  }

  &:hover .tool-tip--right {
    animation: showTooltip__right 0.3s calc(v-bind(delay) * 1s) forwards;
  }
}

@keyframes showTooltip__bottom {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0%);
  }
}

@keyframes showTooltip__right {
  to {
    opacity: 1;
    transform: translateX(0%) translateY(-50%);
  }
}

.tool-tip {
  position: absolute;
  opacity: 0;
  background-color: var(--foreground);
  color: var(--background);
  padding: var(--space-s) calc(var(--space) / 3 * 2);
  border-radius: var(--border-radius);
  font-size: 0.75em;
  opacity: 0;
  z-index: 20;
  pointer-events: none;

  white-space: nowrap;

  &--bottom {
    left: 50%;
    top: 100%;
    transform: translateX(-50%) translateY(50%);

    &::before {
      top: 0;
      left: 50%;
      transform: translateY(-50%) translateX(-50%) rotate(-45deg);
      border-top-right-radius: 0.25em;
    }
  }

  &--right {
    left: 100%;
    top: 50%;
    transform: translateX(10%) translateY(-50%);

    &::before {
      top: 50%;
      left: 0%;
      transform: translateY(-50%) translateX(-50%) rotate(-45deg);
      border-top-left-radius: 0.25em;
    }
  }

  &::before {
    content: "";
    width: 0.75em;
    height: 0.75em;
    display: block;
    position: absolute;
    background-color: inherit;
  }

  &__text {
    position: relative;
    z-index: 2;
    width: fit-content;
    display: block;
  }
}
</style>
