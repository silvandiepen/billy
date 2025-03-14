<template>
  <component
    :is="to ? RouterLink : props.element"
    :to="to"
    :class="blockClasses"
    :tooltip="!!tooltip"
    :disabled="disabled"
    :style="`--button-color: var(--${color})`"
    :type="htmlButtonType === 'auto' ? 'button' : htmlButtonType"
    @click.prevent="$emit('click', $event)"
  >
    <div :class="bemm('container', ['', reverse ? 'direction-reverse' : ''])">
      <span v-if="icon" :class="bemm('icon')">
        <Icon :name="icon" :animation="true" />
      </span>
      <span v-if="hasSlot && type !== ButtonType.ICON_ONLY" :class="bemm('text')">
        <slot />
      </span>
    </div>
    <div v-if="status !== ButtonStatus.IDLE" :class="bemm('status')">
      <Loader v-if="status == ButtonStatus.LOADING" />
      <Icon v-if="status == ButtonStatus.SUCCESS" :name="Icons.CHECK_M" :animation="true" />
      <Icon v-if="status == ButtonStatus.ERROR" :animation="true" :name="Icons.MULTIPLY_M" />
    </div>
    <Chip v-if="count && count > -1" :color="ChipColor.TERTIARY" :class="bemm('count')">
      {{ count }}
    </Chip>
    <ToolTip v-if="tooltip.text" :position="tooltip.position">
      {{ tooltip }}
    </ToolTip>
  </component>
</template>

<script lang="ts" setup>
import { type PropType, computed, useSlots } from 'vue';
import { useBemm } from 'bemm';
import Icon from '@/components/Icon.vue';
import { Icons, type Icons as IconsType } from 'open-icon';
import ToolTip from '@/components/ToolTip/ToolTip.vue';
import Loader from '@/components/Loader/Loader.vue';
import Chip from '@/components/Chip/Chip.vue';
import { ChipColor } from '@/components/Chip/Chip.model';
import { ButtonType, ButtonSize, ButtonColor, ButtonStatus } from './Button.model';
import { RouterLink } from 'vue-router';

const bemm = useBemm('button');
const slots = useSlots() as {
  default?: () => any;
};

const emit = defineEmits<{
  click: [event: MouseEvent]
}>();

