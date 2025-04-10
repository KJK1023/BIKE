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
import { useTransactionStore } from "@/stores/transaction-store";
import { translateCategory } from "../utils/translate-category";

Chart.register(...registerables);

const sortedData = ref([]);
const labels = ref([]);
const data = ref([]);
const colors = ref([]);

const transactionStore = useTransactionStore();

onMounted(async () => {
  await transactionStore.fetchTransaction();
  const transactions = transactionStore.transactionInfo;

  // expense 항목만 필터링
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  //카테고리별 합계 계산
  const categoryTotals = filteredTransactions.reduce((acc, transaction) => {
    const category = translateCategory(transaction.category); //카테고리를 영어에서 한국어로 변환 (유틸 함수 사용 )
    const amount = transaction.amount;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  //차트에 필요한 rawData 형태로 변환 (g선생님..)
  const rawData = Object.keys(categoryTotals).map((category) => ({
    label: category,
    value: categoryTotals[category],
    color: getCategoryColor(category), // 카테고리별 색상 지정
  }));

  //내림차순 정렬
  sortedData.value = rawData.sort((a, b) => b.value - a.value);
  labels.value = sortedData.value.map((item) => item.label);
  data.value = sortedData.value.map((item) => item.value);
  colors.value = sortedData.value.map((item) => item.color);

  // 차트 그리기
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

// 카테고리별 색상 반환 함수
const getCategoryColor = (category) => {
  switch (category) {
    case "식비":
      return "#EE6666";
    case "교통비":
      return "#91CC75";
    case "회식":
      return "#FAC858";
    case "쇼핑":
      return "#5470C6";
    case "문화생활":
      return "#73C0DE";
    case "기타":
      return "#CCCCCC";
    default:
      return "#CCCCCC";
  }
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: "60%",
};
</script>

<style scoped>
.circle-graph-container {
  background-color: #fff;
  width: 30%;
  padding: 16px;
  margin-left: 30px;
  border-radius: 8px;
  box-shadow: 0 1px 2px -1px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: left;
  align-self: flex-start;
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
  width: 92%;
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
