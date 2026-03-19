<script setup lang="ts">
import { add } from "@jonasenjobana/util";
import { JoJoScene } from "@jonasenjobana/canvas";
import { onMounted, ref } from "vue";
console.log(add(1, 2));
const divRef = ref<HTMLDivElement>();
onMounted(() => {
  const scene = new JoJoScene(divRef.value as HTMLDivElement, {
    width: 800,
    height: 600,
  });
  console.log("🚀 ~ scene:", scene);
});
</script>

<template>
  <div ref="divRef"></div>
  <ui-button type="primary">Primary Button</ui-button>
  <ui-button type="secondary">Secondary Button</ui-button>
</template>

<style scoped></style>