const props = defineProps({
  icon: {
    type: String as PropType<IconsType | undefined | null>,
    default: '',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: ButtonSize.DEFAULT,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: ButtonType.DEFAULT,
  },
  color: {
    type: String as PropType<ButtonColor>,
    default: ButtonColor.ACCENT,
  },
  count: {
    type: Number,
    default: -1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String as PropType<string>,
    default: '',
  },
  element: {
    type: String as PropType<string>,
    default: 'button',
  },
  tooltip: {
    type: Object as PropType<{
      position: string;
      text: string;
    }>,
    default: {
      position: 'bottom',
      text: '',
    },
  },
  shadow: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  htmlButtonType: {
    type: String as PropType<'auto' | 'submit' | 'reset' | 'button'>,
    default: 'auto',
  },
  hideLabel: {
    type: String as PropType<'mobile' | 'desktop' | 'all' | 'none'>,
    default: 'none',
  },
  status: {
    type: String as PropType<ButtonStatus>,
    default: ButtonStatus.IDLE,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});

const blockClasses = computed(() => {
  const classes = [bemm()];

  if (props.icon) {
    classes.push(bemm('', 'has-icon'));
  }
  classes.push(bemm('', props.size));
  classes.push(bemm('', props.type));
  classes.push(bemm('', props.color));
  if (!hasSlot.value && props.icon) {
    classes.push(bemm('', 'icon-only'));
  }
  if (hasSlot.value && props.icon) {
    classes.push(bemm('', 'text-icon'));
  }

  props.status !== ButtonStatus.IDLE && classes.push(bemm('', `status-${props.status}`));

  return classes;
});

const hasSlot = computed((): boolean => !!slots.default);
</script>

<style lang="scss">
.button {
  $b: &;

  --button-background-color: color-mix(in srgb, var(--button-color), var(--background) 50%);
  --button-background-color--hover: color-mix(in srgb, var(--button-color), var(--background) 80%);
  --button-text-color: color-mix(in srgb, var(--button-color), var(--foreground) 50%);
  --button-text-color--hover: color-mix(in srgb, var(--button-color), var(--foreground) 20%);
  --button-border-color: var(--button-color);

  --button-background-color--ghost: color-mix(in srgb, var(--button-color), var(--background) 0%);
  --button-border-color--ghost: var(--button-color);
  --button-background-color--hover: color-mix(in srgb, var(--button-color), transparent 50%);
  --button-text-color--hover: color-mix(in srgb, var(--button-color), transparent 50%);

  [data-contrast-mode="true"] & {
    --button-border-color: var(--foreground);
    --button-text-color: var(--foreground);
  }

  color: var(--button-text-color, inherit);
  padding: var(--space-s) var(--space);
  position: relative;
  width: var(--button-width, fit-content);
  transition: background-color 0.2s ease-in-out;
  font-size: var(--button-font-size, 1em);
  display: block;
  background-color: transparent;
  border: none;
  white-space: nowrap;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: var(--button-opacity);
    background-color: var(--button-background-color, transparent);
    border: 1px solid var(--button-border-color);

    border-radius: var(--button-border-radius, 1.5em);
    transform: translate(-50%, -50%) scale(1);
    transition: all .3s ease-in-out;
  }

  &--has-icon {
    &:has(#{$b}__container--direction-reverse) {
      padding-right: var(--space-s);
    }

    &:not(:has(#{$b}__container--direction-reverse)) {
      padding-left: var(--space-s);
    }
  }

  &[disabled]:not([disabled="false"]) {
    --button-opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }

  &--shadow {
    box-shadow: var(--drop-shadow);
  }

  &:hover {
    &:before {
      background-color: var(--button-background-color--hover,
          var(--button-background-color));
      opacity: var(--button-opacity--hover, var(--button-opacity));
      border-color: var(--button-border-color--hover, var(--button-border-color));

      transform: translate(-50%, -50%) scale(1.05);
    }

    color: var(--button-text--hover, var(--button-text));
    font-size: var(--button-font-size--hover, var(--button-font-size));
  }

  &:focus {
    outline: none;

    &:before {
      transform: translate(-50%, -50%) scale(.95);

    }
  }

  &__container {
    position: relative;
    z-index: 3;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    gap: var(--space-s);

    &--direction-reverse {
      flex-direction: row-reverse;
    }
  }

  &__count {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    z-index: 2;
  }

  &--hide-label {
    &-mobile {
      #{$b}__text {
        @include global.mobile-only {
          display: none;
        }
      }
    }

    &-desktop {
      #{$b}__text {
        @include global.desktop-up {
          display: none;
        }
      }
    }

    &-all {
      #{$b}__text {
        display: none;
      }
    }
  }

  // Types
  &--ghost {
    --button-border-color: transparent;
    --button-text-color: color-mix(in srgb, var(--button-color), var(--foreground) 50%);
    --button-background-color: transparent;
    --button-background-color--hover: color-mix(in srgb, var(--button-color), var(--background) 50%);
  }

  &--outline {
    --button-border-color: var(--button-color);
    --button-text-color: color-mix(in srgb, var(--button-color), var(--foreground) 50%);
    --button-background-color: transparent;
    --button-background-color--hover: color-mix(in srgb, var(--button-color), var(--background) 50%);
  }

  &:focus-visible {
    outline: 2px dotted var(--primary);
    outline-offset: 3px;
    border-radius: 3em;
  }

  // Sizes
  &--small {
    --button-font-size: 0.75em;
  }

  &--medium {
    --button-font-size: 1em;
  }

  &--large {
    --button-font-size: 1.125em;
  }

  // Icon
  &__icon {
    font-size: var(--button-icon-size, 1.25em);
    color: var(--button-icon-color, inherit);

    width: 1em;
    height: 1em;
    transition: transform 0.3s var(--bezier);

    svg {
      width: 1em;
      height: 1em;

      path {
        fill: currentColor;
      }
    }
  }

  &--icon-only {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: .5em;
    padding: var(--space-s);

  }

  // States

  &--status-success,
  &--status-error,
  &--status-loading {
    .button__container {
      opacity: 0;
      transition: .3s opacity var(--bezier);
    }

    .button__status {
      --loader-color: var(--foreground);

      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--foreground);

      .icon {
        font-size: 2em;
        animation: popInStatus .5s var(--bezier) forwards;
      }

      @keyframes popInStatus {
        from {
          transform: translateY(-100%) scale(0);
          opacity: 0;
        }

        to {
          transform: translateY(0%) scale(1);
          opacity: 1;
        }
      }
    }
  }

  &--status-success {
    --button-color-text: var(--success);
    --button-background-color: color-mix(in srgb, var(--success), var(--background) 50%);
  }

  &--status-error {
    --button-color-text: var(--error);
    --button-background-color: color-mix(in srgb, var(--error), var(--background) 50%);
  }

  &--idle {
    .button__container {
      opacity: 1;
      transition: .3s opacity var(--bezier);
    }
  }
}
</style>
