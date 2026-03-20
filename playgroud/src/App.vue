<script setup lang="ts">
import { u_arrClear, u_arrCopy, u_arrIsArray, u_arrNotNone, u_arrLoop, u_arrGroup } from "@llin03/util";
import { onMounted, ref } from "vue";

const testResults = ref<string[]>([]);

const addTestResult = (name: string, result: any) => {
  testResults.value.push(`${name}: ${JSON.stringify(result)}`);
};

onMounted(() => {
  console.log("=== @llin03/util 测试 ===");

  const arr1 = [1, 2, 3, 4, 5];
  addTestResult("u_arrIsArray", u_arrIsArray(arr1));
  addTestResult("u_arrNotNone", u_arrNotNone(arr1));

  const arr2 = [...arr1];
  u_arrClear(arr2);
  addTestResult("u_arrClear", arr2);

  const arr3 = u_arrCopy(arr1);
  addTestResult("u_arrCopy", arr3);

  const arr4 = [
    { id: 1, name: "a", children: [{ id: 11, name: "aa" }] },
    { id: 2, name: "b" }
  ];
  const loopResult = u_arrLoop(arr4, (item) => ({ ...item, name: item.name.toUpperCase() }));
  addTestResult("u_arrLoop", loopResult);

  const arr5 = [
    { category: "fruit", name: "apple" },
    { category: "fruit", name: "banana" },
    { category: "vegetable", name: "carrot" }
  ];
  const groupResult = u_arrGroup(arr5, "category");
  addTestResult("u_arrGroup", groupResult);

  console.log("测试结果:", testResults.value);
});
</script>

<template>
  <div class="test-container">
    <h1>@llin03/util 测试</h1>
    <div class="test-results">
      <div v-for="(result, index) in testResults" :key="index" class="test-item">
        {{ result }}
      </div>
    </div>
    <div ref="divRef"></div>
    <ui-button type="primary">Primary Button</ui-button>
    <ui-button type="secondary">Secondary Button</ui-button>
  </div>
</template>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.test-results {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.test-item {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  font-family: monospace;
}

.test-item:last-child {
  border-bottom: none;
}
</style>
