<template>
  <div class="container">
    <y-echarts :options="chartOptions" theme="dark" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { EChartsOption } from "echarts";

const chartOptions = ref<EChartsOption>({
  title: {
    text: "示例图表",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
});
</script>

<style scoped></style>
