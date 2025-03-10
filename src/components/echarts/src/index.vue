<template>
  <div ref="chart" :style="{ width: width, height: height }">
    <div v-if="loading" class="echarts-loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import type { Props } from "./types";
import echarts from "../../../utils/echarts";
import debounce from "lodash-es/debounce";

/**
 * ECharts 组件
 * @prop {string} width - 图表宽度，默认 '100%'
 * @prop {string} height - 图表高度，默认 '400px'
 * @prop {EChartsCoreOption} options - ECharts 配置项
 * @prop {string|object} [theme] - 主题配置
 * @prop {boolean} [loading] - 是否显示加载状态
 * @prop {boolean} [autoResize] - 是否自动调整大小
 */

//  withDefaults  作用 ：为 props 设置默认值
const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "400px",
  theme: "default",
  loading: false,
  autoResize: true,
});

const chart = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  try {
    if (chart.value) {
      myChart = echarts.init(chart.value, props.theme);
      myChart.setOption(props.options);

      if (props.loading) {
        myChart.showLoading();
      } else {
        myChart.hideLoading();
      }
    }
  } catch (error) {
    console.error("ECharts initialization failed:", error);
  }
};

// 处理窗口大小变化
const handleResize = debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

// 监听 options 变化
watch(
  () => props.options,
  debounce((newOptions) => {
    if (myChart) {
      myChart.setOption(newOptions);
    }
  }, 300),
  { deep: true }
);

// 监听 loading 状态
watch(
  () => props.loading,
  (isLoading) => {
    if (myChart) {
      if (isLoading) {
        myChart.showLoading();
      } else {
        myChart.hideLoading();
      }
    }
  }
);

onMounted(() => {
  initChart();
  if (props.autoResize) {
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (props.autoResize) {
    window.removeEventListener("resize", handleResize);
  }
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>

<style scoped>
.echarts-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: #999;
}
</style>
