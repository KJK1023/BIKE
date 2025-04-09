<template>
  <div class="circle-graph-container">
    <h3 class="title">지출 카테고리</h3>
    <div class="chart-wrapper">
      <canvas id="myChart"></canvas>
    </div>
    <ul class="category-list">
      <li v-for="(item, index) in sortedData" :key="index">
        <span :style="{ backgroundColor: item.color }" class="dot"></span>
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import { rawData, chartOptions } from "@/components/doughnut-chart-config";

Chart.register(...registerables);

const sortedData = ref([]);
const labels = ref([]);
const data = ref([]);
const colors = ref([]);

onMounted(() => {
  sortedData.value = rawData.sort((a, b) => b.value - a.value);
  labels.value = sortedData.value.map((item) => item.label);
  data.value = sortedData.value.map((item) => item.value);
  colors.value = sortedData.value.map((item) => item.color);

  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels.value,
      datasets: [
        {
          label: "카테고리 금액",
          data: data.value,
          backgroundColor: colors.value,
          borderWidth: 1,
        },
      ],
    },
    options: chartOptions,
  });
});
</script>

<style scoped>
.circle-graph-container {
  background-color: #fff;
  width: 300px;
  padding: 16px;
  margin-left: 30px;
  border-radius: 8px;
  box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-weight: bold;
  margin-bottom: 12px;
}

.chart-wrapper {
  width: 150px;
  height: 150px;
  margin-bottom: 16px;
}

#myChart {
  width: 100%;
  height: 100%;
}

.category-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-left: 0;
  gap: 8px;
}

.category-list li {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}
</style>
