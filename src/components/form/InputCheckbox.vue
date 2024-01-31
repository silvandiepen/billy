<template>
    <div :class="bemm()">
        <label :class="bemm('label')" v-if="label">
            {{ label }}
        </label>
        <div :class="bemm('control-container')">
            <input :class="bemm('control')" type="checkbox" v-model="value" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useBemm } from 'bemm';
const bemm = useBemm('input-checkbox');

defineProps({
    label: {
        type: String,
        default: ""
    },
})
const value = defineModel()
</script>


<style lang="scss" src="./Form.scss"></style>