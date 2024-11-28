<template>
	<div
		:class="blockClasses"
		:tooltip="!!tooltip"
		:style="`--chip-color: var(--${color});`"
	>
		<div :class="bemm('content')">
			<div
				v-if="count !== undefined"
				:class="bemm('count')"
			>
				{{ count }}
			</div>
			<slot name="pre-content" />
			<Icon
				v-if="icon"
				:name="icon"
				:class="bemm('icon')"
			/>
			<div :class="bemm('label')">
				<slot />
			</div>
			<ToolTip v-if="tooltip">
				{{ tooltip }}
			</ToolTip>
			<slot name="post-content" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
import type { PropType } from 'vue';

import ToolTip from '@/components/ToolTip/ToolTip.vue';
import type { ChipIcon } from './Chip.model';
import type { Colors, Screen } from '@/types';

const bemm = useBemm('chip');

const props = defineProps({
	color: {
		type: String as PropType<Colors>,
		default: undefined,
	},
	icon: {
		type: String as PropType<ChipIcon | undefined>,
		default: undefined,
	},
	tooltip: {
		type: String as PropType<string>,
		default: undefined,
	},
	count: {
		type: Number,
		default: undefined,
	},

	iconHide: {
		type: String as PropType<Screen | undefined>,
		default: undefined,
	},
	labelHide: {
		type: String as PropType<Screen | undefined>,
		default: undefined,
	},
});

const blockClasses = computed(() => {
	return [bemm(), props.color && bemm('', props.color), props.icon && bemm('', props.icon ? 'has-icon' : ''),

		props.iconHide && bemm('', `icon-hide-${props.iconHide}`),
		props.labelHide && bemm('', `label-hide-${props.labelHide}`),

	];
});
</script>

<style lang="scss">
.chip {
  $b: &;
  position: relative;
  display: inline-flex;
  padding: calc(var(--space) / 4) calc(var(--space) / 2);
  min-width: 2em;
  border-radius: calc(var(--border-radius) * 3);
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
  transition: background-color 0.2s;
  flex-shrink: 0;

  background-color: var(--chip-background, none);
  border: 1px solid transparent;
  color: var(--chip-text-color, currentColor);

  --chip-background: color-mix(in srgb, var(--chip-color), transparent 50%);
  --chip-text-color: color-mix(in srgb, var(var(--chip-color)), transparent 0%);
  --chip-border-color:color-mix(in srgb, var(--chip-color), var(--foreground) 25%);
  --chip-count-background: color-mix(in srgb, var(var(--chip-color)), transparent 0%);
  --chip-count-text: var(--foreground);

  [data-contrast-mode] & {
    --chip-background: color-mix(in srgb, var(--background), 1);
    --chip-border-color: color-mix(in srgb, var(var(--chip-color)), 1);
    --chip-text-color: var(--foreground);
    --chip-count-background: color-mix(in srgb, var(var(--chip-color)), .2);
    --chip-count-text: var(--foreground);
  }

  --alpha: 0.1;
  border-color: var(--chip-border-color, color-mix(in srgb, var(--background), currentColor 10%));

  &--has-icon {
    padding: calc(var(--space) / 4) calc(var(--space) / 3 * 2) calc(var(--space) / 4) calc(var(--space) / 4);

  }

  [data-color-mode="dark"] & {
    --chip-text-lightness: 60%;
  }

  [data-color-mode="light"] & {
    --chip-text-lightness: 40%;
  }

  &--label-hide {
    &-mobile {
      @include global.mobile-only() {
        #{$b}__label {
          display: none;
        }
      }
    }

    &-tablet {
      @include global.tablet() {
        #{$b}__label {
          display: none;
        }
      }
    }

    &-desktop {
      @include global.desktop() {
        #{$b}__label {
          display: none;
        }
      }
    }
  }

  &--icon-hide {
    &-mobile {
      @include global.mobile-only() {
        #{$b}__icon {
          display: none;
        }
      }
    }

    &-tablet {
      @include global.tablet() {
        #{$b}__icon {
          display: none;
        }
      }
    }

    &-desktop {
      @include global.desktop() {
        #{$b}__icon {
          display: none;
        }
      }
    }
  }

  &__content {
    display: flex;
    gap: calc(var(--space) / 2);
    align-items: center;
    justify-content: center;
  }

  &__icon {
    font-size: 1.5em;
    line-height: .75em;
    color: var(--chip-icon-color, color-mix(in srgb, var(--background), currentColor 50%));
  }

  &__count {
    background-color: var(--chip-count-background);
    font-weight: bold;
    color: var(--chip-count-text);
    height: 1.5em;
    padding: 0 .5em;

    min-width: 1.5em;
    line-height: 1.5;
    text-align: center;
    border-radius: .75em;
    margin-left: -.125em;
  }
}
</style>
