<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

// 接收父组件传递的 props
const props = defineProps({
  options: Object, // ECharts 配置项
});

const chartRef = ref(null); // DOM 容器
let chartInstance = null;  // ECharts 实例

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  // 销毁旧实例（避免重复初始化）
  if (chartInstance) {
    chartInstance.dispose();
  }

  // 创建新实例
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(props.options);
};

// 监听 props.options 的变化
watch(
  () => props.options,
  (newOptions) => {
    if (chartInstance) {
      chartInstance.setOption(newOptions);
    }
  },
  { deep: true }
);

// 生命周期
onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener('resize', resizeChart);
});

// 处理图表的自适应
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%;"></div>
</template>

<style scoped>
/* 确保图表容器有宽高 */
div {
  width: 100%;
  height: 300px;
}
</style>
