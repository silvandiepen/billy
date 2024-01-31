<template>
    <component :is="iconComponent"></component>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
// @ts-ignore
import { Icons, getIcon } from "open-icon";


const props = defineProps({
    name: {
        type: String as PropType<Icons>
    }
})

const iconComponent = computed(() => {
    return getIcon(props.name as Icons);
})
</script>
<style lang="scss">
svg{
    path{
        fill: currentColor;
    }
}
</style>