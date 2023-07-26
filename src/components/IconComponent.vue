<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

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
  rotation: {
    type: Number,
    default: 0,
  }
});

const deg = computed(() => props.rotation + 'deg');

const icon = defineAsyncComponent(() =>
  import(`@/assets/icons/${props.name}.svg`)
);
</script>

<template>
  <component :is="icon" :height="height" :width="width" />
</template>

<style scoped>
svg {
  rotate: v-bind(deg);

  transition: 0.2s ease-out;
}
</style>