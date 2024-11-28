<template>
	<div :class="blockClasses">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { type PropType, computed } from 'vue';
import { useBemm } from 'bemm';
import type {
	ChipGroupAlign,
	ChipGroupDirection,
	ChipGroupType,
} from './ChipGroup.model';

const bemm = useBemm('chip-group');

const props = defineProps({
	align: {
		type: String as PropType<ChipGroupAlign>,
		default: 'left',
	},
	direction: {
		type: String as PropType<ChipGroupDirection>,
		default: 'horizontal',
	},
	type: {
		type: String as PropType<ChipGroupType>,
		default: 'normal',
	},
});

const blockClasses = computed(() => {
	const classes = [bemm()];

	classes.push(bemm('', props.align));
	classes.push(bemm('', props.direction));
	classes.push(bemm('', props.type));

	return classes;
});
</script>

<style lang="scss">
.chip-group {
  display: flex;
  gap: calc(var(--space) / 2);
  flex-wrap: wrap;

  &--horizontal {
    flex-direction: var(--chip-group-direction, row);
    align-items: center;
    justify-content: flex-start;

    &.chip-group--stack {
      gap: 0;

      .chip:first-child::before {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      .chip:last-child::before {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }
  }

  &--vertical {
    display: flex;
    flex-direction: var(--chip-group-direction, column);
    align-items: flex-start;
    justify-content: flex-start;

    &.chip-group--stack {
      gap: 0;

      .chip {
        width: 100%;
        border-radius: 0;
      }

      .chip:first-child {
        border-top-left-radius: var(--space);
        border-top-right-radius: var(--space);
      }

      .chip:last-child {
        border-bottom-right-radius: var(--space);
        border-bottom-left-radius: var(--spacel);
      }
    }
  }

  &--left {
    justify-content: flex-start;
  }

  &--center {
    justify-content: center;
  }

  &--right {
    justify-content: flex-end;
  }
}
</style>
