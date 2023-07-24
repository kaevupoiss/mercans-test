<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
});

const icon = defineAsyncComponent(() =>
  import(`@/assets/icons/${props.name}.svg`)
);
</script>

<template>
  <component :is="icon" :height="height" :width="width" />
</template>