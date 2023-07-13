<template>
  <button @click="sendEvent" class="btn" v-bind="$attrs">
    <slot></slot>
  </button>
</template>
<script setup>
  const emits = defineEmits(['event-click'])

  const sendEvent = () => {
    emits('event-click')
  }
</script>