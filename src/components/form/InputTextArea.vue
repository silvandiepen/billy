<template>
    <div :class="bemm()">
        <label :class="bemm('label')" v-if="label">
            {{ label }}
        </label>
        <div :class="bemm('control-container')">
        <textarea :class="bemm('control')" :placeholder="placeholder" v-model="value"></textarea>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
const bemm = useBemm('input-textarea');

defineProps({
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    }
})
const value = defineModel({ type: String })
</script>



<style lang="scss" src="./Form.scss"></style>