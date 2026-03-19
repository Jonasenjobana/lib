<template>
    <button class="ui-button" :class="`ui-button--${type}`">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    type: {
        type: String as PropType<'primary' | 'secondary'>,
    }
})
</script>

<style scoped>
.ui-button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.ui-button--primary {
    background-color: #007bff;
    color: #fff;
}

.ui-button--secondary {
    background-color: #6c757d;
    color: #fff;
}

</style>